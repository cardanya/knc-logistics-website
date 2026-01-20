import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import WhatsAppWidget from '../WhatsAppWidget'

describe('WhatsAppWidget', () => {
  beforeEach(() => {
    // Mock window.open
    global.window.open = vi.fn()
  })

  it('should render WhatsApp button', () => {
    render(<WhatsAppWidget />)

    const button = screen.getByRole('button', { name: /chat on whatsapp/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('whatsapp-button')
  })

  it('should not show tooltip initially', () => {
    render(<WhatsAppWidget />)

    expect(screen.queryByText(/need help\? chat with us!/i)).not.toBeInTheDocument()
  })

  it('should show tooltip on hover', async () => {
    const user = userEvent.setup()
    render(<WhatsAppWidget />)

    const button = screen.getByRole('button', { name: /chat on whatsapp/i })

    await user.hover(button)

    const tooltip = screen.getByText(/need help\? chat with us!/i)
    expect(tooltip).toBeInTheDocument()
    expect(tooltip.parentElement).toHaveClass('whatsapp-tooltip')
  })

  it('should hide tooltip on mouse leave', async () => {
    const user = userEvent.setup()
    render(<WhatsAppWidget />)

    const button = screen.getByRole('button', { name: /chat on whatsapp/i })

    await user.hover(button)
    expect(screen.getByText(/need help\? chat with us!/i)).toBeInTheDocument()

    await user.unhover(button)
    expect(screen.queryByText(/need help\? chat with us!/i)).not.toBeInTheDocument()
  })

  it('should open WhatsApp with correct URL on click', async () => {
    const user = userEvent.setup()
    render(<WhatsAppWidget />)

    const button = screen.getByRole('button', { name: /chat on whatsapp/i })
    await user.click(button)

    expect(window.open).toHaveBeenCalledWith(
      'https://wa.me/17149097190?text=Hello!%20I%20would%20like%20to%20inquire%20about%20your%20logistics%20services.',
      '_blank'
    )
  })

  it('should have correct WhatsApp icon', () => {
    render(<WhatsAppWidget />)

    const icon = screen.getByRole('button', { name: /chat on whatsapp/i }).querySelector('i')
    expect(icon).toHaveClass('fab', 'fa-whatsapp')
  })
})
