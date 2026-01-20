/**
 * Format phone number to US format: (XXX) XXX-XXXX
 */
export function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '')

  // Check if we have 10 digits
  if (cleaned.length !== 10) {
    throw new Error('Phone number must have exactly 10 digits')
  }

  // Format as (XXX) XXX-XXXX
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`
  }

  throw new Error('Invalid phone number format')
}

/**
 * Format currency to USD format
 */
export function formatCurrency(amount: number): string {
  if (typeof amount !== 'number' || isNaN(amount)) {
    throw new Error('Amount must be a valid number')
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}
