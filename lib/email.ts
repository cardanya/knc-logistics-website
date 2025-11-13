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
    trucking: "Trucking Services",
    "truck-parking": "Truck Parking",
    "cross-docking": "Cross Docking",
  };
  return serviceMap[service] || service;
}

// Generate admin notification email HTML
function generateAdminEmailHTML(data: EmailData): string {
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

// Generate admin notification plain text version
function generateAdminEmailText(data: EmailData): string {
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

// Generate customer confirmation email HTML
function generateCustomerEmailHTML(data: EmailData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You - K&C Logistics</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background: #f5f5f5;
    }
    .container {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #812530 0%, #a82f3d 100%);
      color: white;
      padding: 40px 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0 0 10px 0;
      font-size: 28px;
      font-weight: 700;
    }
    .header p {
      margin: 0;
      opacity: 0.95;
      font-size: 16px;
    }
    .content {
      padding: 40px 30px;
    }
    .greeting {
      font-size: 18px;
      color: #812530;
      font-weight: 600;
      margin-bottom: 20px;
    }
    .message-box {
      background: #f8f9fa;
      border-left: 4px solid #812530;
      padding: 20px;
      margin: 25px 0;
      border-radius: 6px;
    }
    .message-box p {
      margin: 0 0 10px 0;
      color: #555;
    }
    .message-box p:last-child {
      margin: 0;
    }
    .info-grid {
      display: grid;
      gap: 15px;
      margin: 25px 0;
    }
    .info-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }
    .info-icon {
      width: 24px;
      height: 24px;
      background: #812530;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-size: 12px;
    }
    .info-text {
      flex: 1;
    }
    .info-label {
      font-size: 12px;
      color: #888;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }
    .info-value {
      font-size: 16px;
      color: #333;
      font-weight: 500;
    }
    .cta-box {
      background: linear-gradient(135deg, #812530 0%, #a82f3d 100%);
      color: white;
      padding: 30px;
      border-radius: 8px;
      text-align: center;
      margin: 30px 0;
    }
    .cta-box h3 {
      margin: 0 0 15px 0;
      font-size: 20px;
    }
    .cta-box p {
      margin: 0 0 20px 0;
      opacity: 0.95;
    }
    .cta-buttons {
      display: flex;
      gap: 15px;
      justify-content: center;
      flex-wrap: wrap;
    }
    .btn {
      display: inline-block;
      padding: 12px 28px;
      border-radius: 50px;
      text-decoration: none;
      font-weight: 600;
      font-size: 14px;
      transition: all 0.3s;
    }
    .btn-primary {
      background: #FFD700;
      color: #812530;
    }
    .btn-secondary {
      background: white;
      color: #812530;
    }
    .footer {
      padding: 30px;
      text-align: center;
      background: #f8f9fa;
      border-top: 1px solid #e0e0e0;
    }
    .footer p {
      margin: 5px 0;
      font-size: 13px;
      color: #666;
    }
    .social-links {
      margin: 20px 0 10px 0;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Thank You for Contacting Us!</h1>
      <p>We've received your message</p>
    </div>

    <div class="content">
      <p class="greeting">Hi ${escapeHtml(data.name)},</p>

      <p>Thank you for reaching out to K&C Logistics! We've successfully received your inquiry about <strong>${formatServiceName(data.service)}</strong> and our team will review it shortly.</p>

      <div class="message-box">
        <p><strong>Your Message:</strong></p>
        <p style="white-space: pre-wrap; line-height: 1.6;">${escapeHtml(data.message)}</p>
      </div>

      <div class="info-grid">
        <div class="info-item">
          <div class="info-icon">⏱️</div>
          <div class="info-text">
            <div class="info-label">Response Time</div>
            <div class="info-value">Within 24 hours</div>
          </div>
        </div>
        <div class="info-item">
          <div class="info-icon">📧</div>
          <div class="info-text">
            <div class="info-label">We'll Reply To</div>
            <div class="info-value">${escapeHtml(data.email)}</div>
          </div>
        </div>
        ${data.phone ? `
        <div class="info-item">
          <div class="info-icon">📞</div>
          <div class="info-text">
            <div class="info-label">Your Phone</div>
            <div class="info-value">${escapeHtml(data.phone)}</div>
          </div>
        </div>
        ` : ''}
      </div>

      <p>One of our logistics specialists will personally respond to your inquiry. If you need immediate assistance, feel free to contact us directly:</p>

      <div class="cta-box">
        <h3>Need Immediate Help?</h3>
        <p>Our team is available to assist you right away</p>
        <div class="cta-buttons">
          <a href="tel:+17145882005" class="btn btn-primary">📞 Call (714) 588-2005</a>
          <a href="https://wa.me/17145882005" class="btn btn-secondary">💬 WhatsApp</a>
        </div>
      </div>

      <p style="margin-top: 30px;">Best regards,<br><strong>K&C Logistics Team</strong></p>
    </div>

    <div class="footer">
      <div class="social-links">
        <a href="https://www.facebook.com/profile.php?id=61581692743100" style="background: #1877f2; color: white; text-decoration: none; padding: 8px 12px; border-radius: 6px; display: inline-block; margin: 0 5px; font-size: 12px; font-weight: 600;">Facebook</a>
        <a href="https://www.instagram.com/knclogistics.co/" style="background: #e4405f; color: white; text-decoration: none; padding: 8px 12px; border-radius: 6px; display: inline-block; margin: 0 5px; font-size: 12px; font-weight: 600;">Instagram</a>
        <a href="https://x.com/knclogistics" style="background: #000000; color: white; text-decoration: none; padding: 8px 12px; border-radius: 6px; display: inline-block; margin: 0 5px; font-size: 12px; font-weight: 600;">Twitter</a>
        <a href="https://www.linkedin.com/in/knclogistics/" style="background: #0a66c2; color: white; text-decoration: none; padding: 8px 12px; border-radius: 6px; display: inline-block; margin: 0 5px; font-size: 12px; font-weight: 600;">LinkedIn</a>
      </div>
      <p><strong>K&C Logistics</strong></p>
      <p>3060 Daimler St, Santa Ana, CA 92705</p>
      <p>📞 (714) 588-2005 | 📧 info@knclogistics.com</p>
      <p style="margin-top: 15px; font-size: 11px; color: #999;">
        This email was sent because you submitted a contact form on our website.<br>
        © ${new Date().getFullYear()} K&C Logistics. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

// Generate customer confirmation plain text version
function generateCustomerEmailText(data: EmailData): string {
  return `
Thank You for Contacting K&C Logistics!

Hi ${data.name},

Thank you for reaching out to us! We've successfully received your inquiry about ${formatServiceName(data.service)} and our team will review it shortly.

YOUR MESSAGE:
${data.message}

WHAT HAPPENS NEXT:
- Our team will review your request within 24 hours
- We'll respond to: ${data.email}
${data.phone ? `- We may also call you at: ${data.phone}` : ''}

NEED IMMEDIATE HELP?
📞 Call us: (714) 588-2005
💬 WhatsApp: https://wa.me/17145882005

Best regards,
K&C Logistics Team

---
K&C Logistics
🏢 3060 Daimler St, Santa Ana, CA 92705
📞 Phone: (714) 588-2005
📧 Email: info@knclogistics.com
🌐 Website: https://www.knclogistics.com

Follow us:
Facebook: https://www.facebook.com/profile.php?id=61581692743100
Instagram: https://www.instagram.com/knclogistics.co/
Twitter: https://x.com/knclogistics
LinkedIn: https://www.linkedin.com/in/knclogistics/

© ${new Date().getFullYear()} K&C Logistics. All rights reserved.
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

  // Admin notification email
  const adminSubject = `New Contact Form: ${formatServiceName(data.service)} - ${data.name}`;
  const adminHtml = generateAdminEmailHTML(data);
  const adminText = generateAdminEmailText(data);

  // Customer confirmation email
  const customerSubject = `Thank You for Contacting K&C Logistics`;
  const customerHtml = generateCustomerEmailHTML(data);
  const customerText = generateCustomerEmailText(data);

  // Check which email provider is configured
  if (process.env.RESEND_API_KEY) {
    // Option 1: Resend
    try {
      // @ts-expect-error - Resend package is optional and installed separately
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      // Send admin notification with Reply-To
      await resend.emails.send({
        from: emailFrom,
        to: emailTo,
        cc: emailCC,
        bcc: emailBCC,
        replyTo: data.email,
        subject: adminSubject,
        html: adminHtml,
        text: adminText,
      });

      // Send customer confirmation
      await resend.emails.send({
        from: emailFrom,
        to: data.email,
        subject: customerSubject,
        html: customerHtml,
        text: customerText,
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
      const sgMail = await import("@sendgrid/mail");
      sgMail.default.setApiKey(process.env.SENDGRID_API_KEY);

      // Send admin notification with Reply-To
      await sgMail.default.send({
        from: emailFrom,
        to: emailTo,
        cc: emailCC,
        bcc: emailBCC,
        replyTo: data.email,
        subject: adminSubject,
        html: adminHtml,
        text: adminText,
      });

      // Send customer confirmation
      await sgMail.default.send({
        from: emailFrom,
        to: data.email,
        subject: customerSubject,
        html: customerHtml,
        text: customerText,
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

      // Send admin notification with Reply-To
      await transporter.sendMail({
        from: emailFrom,
        to: emailTo,
        cc: emailCC,
        bcc: emailBCC,
        replyTo: data.email,
        subject: adminSubject,
        html: adminHtml,
        text: adminText,
      });

      // Send customer confirmation
      await transporter.sendMail({
        from: emailFrom,
        to: data.email,
        subject: customerSubject,
        html: customerHtml,
        text: customerText,
      });
    } catch (error) {
      console.error("Failed to send email with SMTP:", error);
      throw new Error(
        "Email service not configured. Install nodemailer package: npm install nodemailer"
      );
    }
  } else {
    // No email provider configured - just log (development mode)
    console.log("📧 Admin notification would be sent:", { to: emailTo, subject: adminSubject, data });
    console.log("📧 Customer confirmation would be sent:", { to: data.email, subject: customerSubject });
    console.log(
      "⚠️  No email provider configured. Set RESEND_API_KEY, SENDGRID_API_KEY, or SMTP_* in .env.local"
    );
  }
}
