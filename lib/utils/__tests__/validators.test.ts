import { describe, it, expect } from 'vitest'
import { isValidEmail, isStrongPassword } from '../validators'

describe('isValidEmail', () => {
  it('should validate correct email addresses', () => {
    expect(isValidEmail('test@example.com')).toBe(true)
    expect(isValidEmail('user.name@example.com')).toBe(true)
    expect(isValidEmail('user+tag@example.co.uk')).toBe(true)
    expect(isValidEmail('info@knclogistics.com')).toBe(true)
  })

  it('should reject invalid email addresses', () => {
    expect(isValidEmail('invalid')).toBe(false)
    expect(isValidEmail('invalid@')).toBe(false)
    expect(isValidEmail('@example.com')).toBe(false)
    expect(isValidEmail('user@')).toBe(false)
    expect(isValidEmail('user @example.com')).toBe(false)
  })

  it('should handle edge cases', () => {
    expect(isValidEmail('')).toBe(false)
    expect(isValidEmail(' ')).toBe(false)
    expect(isValidEmail(null as any)).toBe(false)
    expect(isValidEmail(undefined as any)).toBe(false)
    expect(isValidEmail(123 as any)).toBe(false)
  })

  it('should trim whitespace before validation', () => {
    expect(isValidEmail('  test@example.com  ')).toBe(true)
  })

  it('should reject emails without domain extension', () => {
    expect(isValidEmail('user@domain')).toBe(false)
  })
})

describe('isStrongPassword', () => {
  it('should validate strong passwords', () => {
    expect(isStrongPassword('Password123')).toBe(true)
    expect(isStrongPassword('MyP@ssw0rd')).toBe(true)
    expect(isStrongPassword('Abcdef12')).toBe(true)
  })

  it('should reject weak passwords - too short', () => {
    expect(isStrongPassword('Pass1')).toBe(false)
    expect(isStrongPassword('Aa1')).toBe(false)
  })

  it('should reject passwords without uppercase', () => {
    expect(isStrongPassword('password123')).toBe(false)
    expect(isStrongPassword('mypassword1')).toBe(false)
  })

  it('should reject passwords without lowercase', () => {
    expect(isStrongPassword('PASSWORD123')).toBe(false)
    expect(isStrongPassword('MYPASSWORD1')).toBe(false)
  })

  it('should reject passwords without numbers', () => {
    expect(isStrongPassword('Password')).toBe(false)
    expect(isStrongPassword('MyPassword')).toBe(false)
  })

  it('should handle edge cases', () => {
    expect(isStrongPassword('')).toBe(false)
    expect(isStrongPassword(' ')).toBe(false)
    expect(isStrongPassword(null as any)).toBe(false)
    expect(isStrongPassword(undefined as any)).toBe(false)
    expect(isStrongPassword(123456789 as any)).toBe(false)
  })

  it('should accept passwords with special characters', () => {
    expect(isStrongPassword('P@ssw0rd!')).toBe(true)
    expect(isStrongPassword('MyP@ss123#')).toBe(true)
  })

  it('should reject password with only some requirements', () => {
    expect(isStrongPassword('12345678')).toBe(false) // no letters
    expect(isStrongPassword('abcdefgh')).toBe(false) // no numbers, no uppercase
    expect(isStrongPassword('ABCDEFGH')).toBe(false) // no numbers, no lowercase
    expect(isStrongPassword('abcDEF')).toBe(false) // too short, no numbers
  })
})
