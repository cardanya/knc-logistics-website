import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from '../Footer'

describe('Footer', () => {
  it('should render company description', () => {
    render(<Footer />)

    expect(screen.getByText('K&C Logistics')).toBeInTheDocument()
    expect(screen.getByText(/your trusted solution partner/i)).toBeInTheDocument()
  })

  it('should render Quick Links section', () => {
    render(<Footer />)

    expect(screen.getByText('Quick Links')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'About Us' })).toHaveAttribute('href', '/about')
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact')
    expect(screen.getByRole('link', { name: 'FAQ' })).toHaveAttribute('href', '/faq')
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute('href', '/privacy-policy')
    expect(screen.getByRole('link', { name: 'Terms of Service' })).toHaveAttribute('href', '/terms-of-service')
  })

  it('should render Services section', () => {
    render(<Footer />)

    expect(screen.getByText('Services')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Warehousing' })).toHaveAttribute('href', '/warehousing-services')
    expect(screen.getByRole('link', { name: 'Trucking' })).toHaveAttribute('href', '/trucking')
    expect(screen.getByRole('link', { name: 'Supply Chain' })).toHaveAttribute('href', '/supply-chain-solutions')
    expect(screen.getByRole('link', { name: 'Truck Parking' })).toHaveAttribute('href', '/truck-parking')
    expect(screen.getByRole('link', { name: 'Cross Docking' })).toHaveAttribute('href', '/cross-docking')
  })

  it('should render social media links with correct attributes', () => {
    render(<Footer />)

    const facebook = screen.getByRole('link', { name: 'Facebook' })
    expect(facebook).toHaveAttribute('href', 'https://www.facebook.com/profile.php?id=61581692743100')
    expect(facebook).toHaveAttribute('target', '_blank')
    expect(facebook).toHaveAttribute('rel', 'noopener noreferrer')

    const instagram = screen.getByRole('link', { name: 'Instagram' })
    expect(instagram).toHaveAttribute('href', 'https://www.instagram.com/knclogistics.co/')

    const twitter = screen.getByRole('link', { name: 'X (Twitter)' })
    expect(twitter).toHaveAttribute('href', 'https://x.com/knclogistics')

    const linkedin = screen.getByRole('link', { name: 'LinkedIn' })
    expect(linkedin).toHaveAttribute('href', 'https://www.linkedin.com/in/knclogistics/')

    const tiktok = screen.getByRole('link', { name: 'TikTok' })
    expect(tiktok).toHaveAttribute('href', 'https://www.tiktok.com/@knclogistics')
  })

  it('should render copyright notice', () => {
    render(<Footer />)

    expect(screen.getByText(/© 2025 K&C Logistics. All rights reserved./i)).toBeInTheDocument()
  })

  it('should have correct structure', () => {
    const { container } = render(<Footer />)

    expect(container.querySelector('footer')).toBeInTheDocument()
    expect(container.querySelector('.footer-content')).toBeInTheDocument()
    expect(container.querySelector('.footer-bottom')).toBeInTheDocument()
    expect(container.querySelectorAll('.footer-section')).toHaveLength(4)
  })

  it('should have social media icons', () => {
    const { container } = render(<Footer />)

    expect(container.querySelector('.fa-facebook-f')).toBeInTheDocument()
    expect(container.querySelector('.fa-instagram')).toBeInTheDocument()
    expect(container.querySelector('.fa-x-twitter')).toBeInTheDocument()
    expect(container.querySelector('.fa-linkedin-in')).toBeInTheDocument()
    expect(container.querySelector('.fa-tiktok')).toBeInTheDocument()
  })
})
