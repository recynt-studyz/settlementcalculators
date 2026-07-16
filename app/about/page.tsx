import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'About — Settlement Calculators',
  description: 'Learn about Settlement Calculators — free legal settlement estimation tools for personal injury, car accidents, workers comp, slip and fall, and more.',
  alternates: { canonical: 'https://settlementcalculators.app/about' },
  robots: { index: true, follow: true },
}

export default function AboutPage() {
  return (
    <>
      <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/herobgsc.webp')" }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 pb-10">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
              About Settlement Calculators
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Free legal settlement estimation tools for injury victims and anyone navigating the legal system.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What We Do</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              Settlement Calculators provides free, browser-based tools that help injury victims, employees, and anyone involved in legal disputes estimate the value of their claims. Our calculators cover personal injury, car accidents, slip and fall, workers compensation, medical malpractice, dog bites, wrongful termination, divorce settlements, and debt settlement.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How Our Calculators Work</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Our calculators use industry-standard methodologies used by personal injury attorneys and insurance adjusters:
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-6 list-disc pl-5">
              <li>The <strong>multiplier method</strong>: special damages × a factor (1.5x–10x) reflecting injury severity</li>
              <li>The <strong>per diem method</strong>: daily suffering rate × days of suffering</li>
              <li>State-specific <strong>comparative fault rules</strong>: pure comparative, modified 50%, modified 51%, and contributory negligence</li>
              <li>State-specific <strong>workers comp rates</strong>: 66.7% of AWW capped at each state&apos;s 2026 maximum</li>
              <li>Federal <strong>wrongful termination damage caps</strong> by employer size</li>
              <li>State-specific <strong>community property vs. equitable distribution</strong> rules for divorce</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Privacy</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              All calculations happen entirely in your browser. We do not transmit, store, or have any access to the financial or legal information you enter. Your data stays on your device using browser localStorage only. See our <a href="/privacy" className="text-[#1e293b] dark:text-blue-400 underline">Privacy Policy</a> for full details.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Legal Disclaimer</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              Settlement Calculators provides estimates for educational and informational purposes only. Our calculators do not provide legal advice, and no attorney-client relationship is created by using this site. Settlement values depend on specific facts, jurisdiction, applicable insurance limits, evidence quality, and negotiation — factors our calculators cannot fully account for. Always consult a licensed attorney in your state for an accurate evaluation of your specific legal claim. This site may connect you with licensed attorneys and may receive compensation for referrals.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Questions or feedback? Use the contact link in the footer below.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
