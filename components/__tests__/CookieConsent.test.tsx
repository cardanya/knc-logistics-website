import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CookieConsent from '../CookieConsent'
import * as useCookieConsentModule from '@/lib/hooks/useCookieConsent'

describe('CookieConsent', () => {
  const mockAcceptAll = vi.fn()
  const mockAcceptNecessary = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should not render when showBanner is false', () => {
    vi.spyOn(useCookieConsentModule, 'useCookieConsent').mockReturnValue({
      showBanner: false,
      acceptAll: mockAcceptAll,
      acceptNecessary: mockAcceptNecessary,
      hasConsent: true,
      preferences: { necessary: true, analytics: true, marketing: false },
      savePreferences: vi.fn(),
      revokeConsent: vi.fn(),
    })

    const { container } = render(<CookieConsent />)
    expect(container.firstChild).toBeNull()
  })

  it('should render banner when showBanner is true', () => {
    vi.spyOn(useCookieConsentModule, 'useCookieConsent').mockReturnValue({
      showBanner: true,
      acceptAll: mockAcceptAll,
      acceptNecessary: mockAcceptNecessary,
      hasConsent: false,
      preferences: { necessary: true, analytics: false, marketing: false },
      savePreferences: vi.fn(),
      revokeConsent: vi.fn(),
    })

    render(<CookieConsent />)

    expect(screen.getByText('We Value Your Privacy')).toBeInTheDocument()
    expect(screen.getByText(/we use cookies to enhance your browsing experience/i)).toBeInTheDocument()
  })

  it('should have privacy policy link', () => {
    vi.spyOn(useCookieConsentModule, 'useCookieConsent').mockReturnValue({
      showBanner: true,
      acceptAll: mockAcceptAll,
      acceptNecessary: mockAcceptNecessary,
      hasConsent: false,
      preferences: { necessary: true, analytics: false, marketing: false },
      savePreferences: vi.fn(),
      revokeConsent: vi.fn(),
    })

    render(<CookieConsent />)

    const privacyLink = screen.getByRole('link', { name: /privacy policy/i })
    expect(privacyLink).toBeInTheDocument()
    expect(privacyLink).toHaveAttribute('href', '/privacy-policy')
  })

  it('should call acceptNecessary when Necessary Only button is clicked', async () => {
    const user = userEvent.setup()
    vi.spyOn(useCookieConsentModule, 'useCookieConsent').mockReturnValue({
      showBanner: true,
      acceptAll: mockAcceptAll,
      acceptNecessary: mockAcceptNecessary,
      hasConsent: false,
      preferences: { necessary: true, analytics: false, marketing: false },
      savePreferences: vi.fn(),
      revokeConsent: vi.fn(),
    })

    render(<CookieConsent />)

    const necessaryButton = screen.getByRole('button', { name: /accept only necessary cookies/i })
    await user.click(necessaryButton)

    expect(mockAcceptNecessary).toHaveBeenCalledTimes(1)
  })

  it('should call acceptAll when Accept All button is clicked', async () => {
    const user = userEvent.setup()
    vi.spyOn(useCookieConsentModule, 'useCookieConsent').mockReturnValue({
      showBanner: true,
      acceptAll: mockAcceptAll,
      acceptNecessary: mockAcceptNecessary,
      hasConsent: false,
      preferences: { necessary: true, analytics: false, marketing: false },
      savePreferences: vi.fn(),
      revokeConsent: vi.fn(),
    })

    render(<CookieConsent />)

    const acceptButton = screen.getByRole('button', { name: /accept all cookies/i })
    await user.click(acceptButton)

    expect(mockAcceptAll).toHaveBeenCalledTimes(1)
  })

  it('should have correct button classes', () => {
    vi.spyOn(useCookieConsentModule, 'useCookieConsent').mockReturnValue({
      showBanner: true,
      acceptAll: mockAcceptAll,
      acceptNecessary: mockAcceptNecessary,
      hasConsent: false,
      preferences: { necessary: true, analytics: false, marketing: false },
      savePreferences: vi.fn(),
      revokeConsent: vi.fn(),
    })

    render(<CookieConsent />)

    const necessaryButton = screen.getByRole('button', { name: /accept only necessary cookies/i })
    const acceptButton = screen.getByRole('button', { name: /accept all cookies/i })

    expect(necessaryButton).toHaveClass('btn-decline')
    expect(acceptButton).toHaveClass('btn-accept')
  })

  it('should have cookie icon', () => {
    vi.spyOn(useCookieConsentModule, 'useCookieConsent').mockReturnValue({
      showBanner: true,
      acceptAll: mockAcceptAll,
      acceptNecessary: mockAcceptNecessary,
      hasConsent: false,
      preferences: { necessary: true, analytics: false, marketing: false },
      savePreferences: vi.fn(),
      revokeConsent: vi.fn(),
    })

    render(<CookieConsent />)

    const icon = document.querySelector('.fa-cookie-bite')
    expect(icon).toBeInTheDocument()
  })
})
