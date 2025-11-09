import { NextRequest, NextResponse } from 'next/server';

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Rate limiting - simple in-memory store (for production, use Redis or similar)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 5;

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(identifier) || [];

  // Remove old timestamps outside the window
  const validTimestamps = timestamps.filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW
  );

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return false; // Rate limit exceeded
  }

  validTimestamps.push(now);
  rateLimitMap.set(identifier, validTimestamps);
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get IP address for rate limiting
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
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

    // Log the submission for monitoring
    console.log('Contact Form Submission:', {
      service,
      name,
      email,
      phone: phone || 'N/A',
      timestamp: new Date().toISOString(),
      ip,
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
