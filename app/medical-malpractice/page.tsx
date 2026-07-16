import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import MedicalMalpracticeCalculatorWrapper from '@/components/MedicalMalpracticeCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'
import AffiliateCTA from '@/components/AffiliateCTA'

export const metadata: Metadata = {
  title: 'Medical Malpractice Settlement Calculator 2026',
  description: 'Estimate your medical malpractice settlement with state damage caps. Free calculator for surgical errors, misdiagnosis, medication errors and birth injuries. All 50 states.',
  alternates: { canonical: 'https://settlementcalculators.app/medical-malpractice' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  { q: 'How much are medical malpractice settlements worth?', a: 'Medical malpractice settlements vary enormously based on injury severity, state damage caps, and case complexity. The average paid malpractice claim nationally is approximately $350,000–$500,000, but this includes many smaller cases. Severe permanent injuries — birth injuries causing lifelong disability, surgical errors causing paralysis, misdiagnosis resulting in advanced cancer — can settle for $1–10 million or more. Many states cap non-economic damages (pain and suffering) in malpractice cases at $250,000–$750,000, which limits total recovery. Economic damages (medical bills, lost wages) are never capped.' },
  { q: 'What do I need to prove medical malpractice?', a: 'Medical malpractice requires proving four elements: (1) duty — a doctor-patient relationship existed; (2) breach — the healthcare provider deviated from the accepted standard of care for their specialty; (3) causation — that deviation caused your injury; and (4) damages — you suffered actual harm. The standard of care is what a reasonably competent medical professional in the same specialty would have done under similar circumstances. Expert witnesses (other physicians) are required in virtually all malpractice cases to establish the standard of care and the breach. This requirement, combined with expert costs and case complexity, makes malpractice cases expensive to pursue.' },
  { q: 'Does my state have a cap on malpractice damages?', a: 'Many states cap non-economic damages (pain and suffering, emotional distress) in medical malpractice cases. Common cap amounts include $250,000 (Idaho, Montana), $350,000 (California, Nevada), $500,000 (Louisiana, Massachusetts, Mississippi), and $750,000 (Tennessee, Texas per defendant). Some states have total caps combining economic and non-economic damages. States without caps include New York, New Jersey, Florida, Illinois, Oregon, and others. Our calculator shows your state\'s cap when you select your state, and adjusts your non-economic damage estimate accordingly.' },
  { q: 'How long do I have to file a malpractice claim?', a: 'Medical malpractice statutes of limitations are often shorter than general personal injury limitations and frequently require pre-suit notice. Most states allow 2–3 years from the date of malpractice, but many use a discovery rule — the clock starts when you knew or should have known of the malpractice. Some states impose an absolute 4–7 year statute of repose that bars claims regardless of when the malpractice was discovered. Birth injury cases may allow claims until the child reaches adulthood plus the regular limitations period. Always consult a malpractice attorney immediately as these deadlines are strictly enforced.' },
  { q: 'How do I find a medical malpractice attorney?', a: 'Medical malpractice is a highly specialized area requiring attorneys with medical knowledge, expert witness networks, and the financial resources to advance $50,000–$250,000 in case costs. Look for attorneys who specialize exclusively in medical malpractice (not general personal injury), have a track record of malpractice verdicts and settlements, and work on contingency. Many reputable malpractice attorneys decline cases where liability or causation is questionable because of the high cost to litigate. Our free case review service can connect you with a licensed medical malpractice attorney for a no-obligation evaluation.' },
]

const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const webAppSchema = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Medical Malpractice Settlement Calculator 2026', url: 'https://settlementcalculators.app/medical-malpractice', applicationCategory: 'LegalApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }
const trustSignals = ['⚖️ 2026 Updated', '🔒 Private', '⚡ Instant', '✓ Free']

export default function MedicalMalpracticePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema).replace(/</g, '\\u003c') }} />
      <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/herobgsc.webp')" }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 pb-10">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">Medical Malpractice Settlement Calculator 2026</h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">Estimate your medical malpractice settlement with state-specific damage caps. Covers surgical errors, misdiagnosis, medication errors, birth injuries, and anesthesia errors.</p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">{trustSignals.map(t => <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>)}</div>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="1111111111" /></div>
          <div className="max-w-5xl mx-auto px-4"><div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden"><MedicalMalpracticeCalculatorWrapper /></div></div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>
      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222222" /></div>
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How Medical Malpractice Settlements Work</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">Medical malpractice occurs when a healthcare provider deviates from the accepted standard of care and that deviation causes patient injury. Cases must be supported by expert physician testimony establishing both the standard of care and the breach — this makes malpractice cases among the most expensive and complex to litigate, often requiring $50,000–$250,000 in expert and litigation costs that are advanced by the attorney and recovered from the settlement.</p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">Many states cap non-economic damages (pain and suffering, emotional distress) in medical malpractice cases to control healthcare costs and insurance premiums. These caps do not limit economic damages — your medical bills, lost wages, and future care costs are fully recoverable regardless of caps. The calculator applies your state&apos;s cap when you select your state.</p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Birth injury cases involving permanent disability are among the highest-value malpractice cases, often settling for $2–10 million because of the lifetime of medical care, lost earning capacity, and pain and suffering involved. These cases typically require pediatric neurologists, life care planners, and economists as expert witnesses.</p>
          </div>
          <div className="mb-6"><AffiliateCTA headline="Get a Free Medical Malpractice Case Review" /></div>
          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333333" /></div>
        </div>
      </section>
      <Footer />
    </>
  )
}
