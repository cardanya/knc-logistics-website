/**
 * Apply form API client
 */

export interface ApplyFormData {
  name: string;
  email: string;
  phone: string;
  cdlType: string;
  experience: number;
  message?: string;
}

export interface ApplyFormResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export interface ApplySubmissionOptions {
  data: ApplyFormData;
  recaptchaToken: string;
}

/**
 * Submit an application form
 */
export async function submitApplyForm(
  options: ApplySubmissionOptions
): Promise<ApplyFormResponse> {
  const { data, recaptchaToken } = options;

  try {
    const response = await fetch('/api/apply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        recaptchaToken,
      }),
    });

    const result: ApplyFormResponse = await response.json();

    if (!response.ok) {
      throw new Error(result.error || `HTTP ${response.status}: Failed to submit`);
    }

    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to submit application. Please try again.');
  }
}
