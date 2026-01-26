# 📧 Brevo (Sendinblue) Email Setup Guide

## Why Brevo?

✅ **300 emails/day FREE** (~9,000/month)
✅ No credit card required
✅ Works with Wix DNS (only sender verification needed)
✅ Easy 5-minute setup
✅ Professional email delivery

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Create Brevo Account

1. **Sign up**: https://app.brevo.com/account/register
2. Enter your details:
   - Email: Your work email
   - Company name: K&C Logistics
   - Password: Create a strong password
3. Click **Create account**
4. **Verify your email** (check inbox)

---

### Step 2: Get Your API Key

1. Log in to Brevo: https://app.brevo.com/
2. Click on your name (top right) → **SMTP & API**
3. Go to **API Keys** tab
4. Click **Create a new API key**
5. Enter name: `K&C Logistics Production`
6. Click **Generate**
7. **Copy the API key** (you won't see it again!)

Example API key format: `xkeysib-abc123...`

---

### Step 3: Verify Sender Email

⚠️ **IMPORTANT**: You must verify your sender email before sending emails.

1. In Brevo Dashboard → **Settings** → **Senders & IP**
2. Click **Add a Sender**
3. Enter email: `social@knclogistics.com`
4. Enter name: `K&C Logistics`
5. Click **Add**
6. **Check your inbox** (social@knclogistics.com)
7. Click the verification link in the email from Brevo
8. Done! ✅

---

### Step 4: Add API Key to Your Project

1. Open `.env.local` file in your project
2. Find this line:
   ```
   BREVO_API_KEY=your_brevo_api_key_here
   ```
3. Replace `your_brevo_api_key_here` with your actual API key:
   ```
   BREVO_API_KEY=xkeysib-abc123def456...
   ```
4. Save the file

---

### Step 5: Restart Your Server

```bash
# Stop the server (Ctrl + C)
# Then restart:
npm run dev
```

The server will automatically reload the new environment variables.

---

## ✅ Testing Your Setup

### Test the Contact Form

1. Go to: http://localhost:3000/contact
2. Fill out the form:
   - **Service**: Any service
   - **Name**: Test User
   - **Email**: Your personal email (to receive confirmation)
   - **Message**: Test email from K&C Logistics
3. Click **Send Message**

### Expected Results

You should receive **TWO emails**:

1. **Admin Notification** → `info@knclogistics.com`
   - Contains customer inquiry details
   - Has Reply-To set to customer's email

2. **Customer Confirmation** → Your email
   - Professional thank you message
   - Shows what they submitted
   - Contact information and CTA buttons

---

## 📊 Brevo Free Tier Limits

| Feature | Free Tier |
|---------|-----------|
| **Emails per day** | 300 |
| **Emails per month** | ~9,000 |
| **Contacts** | Unlimited |
| **Sender verification** | Required |
| **Domain verification** | Optional |
| **SMTP Access** | ✅ Yes |
| **API Access** | ✅ Yes |
| **Credit card** | ❌ Not required |

---

## 🔧 Troubleshooting

### Problem: Emails not sending

**Check 1: API Key**
- Make sure API key is correct in `.env.local`
- No extra spaces or quotes
- Format: `xkeysib-...`

**Check 2: Sender Email Verified**
- Go to: https://app.brevo.com/settings/senders
- Make sure `social@knclogistics.com` has green checkmark
- If not, click "Resend verification email"

**Check 3: Server Restarted**
- Stop server (Ctrl+C)
- Run `npm run dev` again

**Check 4: Check Server Logs**
- Look for errors in terminal
- Should see: "Reload env: .env.local" after saving

---

### Problem: "Sender not verified" error

**Solution:**
1. Go to: https://app.brevo.com/settings/senders
2. Check if `social@knclogistics.com` is verified (green checkmark)
3. If not verified:
   - Check spam folder for verification email
   - Click "Resend verification email"
   - Complete verification
4. Try sending again

---

### Problem: API key invalid

**Solution:**
1. Go to: https://app.brevo.com/settings/keys/api
2. Delete old API key
3. Create new API key
4. Copy new key to `.env.local`
5. Restart server

---

## 📈 Monitoring Your Usage

### View Email Statistics

1. Brevo Dashboard: https://app.brevo.com/
2. Go to **Statistics** → **Email**
3. See:
   - Emails sent today
   - Delivery rate
   - Open rate
   - Click rate

### Daily Limit Tracking

- Dashboard shows: "X / 300 emails sent today"
- Resets every day at midnight (your timezone)
- If you hit limit, emails queue until next day

---

## 🎯 Best Practices

### 1. Monitor Your Usage
- Check dashboard daily
- Average ~10-15 form submissions per day = safe
- 300 limit = plenty for most businesses

### 2. Sender Reputation
- Keep sender email verified
- Don't send spam
- Maintain good delivery rate

### 3. Email Content
- Use professional templates (already configured ✅)
- Include unsubscribe link if sending marketing emails
- Keep transactional emails clean

### 4. Testing
- Test regularly to ensure emails working
- Check spam folders
- Verify both admin and customer emails arrive

---

## 🔄 Upgrading to Paid Plan (Optional)

If you need more than 300 emails/day:

**Brevo Pricing**:
- **Lite**: $25/month - 10,000 emails/month
- **Premium**: $65/month - 20,000 emails/month
- **Enterprise**: Custom pricing

**Upgrade at**: https://app.brevo.com/account/plan

---

## 📞 Support

### Brevo Support
- Help Center: https://help.brevo.com/
- Email: contact@brevo.com
- Chat: Available in dashboard

### Your Email System
- Email templates: `/lib/email.ts`
- Contact API: `/app/api/contact/route.ts`
- Rate limiting: 5 requests per hour per IP

---

## ✨ Your Email System Features

Already implemented and working:

- ✅ Beautiful HTML email templates
- ✅ Plain text fallback
- ✅ Brand colors (#812530, #b82b3b)
- ✅ Responsive design
- ✅ Reply-To automatically set
- ✅ Rate limiting (5 per hour)
- ✅ Spam detection
- ✅ Input validation
- ✅ XSS protection
- ✅ Professional layout
- ✅ Social media links
- ✅ Call-to-action buttons

---

## 🎉 You're All Set!

Once you complete the setup:
1. ✅ Brevo account created
2. ✅ API key configured
3. ✅ Sender email verified
4. ✅ Server restarted
5. ✅ Test email sent successfully

Your contact form is now live and sending professional emails! 🚀

---

**Need help?** Check the troubleshooting section above or contact Brevo support.
