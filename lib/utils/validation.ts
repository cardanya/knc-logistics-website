/**
 * Shared validation utilities for client and server
 *
 * @packageDocumentation
 */

/**
 * Email validation regex
 * Validates: standard email format (user@domain.tld)
 * Rejects: missing @, multiple @, no TLD
 */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Phone number validation regex
 * Allows: digits, spaces, hyphens, parentheses, plus sign
 * Requires: 10-20 total characters
 */
export const PHONE_REGEX = /^[\d\s\-\+\(\)]{10,20}$/;

/**
 * Validates email address format
 *
 * @param email - Email address to validate
 * @returns true if valid email format
 *
 * @example
 * ```typescript
 * validateEmail('user@example.com')  // true
 * validateEmail('invalid')           // false
 * ```
 */
export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  return EMAIL_REGEX.test(email.trim());
}

/**
 * Validates phone number format and digit count
 *
 * @param phone - Phone number to validate
 * @returns true if valid phone format with at least 10 digits
 *
 * @example
 * ```typescript
 * validatePhone('+1 (555) 123-4567')  // true
 * validatePhone('555-1234')           // false (< 10 digits)
 * validatePhone('+++---')             // false (no digits)
 * ```
 */
export function validatePhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') return false;

  const trimmed = phone.trim();

  // Check format
  if (!PHONE_REGEX.test(trimmed)) return false;

  // Count actual digits (minimum 10 required)
  const digitCount = (trimmed.match(/\d/g) || []).length;
  return digitCount >= 10;
}

/**
 * Validates contact form data
 *
 * @param data - Form data to validate
 * @returns Object with isValid flag and error messages
 */
export function validateContactForm(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  // Name validation
  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  // Email validation
  if (!validateEmail(data.email)) {
    errors.email = 'Invalid email format';
  }

  // Phone validation
  if (!validatePhone(data.phone)) {
    errors.phone = 'Invalid phone number (minimum 10 digits required)';
  }

  // Message validation
  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
