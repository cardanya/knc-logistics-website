# Security Policy

## Environment Variables

This project uses environment variables for configuration. **NEVER commit `.env.local` or any file containing real API keys to Git.**

### Setup

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your actual API keys and secrets

3. Verify `.env.local` is ignored:
   ```bash
   git check-ignore .env.local
   # Should output: .gitignore:34:.env* .env.local
   ```

### Required Keys

- **BREVO_API_KEY**: Email sending service ([Get key](https://app.brevo.com/settings/keys/api))
- **RECAPTCHA_SECRET_KEY**: Bot protection ([Get key](https://www.google.com/recaptcha/admin))
- **NEXT_PUBLIC_RECAPTCHA_SITE_KEY**: reCAPTCHA client key
- **NEXT_PUBLIC_GOOGLE_MAPS_API_KEY**: Google Maps embedding
- **NEXT_PUBLIC_GA_ID**: Google Analytics tracking

### Key Rotation

If API keys are accidentally exposed:

1. **Immediately revoke** the exposed keys in the respective service dashboards
2. Generate new keys
3. Update `.env.local` locally
4. Update Vercel environment variables
5. Redeploy the application
6. Clean Git history if keys were committed (see below)

### Git History Cleanup

If `.env.local` was accidentally committed:

```bash
# Remove from cache
git rm --cached .env.local

# Use BFG Repo-Cleaner to remove from history
# Install: brew install bfg
bfg --delete-files .env.local

# Clean up and force push (coordinate with team)
git reflog expire --expire=now --all
git gc --prune=now --aggressive
git push --force
```

## Security Best Practices

### .gitignore Verification

Always verify `.env.local` is ignored before committing:

```bash
# Check ignore status
git check-ignore -v .env.local

# Verify not in staging
git ls-files --cached | grep .env.local
# (should return nothing)

# Check git status
git status
# (.env.local should NOT appear)
```

### Pre-commit Checks

Before every commit:

1. Run `git status` to review staged changes
2. Ensure no `.env` files are listed
3. Use `git diff --cached` to review actual content
4. Never use `git add .` or `git add -A` blindly

### Environment Variable Management

- **Development**: Use `.env.local` (git-ignored)
- **Production**: Use Vercel Environment Variables dashboard
- **Documentation**: Keep `.env.example` updated with dummy values
- **Secrets**: Never log, print, or expose in error messages

## GitHub Repository Protection

### Recommended Settings

1. Go to: https://github.com/cardanya/knc-logistics-website/settings/security_analysis
2. Enable:
   - ✅ Secret scanning
   - ✅ Push protection (prevents accidental commits of secrets)
   - ✅ Dependabot alerts
   - ✅ Code scanning (optional)

### Branch Protection Rules

Consider enabling:
- Require pull request reviews
- Require status checks to pass
- Require branches to be up to date

## Deployment Security (Vercel)

### Environment Variables Update

1. Go to: https://vercel.com/dashboard
2. Select project: `knc-logistics-website`
3. Settings → Environment Variables
4. Update keys and click "Save"
5. Trigger redeploy from Deployments tab

### After Deployment

- Test contact form to verify email delivery
- Check reCAPTCHA functionality
- Monitor Vercel logs for API errors
- Verify no secrets in deployment logs

## Incident Response

If you suspect a key has been exposed:

### Immediate Actions (Within 1 hour)
1. ✅ Revoke the exposed key immediately
2. ✅ Generate and deploy new key
3. ✅ Check Git history for exposure
4. ✅ Review access logs for unauthorized use

### Short-term Actions (Within 24 hours)
1. Remove key from Git history if committed
2. Rotate all related credentials
3. Review recent application logs
4. Check for suspicious activity in service dashboards

### Long-term Actions
1. Document the incident
2. Update security procedures
3. Team training on secret management
4. Consider implementing pre-commit hooks

## Service-Specific Security

### Brevo (Email)
- Dashboard: https://app.brevo.com/settings/keys/api
- Monitor: Sending limits, bounce rates, spam reports
- Rotate keys: Quarterly or after exposure

### Google reCAPTCHA
- Console: https://www.google.com/recaptcha/admin
- Monitor: Request counts, bot scores
- Score threshold: 0.5 (adjust based on false positives)

### Google Maps
- Console: https://console.cloud.google.com/apis/credentials
- Restrict: By HTTP referrer (domain)
- Monitor: Daily quota usage

### Google Analytics
- Admin: https://analytics.google.com/
- Privacy: GDPR compliance, cookie consent
- Data retention: Configure appropriately

## Contact

If you discover a security vulnerability, please email: security@knclogistics.com

**Do not** open a public GitHub issue for security vulnerabilities.

## Security Checklist

Before going to production:
- [ ] All `.env*` files in `.gitignore`
- [ ] No secrets in Git history
- [ ] Vercel environment variables set
- [ ] GitHub secret scanning enabled
- [ ] API keys restricted by domain/IP
- [ ] Rate limiting configured
- [ ] Error messages don't expose secrets
- [ ] Logs don't contain sensitive data
- [ ] HTTPS enforced
- [ ] Security headers configured
- [ ] Dependencies regularly updated
- [ ] Team trained on security practices

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security Best Practices](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#security)
- [Vercel Security Documentation](https://vercel.com/docs/concepts/security)
- [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning/about-secret-scanning)
