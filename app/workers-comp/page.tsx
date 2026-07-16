import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import WorkersCompCalculatorWrapper from '@/components/WorkersCompCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'
import AffiliateCTA from '@/components/AffiliateCTA'

export const metadata: Metadata = {
  title: 'Workers Compensation Calculator 2026 — All 50 States',
  description: 'Calculate your workers comp benefits for all 50 states. Free 2026 workers compensation calculator with state maximum weekly benefits and permanent disability estimates.',
  alternates: { canonical: 'https://settlementcalculators.app/workers-comp' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  { q: 'How much does workers comp pay?', a: 'Workers compensation pays 66.7% (two-thirds) of your average weekly wage (AWW), up to your state\'s maximum weekly benefit. State maximums range from $567/week (Mississippi) to over $2,000/week (Iowa, Massachusetts). Benefits are generally not taxable as income. For permanent disability, you receive additional compensation based on your impairment rating multiplied by your weekly benefit and a state-specific number of weeks. Medical benefits cover all reasonable and necessary medical treatment related to your work injury, with no out-of-pocket cost to you.' },
  { q: 'Can I sue my employer instead of filing workers comp?', a: 'Generally no — workers compensation is an exclusive remedy, meaning you give up the right to sue your employer in exchange for guaranteed no-fault benefits. However, important exceptions exist: you can sue third parties (equipment manufacturers, contractors, property owners) whose negligence contributed to your injury; you may sue if your employer intentionally harmed you; and if your employer is illegally uninsured, they typically lose the exclusive remedy protection and can be sued directly. A workers comp attorney can evaluate whether any third-party or exception claims apply to your situation.' },
  { q: 'What injuries are covered by workers compensation?', a: 'Workers compensation covers any injury that arises out of and in the course of employment. This includes sudden traumatic accidents (falls, machinery injuries, vehicle accidents), repetitive stress injuries (carpal tunnel from repetitive motions, back strain from repeated lifting), occupational diseases caused by workplace exposure (asbestosis, hearing loss, chemical exposure), and in many states, mental/emotional injuries related to workplace trauma or stress. The injury does not need to be caused by employer negligence — workers comp is no-fault coverage.' },
  { q: 'How long can I receive workers comp benefits?', a: 'Temporary total disability (TTD) benefits continue until you return to work or reach maximum medical improvement (MMI). The maximum duration varies by state — typically 104–500 weeks. Once you reach MMI, a physician assigns a permanent impairment rating. Permanent partial disability (PPD) benefits are paid as a lump sum or structured payments based on your rating. Permanent total disability (PTD) benefits may continue for life. Medical benefits for your work injury generally continue as long as the treatment is reasonable and necessary, regardless of time limits.' },
  { q: 'Can my employer fire me for filing a workers comp claim?', a: 'No — retaliation for filing a workers compensation claim is illegal in all 50 states. Prohibited retaliation includes firing, demotion, reduced hours, shift changes, and other adverse actions taken because of your claim. If your employer retaliates, you may have both a workers comp retaliation claim and a wrongful termination claim with additional remedies beyond workers comp benefits. Document all adverse employment actions and their timing relative to your injury and claim filing. Contact a workers comp attorney immediately if you believe you are being retaliated against.' },
]

const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const webAppSchema = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Workers Compensation Calculator 2026', url: 'https://settlementcalculators.app/workers-comp', applicationCategory: 'LegalApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }
const trustSignals = ['⚖️ 2026 Updated', '🔒 Private', '⚡ Instant', '✓ Free']

export default function WorkersCompPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema).replace(/</g, '\\u003c') }} />
      <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/herobgsc.webp')" }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 pb-10">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">Workers Compensation Calculator 2026 — All 50 States</h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">Calculate your workers comp weekly benefit, temporary disability total, and permanent disability award. State maximum weekly benefits hardcoded for all 50 states.</p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">{trustSignals.map(t => <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>)}</div>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="1111111111" /></div>
          <div className="max-w-5xl mx-auto px-4"><div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden"><WorkersCompCalculatorWrapper /></div></div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>
      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222222" /></div>
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How Workers Compensation Is Calculated</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">Workers compensation is a no-fault insurance system. You receive benefits regardless of whether your employer or you caused the accident. Your employer is legally required to carry workers comp insurance, and filing a claim cannot be used against you.</p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">Your weekly benefit equals 66.7% of your average weekly wage (AWW) for the 52 weeks before your injury, capped at your state&apos;s maximum. Benefits are generally tax-free, meaning your effective replacement rate is higher than 66.7%. Once you reach Maximum Medical Improvement (MMI), a physician assigns a permanent impairment rating that determines your permanent disability award.</p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Medical benefits cover all reasonable and necessary treatment related to your work injury — doctor visits, surgery, physical therapy, prescription medications, medical equipment — at no cost to you. Unlike health insurance, workers comp has no deductibles or copays for covered work injury treatment.</p>
          </div>
          <div className="mb-6"><AffiliateCTA headline="Questions About Your Workers Comp Claim?" /></div>
          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333333" /></div>
        </div>
      </section>
      <Footer />
    </>
  )
}
