import { describe, it, expect } from 'vitest'
import { formatPhoneNumber, formatCurrency } from '../formatters'

describe('formatPhoneNumber', () => {
  it('should format valid 10-digit phone number', () => {
    expect(formatPhoneNumber('7145882005')).toBe('(714) 588-2005')
  })

  it('should format phone number with special characters', () => {
    expect(formatPhoneNumber('(714) 588-2005')).toBe('(714) 588-2005')
    expect(formatPhoneNumber('714-588-2005')).toBe('(714) 588-2005')
    expect(formatPhoneNumber('714.588.2005')).toBe('(714) 588-2005')
  })

  it('should throw error for invalid length', () => {
    expect(() => formatPhoneNumber('123')).toThrow('Phone number must have exactly 10 digits')
    expect(() => formatPhoneNumber('12345678901')).toThrow('Phone number must have exactly 10 digits')
  })

  it('should throw error for empty string', () => {
    expect(() => formatPhoneNumber('')).toThrow('Phone number must have exactly 10 digits')
  })

  it('should throw error for numbers with country code', () => {
    // This test verifies the function throws for 11 digits (country code included)
    expect(() => formatPhoneNumber('+17145882005')).toThrow('Phone number must have exactly 10 digits')
  })
})

describe('formatCurrency', () => {
  it('should format positive numbers correctly', () => {
    expect(formatCurrency(100)).toBe('$100.00')
    expect(formatCurrency(1234.56)).toBe('$1,234.56')
    expect(formatCurrency(1000000)).toBe('$1,000,000.00')
  })

  it('should format zero correctly', () => {
    expect(formatCurrency(0)).toBe('$0.00')
  })

  it('should format negative numbers correctly', () => {
    expect(formatCurrency(-50)).toBe('-$50.00')
    expect(formatCurrency(-1234.56)).toBe('-$1,234.56')
  })

  it('should round to 2 decimal places', () => {
    expect(formatCurrency(10.999)).toBe('$11.00')
    expect(formatCurrency(10.123)).toBe('$10.12')
  })

  it('should throw error for invalid input', () => {
    expect(() => formatCurrency(NaN)).toThrow('Amount must be a valid number')
    expect(() => formatCurrency('100' as any)).toThrow('Amount must be a valid number')
    expect(() => formatCurrency(undefined as any)).toThrow('Amount must be a valid number')
  })

  it('should handle very large numbers', () => {
    expect(formatCurrency(999999999.99)).toBe('$999,999,999.99')
  })

  it('should handle very small numbers', () => {
    expect(formatCurrency(0.01)).toBe('$0.01')
    expect(formatCurrency(0.001)).toBe('$0.00')
  })
})
