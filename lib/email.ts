// Email sending utility
// Uses Brevo (Sendinblue) for transactional emails

import { COMPANY_INFO, SOCIAL_LINKS } from './constants';

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
    <p style="margin: 10px 0 0 0; opacity: 0.9;">${COMPANY_INFO.name} Website</p>
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
      <p>This email was sent from the ${COMPANY_INFO.name} contact form.</p>
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
New Contact Form Submission - ${COMPANY_INFO.name}

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
  <title>Thank You - ${COMPANY_INFO.name}</title>
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

      <p>Thank you for reaching out to ${COMPANY_INFO.name}! We've successfully received your inquiry about <strong>${formatServiceName(data.service)}</strong> and our team will review it shortly.</p>

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
          <a href="tel:${COMPANY_INFO.phones.cellE164}" class="btn btn-primary">📞 Call ${COMPANY_INFO.phones.cellFormatted}</a>
          <a href="https://wa.me/${COMPANY_INFO.phones.whatsappE164.replace('+', '')}" class="btn btn-secondary">💬 WhatsApp</a>
        </div>
      </div>

      <p style="margin-top: 30px;">Best regards,<br><strong>${COMPANY_INFO.name} Team</strong></p>
    </div>

    <div class="footer">
      <div class="social-links">
        <a href="${SOCIAL_LINKS.facebook}" style="background: #1877f2; color: white; text-decoration: none; padding: 8px 12px; border-radius: 6px; display: inline-block; margin: 0 5px; font-size: 12px; font-weight: 600;">Facebook</a>
        <a href="${SOCIAL_LINKS.instagram}" style="background: #e4405f; color: white; text-decoration: none; padding: 8px 12px; border-radius: 6px; display: inline-block; margin: 0 5px; font-size: 12px; font-weight: 600;">Instagram</a>
        <a href="${SOCIAL_LINKS.twitter}" style="background: #000000; color: white; text-decoration: none; padding: 8px 12px; border-radius: 6px; display: inline-block; margin: 0 5px; font-size: 12px; font-weight: 600;">Twitter</a>
        <a href="${SOCIAL_LINKS.linkedin}" style="background: #0a66c2; color: white; text-decoration: none; padding: 8px 12px; border-radius: 6px; display: inline-block; margin: 0 5px; font-size: 12px; font-weight: 600;">LinkedIn</a>
      </div>
      <p><strong>${COMPANY_INFO.name}</strong></p>
      <p>${COMPANY_INFO.addresses[0].fullAddress}</p>
      <p>📞 ${COMPANY_INFO.phones.cellFormatted} | 📧 ${COMPANY_INFO.emails.info}</p>
      <p style="margin-top: 15px; font-size: 11px; color: #999;">
        This email was sent because you submitted a contact form on our website.<br>
        © ${new Date().getFullYear()} ${COMPANY_INFO.name}. All rights reserved.
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
Thank You for Contacting ${COMPANY_INFO.name}!

Hi ${data.name},

Thank you for reaching out to us! We've successfully received your inquiry about ${formatServiceName(data.service)} and our team will review it shortly.

YOUR MESSAGE:
${data.message}

WHAT HAPPENS NEXT:
- Our team will review your request within 24 hours
- We'll respond to: ${data.email}
${data.phone ? `- We may also call you at: ${data.phone}` : ''}

NEED IMMEDIATE HELP?
📞 Call us: ${COMPANY_INFO.phones.cellFormatted}
💬 WhatsApp: https://wa.me/${COMPANY_INFO.phones.whatsappE164.replace('+', '')}

Best regards,
${COMPANY_INFO.name} Team

---
${COMPANY_INFO.name}
🏢 ${COMPANY_INFO.addresses[0].fullAddress}
📞 Phone: ${COMPANY_INFO.phones.cellFormatted}
📧 Email: ${COMPANY_INFO.emails.info}
🌐 Website: https://www.knclogistics.com

Follow us:
Facebook: ${SOCIAL_LINKS.facebook}
Instagram: ${SOCIAL_LINKS.instagram}
Twitter: ${SOCIAL_LINKS.twitter}
LinkedIn: ${SOCIAL_LINKS.linkedin}

