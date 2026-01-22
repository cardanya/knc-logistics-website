/**
 * Contact form API client
 */

export interface ContactFormData {
  service: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface ContactFormResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export interface ContactSubmissionOptions {
  data: ContactFormData;
  recaptchaToken: string;
}

/**
 * Submit a contact form
 */
export async function submitContactForm(
  options: ContactSubmissionOptions
): Promise<ContactFormResponse> {
  const { data, recaptchaToken } = options;

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        recaptchaToken,
      }),
    });

    const result: ContactFormResponse = await response.json();

    if (!response.ok) {
      throw new Error(result.error || `HTTP ${response.status}: Failed to submit`);
    }

    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to submit contact form. Please try again.');
  }
}
