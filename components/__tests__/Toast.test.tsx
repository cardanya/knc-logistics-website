import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Toast from '../Toast'

describe('Toast', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should render success toast with correct icon', () => {
    const onClose = vi.fn()
    render(<Toast message="Success message" type="success" onClose={onClose} />)

    expect(screen.getByText('Success message')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveClass('toast-success')

    const icon = document.querySelector('.fa-check-circle')
    expect(icon).toBeInTheDocument()
  })

  it('should render error toast with correct icon', () => {
    const onClose = vi.fn()
    render(<Toast message="Error message" type="error" onClose={onClose} />)

    expect(screen.getByText('Error message')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveClass('toast-error')

    const icon = document.querySelector('.fa-exclamation-circle')
    expect(icon).toBeInTheDocument()
  })

  it('should render info toast with correct icon', () => {
    const onClose = vi.fn()
    render(<Toast message="Info message" type="info" onClose={onClose} />)

    expect(screen.getByText('Info message')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveClass('toast-info')

    const icon = document.querySelector('.fa-info-circle')
    expect(icon).toBeInTheDocument()
  })

  it('should call onClose when close button is clicked', () => {
    const onClose = vi.fn()
    render(<Toast message="Test message" type="info" onClose={onClose} />)

    const closeButton = screen.getByRole('button', { name: /close notification/i })
    closeButton.click()

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('should auto-close after default duration', () => {
    const onClose = vi.fn()
    render(<Toast message="Test message" type="info" onClose={onClose} />)

    expect(onClose).not.toHaveBeenCalled()

    vi.advanceTimersByTime(5000)

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('should auto-close after custom duration', () => {
    const onClose = vi.fn()
    render(<Toast message="Test message" type="info" onClose={onClose} duration={3000} />)

    vi.advanceTimersByTime(2999)
    expect(onClose).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('should have correct accessibility attributes', () => {
    const onClose = vi.fn()
    render(<Toast message="Test message" type="success" onClose={onClose} />)

    const alert = screen.getByRole('alert')
    expect(alert).toHaveAttribute('aria-live', 'polite')
  })

  it('should have close button with correct aria-label', () => {
    const onClose = vi.fn()
    render(<Toast message="Test message" type="success" onClose={onClose} />)

    const closeButton = screen.getByRole('button', { name: /close notification/i })
    expect(closeButton).toHaveClass('toast-close')
  })
})
