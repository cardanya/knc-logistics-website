import { test, expect } from '@playwright/test'

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact')
    await page.waitForLoadState('networkidle')
  })

  test('should display contact form', async ({ page }) => {
    // Check form is visible
    await expect(page.locator('form')).toBeVisible()

    // Check all form fields are present
    await expect(page.locator('select[name="service"]')).toBeVisible()
    await expect(page.locator('input[name="name"]')).toBeVisible()
    await expect(page.locator('input[name="email"]')).toBeVisible()
    await expect(page.locator('input[name="phone"]')).toBeVisible()
    await expect(page.locator('textarea[name="message"]')).toBeVisible()
  })

  test('should show validation errors for empty form', async ({ page }) => {
    // Click submit without filling form
    const submitButton = page.getByRole('button', { name: /submit|send/i })
    await submitButton.click()

    // Wait for validation errors
    await page.waitForTimeout(500)

    // Should show error messages (exact selectors depend on your implementation)
    // This is an example - adjust based on your actual error display
    const errorMessages = page.locator('.error-message, [role="alert"]')
    await expect(errorMessages.first()).toBeVisible()
  })

  test('should submit form with valid data', async ({ page }) => {
    // Fill out the form
    await page.selectOption('select[name="service"]', { index: 1 })
    await page.fill('input[name="name"]', 'Test User')
    await page.fill('input[name="email"]', 'test@example.com')
    await page.fill('input[name="phone"]', '714-588-2005')
    await page.fill('textarea[name="message"]', 'This is a test message for automated testing.')

    // Submit form
    const submitButton = page.getByRole('button', { name: /submit|send/i })
    await submitButton.click()

    // Wait for success response
    await page.waitForTimeout(2000)

    // Check for success message or redirect
    // Adjust this based on your actual success behavior
    const successMessage = page.locator('.success-message, .toast')
    await expect(successMessage).toBeVisible({ timeout: 10000 })
  })

  test('should validate email format', async ({ page }) => {
    // Fill form with invalid email
    await page.selectOption('select[name="service"]', { index: 1 })
    await page.fill('input[name="name"]', 'Test User')
    await page.fill('input[name="email"]', 'invalid-email')
    await page.fill('textarea[name="message"]', 'Test message')

    // Submit form
    const submitButton = page.getByRole('button', { name: /submit|send/i })
    await submitButton.click()

    // Should show email validation error
    await page.waitForTimeout(500)
    // Adjust selector based on your error display
    const emailError = page.locator('[id*="email"][class*="error"], .error-message')
    await expect(emailError.first()).toBeVisible()
  })

  test('should disable submit button while loading', async ({ page }) => {
    // Fill out the form
    await page.selectOption('select[name="service"]', { index: 1 })
    await page.fill('input[name="name"]', 'Test User')
    await page.fill('input[name="email"]', 'test@example.com')
    await page.fill('textarea[name="message"]', 'Test message')

    // Submit form
    const submitButton = page.getByRole('button', { name: /submit|send/i })
    await submitButton.click()

    // Button should be disabled immediately
    await expect(submitButton).toBeDisabled()

    // Wait for request to complete
    await page.waitForTimeout(3000)
  })

  test('should display contact information', async ({ page }) => {
    // Check that contact info is displayed
    await expect(page.locator('text=/3060 Daimler/i')).toBeVisible()
    await expect(page.locator('text=/Santa Ana/i')).toBeVisible()
    await expect(page.locator('a[href*="tel:714"]')).toBeVisible()
    await expect(page.locator('text=/info@knclogistics.com/i')).toBeVisible()
  })

  test('should display Google Maps', async ({ page }) => {
    // Check for map containers
    const mapContainers = page.locator('iframe[src*="google.com/maps"], .map-container')

    // Should have at least one map
    const count = await mapContainers.count()
    expect(count).toBeGreaterThan(0)
  })

  test('should open directions in Google Maps', async ({ page, context }) => {
    // Find "Get Directions" button or link
    const directionsLink = page.locator('button:has-text("Directions"), a:has-text("Directions")').first()

    if (await directionsLink.isVisible()) {
      // Listen for new page/tab
      const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        directionsLink.click()
      ])

      // Verify new page URL is Google Maps
      await expect(newPage).toHaveURL(/google.com\/maps/i)
      await newPage.close()
    }
  })

  test('should have breadcrumb navigation', async ({ page }) => {
    // Check breadcrumb exists
    const breadcrumb = page.locator('.breadcrumb, nav[aria-label="breadcrumb"]')
    await expect(breadcrumb).toBeVisible()

    // Check breadcrumb contains Home and Contact
    await expect(breadcrumb).toContainText(/home/i)
    await expect(breadcrumb).toContainText(/contact/i)
  })
})
