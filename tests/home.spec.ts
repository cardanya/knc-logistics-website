import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/')

    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle')

    // Check page title
    await expect(page).toHaveTitle(/K&C Logistics/i)

    // Check that main content is visible
    await expect(page.locator('header')).toBeVisible()
    await expect(page.locator('main')).toBeVisible()
    await expect(page.locator('footer')).toBeVisible()
  })

  test('should display logo and navigation', async ({ page }) => {
    await page.goto('/')

    // Check logo
    const logo = page.locator('header img[alt*="K&C"]')
    await expect(logo).toBeVisible()

    // Check navigation links
    await expect(page.getByRole('link', { name: /home/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /about/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /contact/i })).toBeVisible()
  })

  test('should open services dropdown menu', async ({ page }) => {
    await page.goto('/')

    // Find and click services dropdown
    const servicesButton = page.locator('button:has-text("Services")')
    await servicesButton.click()

    // Check dropdown menu is visible
    const dropdown = page.locator('.services-dropdown-menu.active')
    await expect(dropdown).toBeVisible()

    // Check dropdown items
    await expect(page.getByRole('link', { name: /warehousing/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /trucking/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /supply chain/i })).toBeVisible()
  })

  test('should navigate to contact page from CTA', async ({ page }) => {
    await page.goto('/')

    // Find and click a Contact CTA button
    const contactButton = page.getByRole('link', { name: /contact/i }).first()
    await contactButton.click()

    // Wait for navigation
    await page.waitForURL('**/contact')

    // Verify we're on contact page
    await expect(page).toHaveURL(/\/contact/)
    await expect(page.locator('h1, h2')).toContainText(/contact/i)
  })

  test('should display phone number in header', async ({ page }) => {
    await page.goto('/')

    // Check emergency call button
    const phoneLink = page.locator('a[href*="tel:"]').first()
    await expect(phoneLink).toBeVisible()
    await expect(phoneLink).toHaveAttribute('href', /714/)
  })

  test('should toggle dark mode', async ({ page }) => {
    await page.goto('/')

    // Find theme toggle button
    const themeToggle = page.locator('button#themeToggle, button[aria-label*="dark"]')
    await themeToggle.click()

    // Wait a bit for theme to apply
    await page.waitForTimeout(500)

    // Check if theme changed (could check for dark theme class or localStorage)
    const html = page.locator('html')
    const themeAttr = await html.getAttribute('data-theme')
    expect(themeAttr).toBeTruthy()
  })

  test('should display WhatsApp widget', async ({ page }) => {
    await page.goto('/')

    // Check WhatsApp widget is present
    const whatsappWidget = page.locator('a[href*="wa.me"]')
    await expect(whatsappWidget).toBeVisible()
  })

  test('should be responsive on mobile', async ({ page, isMobile }) => {
    await page.goto('/')

    if (isMobile) {
      // On mobile, check that mobile menu button exists
      const mobileMenuBtn = page.locator('button.mobile-menu-btn')
      await expect(mobileMenuBtn).toBeVisible()

      // Click mobile menu
      await mobileMenuBtn.click()

      // Check nav is visible
      const nav = page.locator('.nav-links.active')
      await expect(nav).toBeVisible()
    }
  })

  test('should have proper meta tags for SEO', async ({ page }) => {
    await page.goto('/')

    // Check meta description
    const metaDescription = page.locator('meta[name="description"]')
    await expect(metaDescription).toHaveAttribute('content', /.+/)

    // Check Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"]')
    await expect(ogTitle).toHaveAttribute('content', /.+/)
  })
})
