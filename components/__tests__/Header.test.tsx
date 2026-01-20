import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from '../Header'

describe('Header', () => {
  beforeEach(() => {
    localStorage.clear()
    // Mock document.documentElement.setAttribute
    document.documentElement.setAttribute = vi.fn()
  })

  it('should render logo with correct link', () => {
    render(<Header />)

    const logo = screen.getByRole('link', { name: /k&c logistics/i })
    expect(logo).toHaveAttribute('href', '/')
    expect(logo).toHaveClass('logo')
  })

  it('should render main navigation links', () => {
    render(<Header />)

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about')
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact')
    expect(screen.getByRole('link', { name: 'FAQ' })).toHaveAttribute('href', '/faq')
  })

  it('should render services dropdown button', () => {
    render(<Header />)

    const servicesBtn = screen.getByRole('button', { name: /services/i })
    expect(servicesBtn).toBeInTheDocument()
    expect(servicesBtn).toHaveAttribute('aria-haspopup', 'true')
    expect(servicesBtn).toHaveAttribute('aria-expanded', 'false')
  })

  it('should toggle services dropdown on click', async () => {
    const user = userEvent.setup()
    render(<Header />)

    const servicesBtn = screen.getByRole('button', { name: /services/i })

    await user.click(servicesBtn)
    expect(servicesBtn).toHaveAttribute('aria-expanded', 'true')

    await user.click(servicesBtn)
    expect(servicesBtn).toHaveAttribute('aria-expanded', 'false')
  })

  it('should render all service links in dropdown', () => {
    render(<Header />)

    expect(screen.getByRole('link', { name: /warehousing services/i })).toHaveAttribute('href', '/warehousing-services')
    expect(screen.getByRole('link', { name: /trucking/i })).toHaveAttribute('href', '/trucking')
    expect(screen.getByRole('link', { name: /supply chain solutions/i })).toHaveAttribute('href', '/supply-chain-solutions')
    expect(screen.getByRole('link', { name: /truck parking/i })).toHaveAttribute('href', '/truck-parking')
    expect(screen.getByRole('link', { name: /cross docking/i })).toHaveAttribute('href', '/cross-docking')
  })

  it('should render emergency call button', () => {
    render(<Header />)

    const callBtn = screen.getByRole('link', { name: /need a call\?/i })
    expect(callBtn).toHaveAttribute('href', 'tel:7145882005')
    expect(callBtn).toHaveClass('emergency-call-btn')
  })

  it('should render theme toggle button', () => {
    render(<Header />)

    const themeToggle = screen.getByRole('button', { name: /toggle dark mode/i })
    expect(themeToggle).toBeInTheDocument()
    expect(themeToggle).toHaveAttribute('id', 'themeToggle')
  })

  it('should toggle theme on click', async () => {
    const user = userEvent.setup()
    render(<Header />)

    const themeToggle = screen.getByRole('button', { name: /toggle dark mode/i })
    const moonIcon = document.querySelector('.fa-moon')
    expect(moonIcon).toBeInTheDocument()

    await user.click(themeToggle)

    const sunIcon = document.querySelector('.fa-sun')
    expect(sunIcon).toBeInTheDocument()
    expect(localStorage.getItem('theme')).toBe('dark')
  })

  it('should render mobile menu button', () => {
    render(<Header />)

    const mobileMenuBtn = screen.getByRole('button', { name: /toggle mobile menu/i })
    expect(mobileMenuBtn).toBeInTheDocument()
    expect(mobileMenuBtn).toHaveClass('mobile-menu-btn')
  })

  it('should toggle mobile menu on click', async () => {
    const user = userEvent.setup()
    const { container } = render(<Header />)

    const mobileMenuBtn = screen.getByRole('button', { name: /toggle mobile menu/i })
    const navLinks = container.querySelector('.nav-links')

    expect(navLinks).not.toHaveClass('active')

    await user.click(mobileMenuBtn)
    expect(navLinks).toHaveClass('active')

    await user.click(mobileMenuBtn)
    expect(navLinks).not.toHaveClass('active')
  })

  it('should change mobile menu icon when open', async () => {
    const user = userEvent.setup()
    render(<Header />)

    const mobileMenuBtn = screen.getByRole('button', { name: /toggle mobile menu/i })
    const barsIcon = document.querySelector('.fa-bars')
    expect(barsIcon).toBeInTheDocument()

    await user.click(mobileMenuBtn)

    const timesIcon = document.querySelector('.fa-times')
    expect(timesIcon).toBeInTheDocument()
  })

  it('should close mobile menu when navigation link is clicked', async () => {
    const user = userEvent.setup()
    const { container } = render(<Header />)

    const mobileMenuBtn = screen.getByRole('button', { name: /toggle mobile menu/i })
    await user.click(mobileMenuBtn)

    const navLinks = container.querySelector('.nav-links')
    expect(navLinks).toHaveClass('active')

    const homeLink = screen.getByRole('link', { name: 'Home' })
    await user.click(homeLink)

    expect(navLinks).not.toHaveClass('active')
  })

  it('should load theme from localStorage on mount', () => {
    localStorage.setItem('theme', 'dark')
    render(<Header />)

    const sunIcon = document.querySelector('.fa-sun')
    expect(sunIcon).toBeInTheDocument()
  })

  it('should have correct structure', () => {
    const { container } = render(<Header />)

    expect(container.querySelector('header')).toBeInTheDocument()
    expect(container.querySelector('nav')).toBeInTheDocument()
    expect(container.querySelector('.nav-links')).toBeInTheDocument()
    expect(container.querySelector('.nav-right')).toBeInTheDocument()
  })
})
