// Email sending utility
// Supports multiple providers: Resend, SendGrid, and SMTP (Nodemailer)

interface EmailData {
  service: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
}

// Format service name for display
function formatServiceName(service: string): string {
  const serviceMap: Record<string, string> = {
    parking: "Parking Solutions",
    warehousing: "Warehousing Services",
    "supply-chain": "Supply Chain Solutions",
  };
  return serviceMap[service] || service;
}

// Generate email HTML template
function generateEmailHTML(data: EmailData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #1a237e 0%, #283593 100%);
      color: white;
      padding: 30px;
      border-radius: 8px 8px 0 0;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      background: #f8f9fa;
      padding: 30px;
      border-radius: 0 0 8px 8px;
    }
    .field {
      margin-bottom: 20px;
      background: white;
      padding: 15px;
      border-radius: 6px;
      border-left: 4px solid #1a237e;
    }
    .field label {
      display: block;
      font-weight: 600;
      color: #1a237e;
      margin-bottom: 5px;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .field .value {
      font-size: 16px;
      color: #333;
      word-wrap: break-word;
    }
    .message-field {
      white-space: pre-wrap;
      line-height: 1.8;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 2px solid #e0e0e0;
      font-size: 12px;
      color: #666;
      text-align: center;
    }
    .badge {
      display: inline-block;
      background: #4caf50;
      color: white;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🚚 New Contact Form Submission</h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">K&C Logistics Website</p>
  </div>

  <div class="content">
    <div class="field">
      <label>Service Interest</label>
      <div class="value">
        <span class="badge">${formatServiceName(data.service)}</span>
      </div>
    </div>

    <div class="field">
      <label>Name</label>
      <div class="value">${escapeHtml(data.name)}</div>
    </div>

    <div class="field">
      <label>Email</label>
      <div class="value">
        <a href="mailto:${escapeHtml(
          data.email
        )}" style="color: #1a237e; text-decoration: none;">
          ${escapeHtml(data.email)}
        </a>
      </div>
    </div>

    ${
      data.phone
        ? `
    <div class="field">
      <label>Phone</label>
      <div class="value">
        <a href="tel:${escapeHtml(
          data.phone
        )}" style="color: #1a237e; text-decoration: none;">
          ${escapeHtml(data.phone)}
        </a>
      </div>
    </div>
    `
        : ""
    }

    <div class="field">
      <label>Message</label>
      <div class="value message-field">${escapeHtml(data.message)}</div>
    </div>

    <div class="footer">
      <p>This email was sent from the K&C Logistics contact form.</p>
      <p>Submitted on ${new Date().toLocaleString("en-US", {
        dateStyle: "full",
        timeStyle: "long",
        timeZone: "America/Los_Angeles",
      })}</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

// Generate plain text version
function generateEmailText(data: EmailData): string {
  return `
New Contact Form Submission - K&C Logistics

Service Interest: ${formatServiceName(data.service)}
Name: ${data.name}
Email: ${data.email}
${data.phone ? `Phone: ${data.phone}` : ""}

Message:
${data.message}

---
Submitted on ${new Date().toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "long",
    timeZone: "America/Los_Angeles",
  })}
  `.trim();
}

// Escape HTML to prevent XSS
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Main email sending function
export async function sendContactEmail(data: EmailData): Promise<void> {
  const emailTo = process.env.EMAIL_TO || "info@knclogistics.com";
  const emailFrom = process.env.EMAIL_FROM || "noreply@knclogistics.com";
  const emailCC = process.env.EMAIL_CC?.split(",")
    .map((e) => e.trim())
    .filter(Boolean);
  const emailBCC = process.env.EMAIL_BCC?.split(",")
    .map((e) => e.trim())
    .filter(Boolean);

  const subject = `New Contact Form: ${formatServiceName(data.service)} - ${
    data.name
  }`;
  const html = generateEmailHTML(data);
  const text = generateEmailText(data);

  // Check which email provider is configured
  if (process.env.RESEND_API_KEY) {
    // Option 1: Resend
    try {
      // @ts-expect-error - Resend package is optional and installed separately
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: emailFrom,
        to: emailTo,
        cc: emailCC,
        bcc: emailBCC,
        subject,
        html,
        text,
      });
    } catch (error) {
      console.error("Failed to send email with Resend:", error);
      throw new Error(
        "Email service not configured. Install resend package: npm install resend"
      );
    }
  } else if (process.env.SENDGRID_API_KEY) {
    // Option 2: SendGrid
    try {
      // @ts-expect-error - SendGrid package is optional and installed separately
      const sgMail = await import("@sendgrid/mail");
      sgMail.default.setApiKey(process.env.SENDGRID_API_KEY);

      await sgMail.default.send({
        from: emailFrom,
        to: emailTo,
        cc: emailCC,
        bcc: emailBCC,
        subject,
        html,
        text,
      });
    } catch (error) {
      console.error("Failed to send email with SendGrid:", error);
      throw new Error(
        "Email service not configured. Install SendGrid package: npm install @sendgrid/mail"
      );
    }
  } else if (process.env.SMTP_HOST) {
    // Option 3: SMTP (Nodemailer)
    try {
      // @ts-expect-error - Nodemailer package is optional and installed separately
      const nodemailer = await import("nodemailer");
      const transporter = nodemailer.default.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_PORT === "465",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: emailFrom,
        to: emailTo,
        cc: emailCC,
        bcc: emailBCC,
        subject,
        html,
        text,
      });
    } catch (error) {
      console.error("Failed to send email with SMTP:", error);
      throw new Error(
        "Email service not configured. Install nodemailer package: npm install nodemailer"
      );
    }
  } else {
    // No email provider configured - just log (development mode)
    console.log("📧 Email would be sent:", { to: emailTo, subject, data });
    console.log(
      "⚠️  No email provider configured. Set RESEND_API_KEY, SENDGRID_API_KEY, or SMTP_* in .env.local"
    );
  }
}
