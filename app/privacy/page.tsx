import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy — Settlement Calculators',
  description: 'Privacy Policy for Settlement Calculators. All calculations are performed in your browser. We do not collect or store your financial or legal data.',
  alternates: { canonical: 'https://settlementcalculators.app/privacy' },
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <>
      <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/herobgsc.webp')" }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 pb-10">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
              Privacy Policy
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Last updated: January 1, 2026
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">1. Information We Collect</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              <strong>Calculator inputs:</strong> All financial and legal information you enter into our calculators (medical bills, income, damages, etc.) is processed entirely within your browser using JavaScript. This information is never transmitted to our servers. We have no access to it. Your inputs may be saved to your browser&apos;s localStorage so you can return to your calculation — this data remains on your device only.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              <strong>Usage data:</strong> We use Google Analytics (GA4) to collect anonymized usage statistics including pages visited, time on site, device type, and geographic region (country/state level). This data does not include any personally identifiable information and is used to improve our calculators.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>Advertising:</strong> We display ads through Google AdSense. Google may use cookies to serve ads based on your prior visits to our site or other sites. You can opt out of personalized advertising by visiting Google&apos;s Ad Settings.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">2. Cookies</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We use the following types of cookies and local storage: (a) <strong>Functional</strong> — localStorage saves your calculator inputs and dark/light mode preference locally on your device; (b) <strong>Analytics</strong> — Google Analytics cookies collect anonymized usage data; (c) <strong>Advertising</strong> — Google AdSense cookies for ad personalization (you can opt out via Google Ad Settings). We do not use tracking cookies for marketing or sell your data to third parties.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">3. Attorney Referrals</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              This site contains links to attorney review services. When you click an attorney referral link and submit your information to a third party, that third party&apos;s privacy policy governs the collection and use of your information — not ours. We may receive compensation when you connect with an attorney through our site. We do not share your calculator inputs with attorney referral partners.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">4. Children&apos;s Privacy</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              This site is not directed at children under 13. We do not knowingly collect information from children under 13. If you believe a child under 13 has provided information through this site, please contact us.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">5. Data Security</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Because calculator inputs are never transmitted to our servers, the primary security consideration is your own device and browser security. We serve this site over HTTPS to protect any data in transit. We do not maintain databases of user-provided financial or legal information.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">6. Your Rights</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              You can clear your calculator inputs at any time by clearing your browser&apos;s localStorage (browser settings → clear site data). You can opt out of Google Analytics using the Google Analytics Opt-out Browser Add-on. California residents have rights under the CCPA. EU/UK residents have rights under GDPR. Contact us with any privacy rights requests.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">7. Changes to This Policy</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date at the top indicates when the most recent changes were made. Continued use of the site after changes constitutes acceptance of the updated policy.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">8. Contact</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              For privacy questions or requests, use the contact link in the footer below.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
