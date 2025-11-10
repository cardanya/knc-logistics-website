import { NextRequest, NextResponse } from 'next/server';

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_WINDOW_SECONDS = Math.ceil(RATE_LIMIT_WINDOW / 1000);
const MAX_REQUESTS_PER_WINDOW = 5;
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

declare global {
  var __kncRateLimitMap: Map<string, number[]> | undefined;
}

const memoryRateLimitMap =
  globalThis.__kncRateLimitMap ?? new Map<string, number[]>();

if (!globalThis.__kncRateLimitMap) {
  globalThis.__kncRateLimitMap = memoryRateLimitMap;
}

function checkMemoryRateLimit(identifier: string): boolean {
  const now = Date.now();
  const timestamps = memoryRateLimitMap.get(identifier) || [];

  // Remove old timestamps outside the window
  const validTimestamps = timestamps.filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW
  );

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return false; // Rate limit exceeded
  }

  validTimestamps.push(now);
  memoryRateLimitMap.set(identifier, validTimestamps);
  return true;
}

async function incrementRedisCounter(identifier: string): Promise<number> {
  if (!REDIS_URL || !REDIS_TOKEN) {
    throw new Error('Redis configuration missing');
  }

  const key = `rate-limit:contact:${identifier}`;
  const response = await fetch(`${REDIS_URL}/pipeline`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([
      ['INCR', key],
      ['EXPIRE', key, RATE_LIMIT_WINDOW_SECONDS.toString()],
    ]),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Redis error: ${response.statusText}`);
  }

  const data = await response.json();
  const firstResult = Array.isArray(data.result)
    ? data.result[0]?.result
    : undefined;

  const numericResult =
    typeof firstResult === 'number'
      ? firstResult
      : Number.parseInt(firstResult, 10);

  if (!Number.isFinite(numericResult)) {
    throw new Error('Unexpected Redis response');
  }

  return numericResult;
}

async function checkRateLimit(identifier: string): Promise<boolean> {
  if (REDIS_URL && REDIS_TOKEN) {
    try {
      const count = await incrementRedisCounter(identifier);
      return count <= MAX_REQUESTS_PER_WINDOW;
    } catch (error) {
      console.error('Distributed rate limit failed, falling back to in-memory store:', error);
    }
  }

  return checkMemoryRateLimit(identifier);
}

export async function POST(request: NextRequest) {
  try {
    // Get IP address for rate limiting
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown';

    // Check rate limit
    if (!(await checkRateLimit(ip))) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many requests. Please try again later.'
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { service, name, email, phone, message } = body;

    // Validate required fields
    if (!service || !name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields'
        },
        { status: 400 }
      );
    }

    // Validate name length
    if (name.trim().length < 2) {
      return NextResponse.json(
        {
          success: false,
          error: 'Name must be at least 2 characters'
        },
        { status: 400 }
      );
    }

    // Validate email format
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email address'
        },
        { status: 400 }
      );
    }

    // Validate phone if provided
    if (phone) {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (!phoneRegex.test(phone)) {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid phone number'
          },
          { status: 400 }
        );
      }
    }

    // Validate message length
    if (message.trim().length < 10) {
      return NextResponse.json(
        {
          success: false,
          error: 'Message must be at least 10 characters'
        },
        { status: 400 }
      );
    }

    // Check for spam patterns (basic)
    const spamPatterns = [
      /viagra/i,
      /cialis/i,
      /casino/i,
      /lottery/i,
      /click here/i,
      /\b(earn|make)\s+\$\d+/i,
    ];

    const messageText = `${name} ${email} ${message}`.toLowerCase();
    if (spamPatterns.some(pattern => pattern.test(messageText))) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid submission detected'
        },
        { status: 400 }
      );
    }

    // Send email notification
    try {
      const { sendContactEmail } = await import('@/lib/email');
      await sendContactEmail({
        service,
        name,
        email,
        phone: phone || undefined,
        message,
      });
    } catch (emailError) {
      // Log email error but don't fail the request
      console.error('Failed to send email notification:', emailError);
      // Continue - we still want to acknowledge the submission
    }

    // Log non-sensitive submission metadata for monitoring
    console.log('Contact submission received', {
      service,
      timestamp: new Date().toISOString(),
    });

    // TODO: Save to database if needed
    // await saveContactSubmission({ service, name, email, phone, message });

    return NextResponse.json({
      success: true,
      message: 'Thank you for contacting us! We will get back to you soon.',
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An error occurred. Please try again later.'
      },
      { status: 500 }
    );
  }
}
