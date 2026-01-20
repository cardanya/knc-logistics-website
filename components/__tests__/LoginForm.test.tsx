import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from '../LoginForm'

describe('LoginForm', () => {
  it('should render login form with all fields', () => {
    render(<LoginForm />)

    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  it('should show validation errors for empty fields', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    const submitButton = screen.getByRole('button', { name: /login/i })
    await user.click(submitButton)

    expect(await screen.findByText('Email is required')).toBeInTheDocument()
    expect(await screen.findByText('Password is required')).toBeInTheDocument()
  })

  it('should show error for invalid email', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Password')
    const submitButton = screen.getByRole('button', { name: /login/i })

    // Fill with invalid email but valid password to isolate email validation
    await user.type(emailInput, 'invalid-email')
    await user.type(passwordInput, 'password123')
    await user.click(submitButton)

    expect(await screen.findByText('Invalid email address')).toBeInTheDocument()
  })

  it('should show error for short password', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    const passwordInput = screen.getByLabelText('Password')
    const submitButton = screen.getByRole('button', { name: /login/i })

    await user.type(passwordInput, '12345')
    await user.click(submitButton)

    expect(await screen.findByText('Password must be at least 6 characters')).toBeInTheDocument()
  })

  it('should call onSubmit with valid credentials', async () => {
    const user = userEvent.setup()
    const mockOnSubmit = vi.fn()
    render(<LoginForm onSubmit={mockOnSubmit} />)

    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Password')
    const submitButton = screen.getByRole('button', { name: /login/i })

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith('test@example.com', 'password123')
      expect(mockOnSubmit).toHaveBeenCalledTimes(1)
    })
  })

  it('should toggle password visibility', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement
    const toggleButton = screen.getByLabelText(/show password/i)

    expect(passwordInput.type).toBe('password')

    await user.click(toggleButton)
    expect(passwordInput.type).toBe('text')

    await user.click(toggleButton)
    expect(passwordInput.type).toBe('password')
  })

  it('should disable form during submission', async () => {
    const user = userEvent.setup()
    const mockOnSubmit = vi.fn(() => new Promise((resolve) => setTimeout(resolve, 100)))
    render(<LoginForm onSubmit={mockOnSubmit} />)

    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Password')
    const submitButton = screen.getByRole('button', { name: /login/i })

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    await user.click(submitButton)

    expect(screen.getByText('Logging in...')).toBeInTheDocument()
    expect(emailInput).toBeDisabled()
    expect(passwordInput).toBeDisabled()
    expect(submitButton).toBeDisabled()

    await waitFor(() => {
      expect(screen.getByText('Login')).toBeInTheDocument()
    })
  })

  it('should clear errors when user starts typing', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    const emailInput = screen.getByLabelText('Email')
    const submitButton = screen.getByRole('button', { name: /login/i })

    // Trigger validation error
    await user.click(submitButton)
    expect(await screen.findByText('Email is required')).toBeInTheDocument()

    // Start typing - errors should disappear on next submit with valid data
    await user.type(emailInput, 'test@example.com')
    await user.type(screen.getByLabelText('Password'), 'password123')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.queryByText('Email is required')).not.toBeInTheDocument()
    })
  })

  it('should have proper accessibility attributes', () => {
    render(<LoginForm />)

    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Password')

    expect(emailInput).toHaveAttribute('type', 'email')
    expect(passwordInput).toHaveAttribute('type', 'password')
    expect(emailInput).toHaveAttribute('placeholder')
    expect(passwordInput).toHaveAttribute('placeholder')
  })
})
