import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import MobileStickyBar from '../MobileStickyBar'

describe('MobileStickyBar', () => {
  it('should render all quick action buttons', () => {
    render(<MobileStickyBar />)

    expect(screen.getByRole('link', { name: /call/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /whatsapp/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /directions/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /get a quote/i })).toBeInTheDocument()
  })

  it('should have call button with correct tel link', () => {
    render(<MobileStickyBar />)

    const callBtn = screen.getByRole('link', { name: /call/i })
    expect(callBtn).toHaveAttribute('href', 'tel:7145882005')
    expect(callBtn).toHaveAttribute('target', '_blank')
    expect(callBtn).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('should have WhatsApp button with correct link', () => {
    render(<MobileStickyBar />)

    const whatsappBtn = screen.getByRole('link', { name: /whatsapp/i })
    expect(whatsappBtn).toHaveAttribute('href', expect.stringContaining('wa.me/17149097190'))
    expect(whatsappBtn).toHaveAttribute('target', '_blank')
  })

  it('should have Directions button with Google Maps link', () => {
    render(<MobileStickyBar />)

    const directionsBtn = screen.getByRole('link', { name: /directions/i })
    expect(directionsBtn).toHaveAttribute('href', expect.stringContaining('google.com/maps'))
    expect(directionsBtn).toHaveAttribute('target', '_blank')
  })

  it('should have Get a Quote button with anchor link', () => {
    render(<MobileStickyBar />)

    const quoteBtn = screen.getByRole('link', { name: /get a quote/i })
    expect(quoteBtn).toHaveAttribute('href', '#contact')
  })

  it('should have correct icons for each action', () => {
    const { container } = render(<MobileStickyBar />)

    expect(container.querySelector('.fa-phone')).toBeInTheDocument()
    expect(container.querySelector('.fa-whatsapp')).toBeInTheDocument()
    expect(container.querySelector('.fa-location-arrow')).toBeInTheDocument()
    expect(container.querySelector('.fa-paper-plane')).toBeInTheDocument()
  })

  it('should have aria-label for navigation', () => {
    const { container } = render(<MobileStickyBar />)

    const nav = container.querySelector('nav')
    expect(nav).toHaveAttribute('aria-label', 'Quick actions')
  })

  it('should render buttons with correct class', () => {
    const { container } = render(<MobileStickyBar />)

    const buttons = container.querySelectorAll('.sticky-bar-btn')
    expect(buttons).toHaveLength(4)
  })

  it('should have icons with aria-hidden', () => {
    const { container } = render(<MobileStickyBar />)

    const icons = container.querySelectorAll('i[aria-hidden="true"]')
    expect(icons.length).toBeGreaterThan(0)
  })
})
