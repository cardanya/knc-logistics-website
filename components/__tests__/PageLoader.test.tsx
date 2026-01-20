import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import PageLoader from '../PageLoader'

describe('PageLoader', () => {
  it('should render loader with K&C branding', () => {
    render(<PageLoader />)

    expect(screen.getByText('K&C')).toBeInTheDocument()
    expect(screen.getByText('LOGISTICS')).toBeInTheDocument()
  })

  it('should display loading message', () => {
    render(<PageLoader />)

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('should have correct structure', () => {
    const { container } = render(<PageLoader />)

    expect(container.querySelector('.page-loader')).toBeInTheDocument()
    expect(container.querySelector('.loader-content')).toBeInTheDocument()
    expect(container.querySelector('.loader-logo')).toBeInTheDocument()
    expect(container.querySelector('.loader-spinner')).toBeInTheDocument()
  })

  it('should render spinner rings', () => {
    const { container } = render(<PageLoader />)

    const rings = container.querySelectorAll('.spinner-ring')
    expect(rings).toHaveLength(3)
  })

  it('should have loader text elements', () => {
    const { container } = render(<PageLoader />)

    expect(container.querySelector('.loader-text')).toHaveTextContent('K&C')
    expect(container.querySelector('.loader-subtext')).toHaveTextContent('LOGISTICS')
    expect(container.querySelector('.loader-message')).toHaveTextContent('Loading...')
  })
})