© ${new Date().getFullYear()} ${COMPANY_INFO.name}. All rights reserved.
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
  const emailTo = process.env.EMAIL_TO || COMPANY_INFO.emails.info;
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
  const customerSubject = `Thank You for Contacting ${COMPANY_INFO.name}`;
  const customerHtml = generateCustomerEmailHTML(data);
  const customerText = generateCustomerEmailText(data);

  // Check which email provider is configured
  if (process.env.BREVO_API_KEY) {
    // Option 1: Brevo (Sendinblue) - Recommended for free tier
    try {
      const brevo = await import("@getbrevo/brevo");
      const apiInstance = new brevo.TransactionalEmailsApi();
      apiInstance.setApiKey(
        brevo.TransactionalEmailsApiApiKeys.apiKey,
        process.env.BREVO_API_KEY
      );

      // Send admin notification with Reply-To
      const adminEmail = new brevo.SendSmtpEmail();
      adminEmail.sender = { email: emailFrom, name: COMPANY_INFO.name };
      adminEmail.to = [{ email: emailTo }];
      if (emailCC && emailCC.length > 0) {
        adminEmail.cc = emailCC.map(email => ({ email }));
      }
      if (emailBCC && emailBCC.length > 0) {
        adminEmail.bcc = emailBCC.map(email => ({ email }));
      }
      adminEmail.replyTo = { email: data.email, name: data.name };
      adminEmail.subject = adminSubject;
      adminEmail.htmlContent = adminHtml;
      adminEmail.textContent = adminText;

      await apiInstance.sendTransacEmail(adminEmail);

      // Send customer confirmation
      const customerEmail = new brevo.SendSmtpEmail();
      customerEmail.sender = { email: emailFrom, name: COMPANY_INFO.name };
      customerEmail.to = [{ email: data.email, name: data.name }];
      customerEmail.subject = customerSubject;
      customerEmail.htmlContent = customerHtml;
      customerEmail.textContent = customerText;

      await apiInstance.sendTransacEmail(customerEmail);
    } catch (error) {
      console.error("Failed to send email with Brevo:", error);
      throw new Error(
        "Brevo email service error. Please check your BREVO_API_KEY configuration."
      );
    }
  } else {
    // No email provider configured - just log (development mode)
    console.log("📧 Admin notification would be sent:", { to: emailTo, subject: adminSubject, data });
    console.log("📧 Customer confirmation would be sent:", { to: data.email, subject: customerSubject });
    console.log(
      "⚠️  No email provider configured. Set BREVO_API_KEY in .env.local"
    );
  }
}

// Apply form data interface
interface ApplyEmailData {
  name: string;
  email: string;
  phone: string;
  cdlType: string;
  experience: number;
  message?: string;
}

