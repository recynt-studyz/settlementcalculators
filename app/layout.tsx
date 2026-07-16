import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Settlement Calculators 2026 — Free Legal Settlement Estimates',
  description:
    'Free settlement calculators for injury, car accidents, workers comp, slip & fall, malpractice, wrongful termination, divorce, and debt. All 50 states. 2026.',
  keywords: [
    'personal injury settlement calculator',
    'car accident settlement calculator',
    'workers comp calculator',
    'slip and fall settlement calculator',
    'medical malpractice settlement calculator',
    'wrongful termination settlement calculator',
    'divorce settlement calculator',
    'debt settlement calculator',
    'settlement calculator 2026',
    'how much is my case worth',
  ],
  metadataBase: new URL('https://settlementcalculators.app'),
  alternates: { canonical: 'https://settlementcalculators.app' },
  openGraph: {
    title: 'Settlement Calculators 2026 — Free Legal Settlement Estimates',
    description:
      'Free settlement calculators for personal injury, car accidents, workers comp, medical malpractice, wrongful termination, divorce and debt. All 50 states.',
    url: 'https://settlementcalculators.app',
    siteName: 'settlementcalculators.app',
    type: 'website',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Free Settlement Calculators 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Settlement Calculators 2026 — Free Legal Settlement Estimates',
    description: 'Free settlement calculators for personal injury, car accidents, workers comp, divorce and debt. All 50 states.',
    images: ['/twitter-image.png'],
  },
  robots: { index: true, follow: true },
  verification: { google: 'PLACEHOLDER_GOOGLE_SITE_VERIFICATION' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <meta name="google-adsense-account" content="ca-pub-5035661017594256" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem('sc-theme')==='dark'){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8VRRYXTWNS"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8VRRYXTWNS');
          `}
        </Script>
      </head>
      <body
        className="min-h-full flex flex-col bg-white dark:bg-[#0f172a] text-gray-900 dark:text-[#e2e8f0]"
        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
      >
        {children}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5035661017594256"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
