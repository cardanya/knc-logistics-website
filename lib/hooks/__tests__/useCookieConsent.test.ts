import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useCookieConsent } from '../useCookieConsent'

describe('useCookieConsent', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    // Mock window.location.reload
    delete (window as any).location
    window.location = { reload: vi.fn() } as any
  })

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useCookieConsent())

    expect(result.current.hasConsent).toBe(false)
    expect(result.current.showBanner).toBe(false)
    expect(result.current.preferences).toEqual({
      necessary: true,
      analytics: false,
      marketing: false,
    })
  })

  it('should show banner when no consent is stored', async () => {
    const { result } = renderHook(() => useCookieConsent())

    await waitFor(() => {
      expect(result.current.showBanner).toBe(true)
    })
  })

  it('should load existing consent from localStorage', async () => {
    localStorage.setItem('knc-cookie-consent', 'true')
    localStorage.setItem('knc-analytics-consent', 'true')

    const { result } = renderHook(() => useCookieConsent())

    await waitFor(() => {
      expect(result.current.hasConsent).toBe(true)
      expect(result.current.showBanner).toBe(false)
      expect(result.current.preferences.analytics).toBe(true)
    })
  })

  it('should accept all cookies', async () => {
    const { result } = renderHook(() => useCookieConsent())

    act(() => {
      result.current.acceptAll()
    })

    expect(result.current.hasConsent).toBe(true)
    expect(result.current.showBanner).toBe(false)
    expect(result.current.preferences).toEqual({
      necessary: true,
      analytics: true,
      marketing: true,
    })
    expect(localStorage.getItem('knc-cookie-consent')).toBe('true')
    expect(localStorage.getItem('knc-analytics-consent')).toBe('true')
  })

  it('should accept only necessary cookies', async () => {
    const { result } = renderHook(() => useCookieConsent())

    act(() => {
      result.current.acceptNecessary()
    })

    expect(result.current.hasConsent).toBe(true)
    expect(result.current.showBanner).toBe(false)
    expect(result.current.preferences).toEqual({
      necessary: true,
      analytics: false,
      marketing: false,
    })
    expect(localStorage.getItem('knc-cookie-consent')).toBe('true')
    expect(localStorage.getItem('knc-analytics-consent')).toBe('false')
  })

  it('should revoke consent', async () => {
    localStorage.setItem('knc-cookie-consent', 'true')
    localStorage.setItem('knc-analytics-consent', 'true')

    const { result } = renderHook(() => useCookieConsent())

    await waitFor(() => {
      expect(result.current.hasConsent).toBe(true)
    })

    act(() => {
      result.current.revokeConsent()
    })

    expect(result.current.hasConsent).toBe(false)
    expect(result.current.showBanner).toBe(true)
    expect(result.current.preferences).toEqual({
      necessary: true,
      analytics: false,
      marketing: false,
    })
    expect(localStorage.getItem('knc-cookie-consent')).toBeNull()
    expect(localStorage.getItem('knc-analytics-consent')).toBeNull()
  })

  it('should reload page when accepting analytics with gtag present', () => {
    ;(window as any).gtag = vi.fn()
    const { result } = renderHook(() => useCookieConsent())

    act(() => {
      result.current.acceptAll()
    })

    expect(window.location.reload).toHaveBeenCalled()
  })

  it('should not reload page when accepting analytics without gtag', () => {
    delete (window as any).gtag
    const { result } = renderHook(() => useCookieConsent())

    act(() => {
      result.current.acceptAll()
    })

    expect(window.location.reload).not.toHaveBeenCalled()
  })
})