// Generate admin notification email HTML for job applications
function generateApplyAdminEmailHTML(data: ApplyEmailData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Driver Application</title>
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
    .highlight {
      background: #fff3cd;
      padding: 15px;
      border-radius: 6px;
      border-left: 4px solid #ffc107;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🚛 New Driver Application</h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">${COMPANY_INFO.name} Careers Portal</p>
  </div>

  <div class="content">
    <div class="highlight">
      <strong>📋 Application Summary</strong><br>
      <span class="badge">${data.cdlType}</span> driver with <strong>${data.experience} years</strong> of experience
    </div>

    <div class="field">
      <label>Applicant Name</label>
      <div class="value">${escapeHtml(data.name)}</div>
    </div>

    <div class="field">
      <label>Email</label>
      <div class="value">
        <a href="mailto:${escapeHtml(data.email)}" style="color: #1a237e; text-decoration: none;">
          ${escapeHtml(data.email)}
        </a>
      </div>
    </div>

    <div class="field">
      <label>Phone</label>
      <div class="value">
        <a href="tel:${escapeHtml(data.phone)}" style="color: #1a237e; text-decoration: none;">
          ${escapeHtml(data.phone)}
        </a>
      </div>
    </div>

    <div class="field">
      <label>CDL License Type</label>
      <div class="value"><span class="badge">${escapeHtml(data.cdlType)}</span></div>
    </div>

    <div class="field">
      <label>Years of Driving Experience</label>
      <div class="value">${data.experience} years</div>
    </div>

    ${
      data.message
        ? `
    <div class="field">
      <label>Additional Information</label>
      <div class="value message-field">${escapeHtml(data.message)}</div>
    </div>
    `
        : ""
    }

    <div class="footer">
      <p>This application was submitted from the ${COMPANY_INFO.name} careers page.</p>
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

// Generate admin notification plain text version for applications
function generateApplyAdminEmailText(data: ApplyEmailData): string {
  return `
New Driver Application - ${COMPANY_INFO.name}

Applicant: ${data.name}
Email: ${data.email}
Phone: ${data.phone}

CDL License Type: ${data.cdlType}
Years of Experience: ${data.experience}

${data.message ? `Additional Information:\n${data.message}\n` : ""}
---
Submitted on ${new Date().toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "long",
    timeZone: "America/Los_Angeles",
  })}
  `.trim();
}

// Generate applicant confirmation email HTML
function generateApplyCustomerEmailHTML(data: ApplyEmailData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Application Received - ${COMPANY_INFO.name}</title>
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
    .info-box {
      background: #f8f9fa;
      border-left: 4px solid #812530;
      padding: 20px;
      margin: 25px 0;
      border-radius: 6px;
    }
    .info-box p {
      margin: 0 0 10px 0;
      color: #555;
    }
    .info-box p:last-child {
      margin: 0;
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
    .btn {
      display: inline-block;
      padding: 12px 28px;
      border-radius: 50px;
      text-decoration: none;
      font-weight: 600;
      font-size: 14px;
      background: #FFD700;
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
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Application Received!</h1>
      <p>Thank you for applying to ${COMPANY_INFO.name}</p>
    </div>

    <div class="content">
      <p class="greeting">Hi ${escapeHtml(data.name)},</p>

      <p>Thank you for your interest in joining ${COMPANY_INFO.name} as a <strong>${data.cdlType}</strong> driver! We've successfully received your application and our hiring team will review it shortly.</p>

      <div class="info-box">
        <p><strong>📋 Your Application Details:</strong></p>
        <p>License Type: <strong>${escapeHtml(data.cdlType)}</strong></p>
        <p>Experience: <strong>${data.experience} years</strong></p>
        <p>Contact: ${escapeHtml(data.email)} | ${escapeHtml(data.phone)}</p>
      </div>

      <p><strong>What happens next?</strong></p>
      <ul style="line-height: 1.8;">
        <li>Our hiring team will review your application within 24-48 hours</li>
        <li>We'll contact you via phone or email if your qualifications match our current openings</li>
        <li>If selected, we'll schedule an interview to discuss the position and answer your questions</li>
      </ul>

      <div class="cta-box">
        <h3>Have Questions?</h3>
        <p>Feel free to contact us directly</p>
        <a href="tel:${COMPANY_INFO.phones.cellE164}" class="btn">📞 Call ${COMPANY_INFO.phones.cellFormatted}</a>
      </div>

      <p>We appreciate your interest in ${COMPANY_INFO.name} and look forward to potentially having you on our team!</p>

      <p style="margin-top: 30px;">Best regards,<br><strong>${COMPANY_INFO.name} Hiring Team</strong></p>
    </div>

    <div class="footer">
      <p><strong>${COMPANY_INFO.name}</strong></p>
      <p>${COMPANY_INFO.addresses[0].fullAddress}</p>
      <p>📞 ${COMPANY_INFO.phones.cellFormatted} | 📧 ${COMPANY_INFO.emails.info}</p>
      <p style="margin-top: 15px; font-size: 11px; color: #999;">
        This email was sent because you submitted an application on our website.<br>
        © ${new Date().getFullYear()} ${COMPANY_INFO.name}. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

// Generate applicant confirmation plain text version
function generateApplyCustomerEmailText(data: ApplyEmailData): string {
  return `
Application Received - ${COMPANY_INFO.name}!

Hi ${data.name},

Thank you for your interest in joining ${COMPANY_INFO.name} as a ${data.cdlType} driver! We've successfully received your application and our hiring team will review it shortly.

YOUR APPLICATION DETAILS:
- License Type: ${data.cdlType}
- Experience: ${data.experience} years
- Contact: ${data.email} | ${data.phone}

WHAT HAPPENS NEXT:
- Our hiring team will review your application within 24-48 hours
- We'll contact you via phone or email if your qualifications match our current openings
- If selected, we'll schedule an interview to discuss the position and answer your questions

HAVE QUESTIONS?
📞 Call us: ${COMPANY_INFO.phones.cellFormatted}
📧 Email: ${COMPANY_INFO.emails.info}

We appreciate your interest in ${COMPANY_INFO.name} and look forward to potentially having you on our team!

Best regards,
${COMPANY_INFO.name} Hiring Team

---
${COMPANY_INFO.name}
🏢 ${COMPANY_INFO.addresses[0].fullAddress}
📞 Phone: ${COMPANY_INFO.phones.cellFormatted}
📧 Email: ${COMPANY_INFO.emails.info}
🌐 Website: https://www.knclogistics.com

© ${new Date().getFullYear()} ${COMPANY_INFO.name}. All rights reserved.
  `.trim();
}

// Main email sending function for job applications
export async function sendApplyEmail(data: ApplyEmailData): Promise<void> {
  const emailTo = process.env.EMAIL_TO || COMPANY_INFO.emails.info;
  const emailFrom = process.env.EMAIL_FROM || "noreply@knclogistics.com";
  const emailCC = process.env.EMAIL_CC?.split(",")
    .map((e) => e.trim())
    .filter(Boolean);
  const emailBCC = process.env.EMAIL_BCC?.split(",")
    .map((e) => e.trim())
    .filter(Boolean);

  // Admin notification email
  const adminSubject = `New Driver Application: ${data.cdlType} - ${data.name}`;
  const adminHtml = generateApplyAdminEmailHTML(data);
  const adminText = generateApplyAdminEmailText(data);

  // Applicant confirmation email
  const customerSubject = `Application Received - ${COMPANY_INFO.name}`;
  const customerHtml = generateApplyCustomerEmailHTML(data);
  const customerText = generateApplyCustomerEmailText(data);

  // Check which email provider is configured
  if (process.env.BREVO_API_KEY) {
    // Option 1: Brevo (Sendinblue) - Recommended for free tier
    try {
      const brevo = await import("@getbrevo/brevo");
      const apiInstance = new brevo.TransactionalEmailsApi();
      apiInstance.setApiKey(
        brevo.TransactionalEmailsApiApiKeys.apiKey,
        process.env.BREVO_API_KEY
      );

      // Send admin notification with Reply-To
      const adminEmail = new brevo.SendSmtpEmail();
      adminEmail.sender = { email: emailFrom, name: COMPANY_INFO.name };
      adminEmail.to = [{ email: emailTo }];
      if (emailCC && emailCC.length > 0) {
        adminEmail.cc = emailCC.map(email => ({ email }));
      }
      if (emailBCC && emailBCC.length > 0) {
        adminEmail.bcc = emailBCC.map(email => ({ email }));
      }
      adminEmail.replyTo = { email: data.email, name: data.name };
      adminEmail.subject = adminSubject;
      adminEmail.htmlContent = adminHtml;
      adminEmail.textContent = adminText;

      await apiInstance.sendTransacEmail(adminEmail);

      // Send applicant confirmation
      const customerEmail = new brevo.SendSmtpEmail();
      customerEmail.sender = { email: emailFrom, name: COMPANY_INFO.name };
      customerEmail.to = [{ email: data.email, name: data.name }];
      customerEmail.subject = customerSubject;
      customerEmail.htmlContent = customerHtml;
      customerEmail.textContent = customerText;

      await apiInstance.sendTransacEmail(customerEmail);
    } catch (error) {
      console.error("Failed to send email with Brevo:", error);
      throw new Error(
        "Brevo email service error. Please check your BREVO_API_KEY configuration."
      );
    }
  } else {
    // No email provider configured - just log (development mode)
    console.log("📧 Admin notification would be sent:", { to: emailTo, subject: adminSubject, data });
    console.log("📧 Applicant confirmation would be sent:", { to: data.email, subject: customerSubject });
    console.log(
      "⚠️  No email provider configured. Set BREVO_API_KEY in .env.local"
    );
  }
}
