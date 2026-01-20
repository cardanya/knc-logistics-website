import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import MapWithSkeleton from '../MapWithSkeleton'

describe('MapWithSkeleton', () => {
  const mockSrc = 'https://maps.google.com/embed?pb=test'
  const mockTitle = 'Google Maps Location'

  it('should render iframe with correct attributes', () => {
    render(<MapWithSkeleton src={mockSrc} title={mockTitle} />)

    const iframe = screen.getByTitle(mockTitle)
    expect(iframe).toBeInTheDocument()
    expect(iframe).toHaveAttribute('src', mockSrc)
    expect(iframe).toHaveAttribute('width', '100%')
    expect(iframe).toHaveAttribute('height', '100%')
    expect(iframe).toHaveAttribute('loading', 'lazy')
  })

  it('should have allowFullScreen attribute', () => {
    render(<MapWithSkeleton src={mockSrc} title={mockTitle} />)

    const iframe = screen.getByTitle(mockTitle)
    expect(iframe).toHaveAttribute('allowFullScreen')
  })

  it('should have correct referrerPolicy', () => {
    render(<MapWithSkeleton src={mockSrc} title={mockTitle} />)

    const iframe = screen.getByTitle(mockTitle)
    expect(iframe).toHaveAttribute('referrerPolicy', 'no-referrer-when-downgrade')
  })

  it('should show skeleton initially', () => {
    const { container } = render(<MapWithSkeleton src={mockSrc} title={mockTitle} />)

    const skeleton = container.querySelector('.map-skeleton')
    expect(skeleton).toBeInTheDocument()
    expect(skeleton).toHaveAttribute('aria-hidden', 'true')
  })

  it('should hide skeleton after iframe loads', () => {
    const { container } = render(<MapWithSkeleton src={mockSrc} title={mockTitle} />)

    const iframe = screen.getByTitle(mockTitle)
    const skeleton = container.querySelector('.map-skeleton')

    expect(skeleton).toBeInTheDocument()

    fireEvent.load(iframe)

    expect(skeleton).not.toBeInTheDocument()
  })

  it('should add is-visible class to iframe after load', () => {
    render(<MapWithSkeleton src={mockSrc} title={mockTitle} />)

    const iframe = screen.getByTitle(mockTitle)

    expect(iframe).not.toHaveClass('is-visible')

    fireEvent.load(iframe)

    expect(iframe).toHaveClass('is-visible')
  })

  it('should have map-wrapper container', () => {
    const { container } = render(<MapWithSkeleton src={mockSrc} title={mockTitle} />)

    const wrapper = container.querySelector('.map-wrapper')
    expect(wrapper).toBeInTheDocument()
  })

  it('should have map-frame class on iframe', () => {
    render(<MapWithSkeleton src={mockSrc} title={mockTitle} />)

    const iframe = screen.getByTitle(mockTitle)
    expect(iframe).toHaveClass('map-frame')
  })
})
