'use client'

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { ReactNode } from 'react'

interface ReCaptchaProviderProps {
  children: ReactNode
}

export default function ReCaptchaProvider({ children }: ReCaptchaProviderProps) {
  const reCaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

  // If no reCAPTCHA key, render children without provider
  if (!reCaptchaKey) {
    return <>{children}</>
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={reCaptchaKey}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: 'head',
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  )
}
