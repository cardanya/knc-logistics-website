import { NextRequest, NextResponse } from 'next/server';
import { validateEmail, validatePhone } from '@/lib/utils/validation';

const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_WINDOW_SECONDS = Math.ceil(RATE_LIMIT_WINDOW / 1000);
const MAX_REQUESTS_PER_WINDOW = 3; // More restrictive for job applications
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

declare global {
  var __kncApplyRateLimitMap: Map<string, number[]> | undefined;
}

const memoryRateLimitMap =
  globalThis.__kncApplyRateLimitMap ?? new Map<string, number[]>();

if (!globalThis.__kncApplyRateLimitMap) {
  globalThis.__kncApplyRateLimitMap = memoryRateLimitMap;
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

  const key = `rate-limit:apply:${identifier}`;
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

// reCAPTCHA verification function
async function verifyRecaptcha(token: string): Promise<{ success: boolean; score?: number; error?: string }> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const threshold = parseFloat(process.env.RECAPTCHA_SCORE_THRESHOLD || '0.5');

  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY not configured');

    // In production, this is a critical misconfiguration - fail closed
    if (process.env.NODE_ENV === 'production') {
      throw new Error('reCAPTCHA is not properly configured. Please contact support.');
    }

    // In development, allow bypass for testing
    console.warn('⚠️  Development mode: Bypassing reCAPTCHA verification');
    return { success: true, score: 1.0 };
  }

  if (!token) {
    return { success: false, error: 'reCAPTCHA token missing' };
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      console.error('reCAPTCHA verification failed:', data['error-codes']);
      return { success: false, error: 'Verification failed' };
    }

    const score = data.score || 0;
    console.log('reCAPTCHA score:', score);

    if (score < threshold) {
      return {
        success: false,
        score,
        error: `Score too low: ${score} < ${threshold}`
      };
    }

    return { success: true, score };
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return { success: false, error: 'Verification request failed' };
  }
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
          error: 'Too many applications submitted. Please try again later.'
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, phone, cdlType, experience, message, recaptchaToken } = body;

    // Verify reCAPTCHA token
    const recaptchaResult = await verifyRecaptcha(recaptchaToken);
    if (!recaptchaResult.success) {
      console.log('Bot detected or verification failed:', recaptchaResult);
      return NextResponse.json(
        {
          success: false,
          error: 'Security verification failed. Please try again.'
        },
        { status: 400 }
      );
    }

    // Log score for monitoring (optional)
    if (recaptchaResult.score !== undefined) {
      console.log('Application submission score:', recaptchaResult.score);
    }

    // Validate required fields
    if (!name || !email || !phone || !cdlType || experience === undefined) {
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
    if (!validateEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate phone
    if (!validatePhone(phone)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid phone number. Must be valid format with at least 10 digits.'
        },
        { status: 400 }
      );
    }

    // Validate CDL type
    const validCDLTypes = ['Class A', 'Class B', 'Class C'];
    if (!validCDLTypes.includes(cdlType)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid CDL license type'
        },
        { status: 400 }
      );
    }

    // Validate experience (must be a number between 0 and 50)
    const experienceNum = Number(experience);
    if (isNaN(experienceNum) || experienceNum < 0 || experienceNum > 50) {
      return NextResponse.json(
        {
          success: false,
          error: 'Experience must be a number between 0 and 50'
        },
        { status: 400 }
      );
    }

    // Validate message length if provided
    if (message && message.length > 500) {
      return NextResponse.json(
        {
          success: false,
          error: 'Message must be 500 characters or less'
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

    const messageText = `${name} ${email} ${message || ''}`.toLowerCase();
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
      const { sendApplyEmail } = await import('@/lib/email');
      await sendApplyEmail({
        name,
        email,
        phone,
        cdlType,
        experience: experienceNum,
        message: message || undefined,
      });
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);

      // In production, email delivery is critical - fail the request
      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json(
          {
            success: false,
            error: 'We encountered an issue processing your application. Please try again or contact us directly at (714) 588-2005.',
          },
          { status: 500 }
        );
      }
      // In development, continue for testing purposes
      console.warn('⚠️  Development mode: Email failed but continuing');
    }

    // Log non-sensitive submission metadata for monitoring
    console.log('Application submission received', {
      cdlType,
      experience: experienceNum,
      timestamp: new Date().toISOString(),
    });

    // TODO: Save to database if needed
    // await saveApplicationSubmission({ name, email, phone, cdlType, experience, message });

    return NextResponse.json({
      success: true,
      message: "Thank you for applying! We'll review your application and get back to you soon.",
    });

  } catch (error) {
    console.error('Application form error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An error occurred. Please try again later.'
      },
      { status: 500 }
    );
  }
}
