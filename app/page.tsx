import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import PersonalInjuryCalculatorWrapper from '@/components/PersonalInjuryCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'
import AffiliateCTA from '@/components/AffiliateCTA'

export const metadata: Metadata = {
  title: 'Personal Injury Settlement Calculator 2026 — Estimate Your Claim Value',
  description:
    'Calculate your personal injury settlement using the industry-standard multiplier method. Free 2026 calculator with state fault rules, attorney fee deductions, and net payout estimate.',
  alternates: { canonical: 'https://settlementcalculators.app' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'How is a personal injury settlement calculated?',
    a: 'Personal injury settlements are calculated by adding all economic damages (medical bills, future medical costs, lost wages, property damage) — called special damages — then multiplying by a factor representing pain and suffering. This multiplier typically ranges from 1.5x for minor injuries to 10x for severe, permanent injuries like traumatic brain injuries or spinal cord damage. An alternative method called per diem calculates daily pain and suffering based on your salary divided by 365. Most personal injury attorneys use whichever method produces the higher number as a starting point in negotiations with the insurance adjuster.',
  },
  {
    q: 'How long does a personal injury case take to settle?',
    a: 'Most personal injury cases settle without going to trial. Simple cases with clear liability and minor to moderate injuries often settle in 3–9 months. Complex cases with disputed liability, severe injuries, or large damages may take 1–3 years. Cases that go to trial can take 3–5 years or more. The timeline depends on how long medical treatment takes (you should not settle before reaching maximum medical improvement), the insurance company\'s willingness to negotiate fairly, and court scheduling if litigation is necessary.',
  },
  {
    q: "Should I accept the insurance company's first offer?",
    a: "Almost certainly no. Insurance adjusters are trained to offer the minimum amount possible as quickly as possible, often before you know the full extent of your injuries. Accepting a low early offer means you can never come back for more — even if your condition worsens or requires additional surgery. Studies show accident victims who hire a personal injury attorney receive 3.5x more compensation on average than those who negotiate alone (Insurance Research Council 2024). Always consult a personal injury attorney before accepting any settlement from an insurance company.",
  },
  {
    q: 'How much does a personal injury attorney cost?',
    a: 'Personal injury attorneys work on contingency — you pay nothing upfront and nothing unless they win. The standard contingency fee is 33% of the settlement in pre-litigation cases (before a lawsuit is filed) and 40% if the case goes to litigation. The attorney advances all case costs (filing fees, expert witnesses, medical records) and deducts them from the settlement. This means anyone injured, regardless of financial situation, has access to experienced legal representation. Most attorneys offer free initial case evaluations with no obligation.',
  },
  {
    q: 'What is the average personal injury settlement amount?',
    a: 'The "average" personal injury settlement is misleading because values vary enormously by case type and injury severity. Minor soft tissue injuries typically settle for $10,000–$35,000. Moderate injuries requiring surgery often settle for $50,000–$200,000. Severe injuries (traumatic brain injury, spinal cord damage, permanent disability) can result in settlements of $500,000 to several million dollars. Your specific damages — medical bills, lost income, and pain and suffering — determine your case value far more than any national average.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Personal Injury Settlement Calculator 2026',
  url: 'https://settlementcalculators.app',
  description: 'Free 2026 personal injury settlement calculator using the multiplier method with state fault rules and attorney fee deductions.',
  applicationCategory: 'LegalApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your Personal Injury Settlement',
  step: [
    { '@type': 'HowToStep', name: 'Enter your economic damages', text: 'Enter your medical bills, future medical costs, lost wages, future lost wages, and property damage. These are your special damages — the foundation of your settlement calculation.' },
    { '@type': 'HowToStep', name: 'Select injury severity and case details', text: 'Choose injury severity (Minor, Moderate, or Severe) to set the pain and suffering multiplier. Enter your state to apply the correct comparative fault rule and your fault percentage if any.' },
    { '@type': 'HowToStep', name: 'View your estimated settlement range', text: 'Your estimated settlement range appears showing both the multiplier and per diem methods, gross settlement, attorney fees, medical lien estimate, and net payout after all deductions.' },
  ],
}

const trustSignals = ['⚖️ 2026 Updated', '🔒 Private', '⚡ Instant', '✓ Free']

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema).replace(/</g, '\\u003c') }} />

      <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/herobgsc.webp')" }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 pb-10">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
              Personal Injury Settlement Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Estimate your personal injury settlement using the multiplier method. Includes state fault rules, attorney fees, medical liens, and net payout. Free for all 50 states.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 mb-4">
            <AdBanner slot="1111111111" />
          </div>

          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <PersonalInjuryCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4">
            <AdBanner slot="2222222222" />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-10">
            {[
              { icon: '🔒', label: 'Private', sub: 'Calculations stay in your browser' },
              { icon: '⚡', label: 'Instant', sub: 'Results update as you type' },
              { icon: '⚖️', label: '2026 Updated', sub: 'All 50 state fault rules' },
              { icon: '✓', label: 'Free', sub: 'No signup, no limits' },
            ].map(t => (
              <div key={t.label} className="flex flex-col items-center rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1e293b] p-4 text-center shadow-sm">
                <span className="text-2xl mb-1">{t.icon}</span>
                <span className="text-sm font-semibold text-gray-800 dark:text-[#e2e8f0]">{t.label}</span>
                <span className="text-xs text-gray-400 mt-0.5">{t.sub}</span>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 px-6 py-5 mb-10">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Legal Disclaimer</p>
            <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed">
              These calculators provide estimates for educational purposes only. Settlement values depend on specific facts, jurisdiction, insurance limits, and negotiation. Results are not legal advice and do not create an attorney-client relationship. Consult a licensed attorney in your state for an accurate case evaluation. This site may connect you with licensed attorneys. We may receive compensation.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How Personal Injury Settlements Are Calculated</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Personal injury settlements are calculated using two primary methods: the multiplier method and the per diem method. Both are used by personal injury attorneys and insurance adjusters throughout the negotiation process for damages like medical bills, lost wages, and pain and suffering.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The multiplier method starts with your special damages (economic damages): medical bills to date, estimated future medical costs, lost wages, estimated future lost wages, and property damage. These are the concrete, documentable financial losses from your injury. The total is then multiplied by a factor reflecting the severity of your pain and suffering — typically 1.5x to 3x for minor soft tissue injuries like whiplash and sprains, 3x to 5x for moderate injuries requiring surgery, and 5x to 10x for severe injuries like traumatic brain injury or permanent disability.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The per diem method calculates your daily suffering rate — typically your daily wage — then multiplies by the total number of days you suffered. Your personal injury attorney uses whichever method produces a higher figure as a starting point in negotiations with the insurance adjuster.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The gross settlement is then reduced by attorney fees (33% contingency pre-litigation, 40% in litigation) and medical liens (amounts owed back to health insurers, typically negotiated down to 30% of original bills). Your state&apos;s comparative fault rule then adjusts the net figure based on your percentage of fault. Pure comparative fault states allow full recovery regardless of fault percentage; modified comparative fault states bar recovery above 50% or 51% fault; and contributory negligence states (Alabama, Maryland, North Carolina, Virginia) bar all recovery with any plaintiff fault.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: Personal Injury Settlement</h2>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Maria was rear-ended at a stoplight in Texas. Her medical bills totaled $18,000, she missed 6 weeks of work ($7,200 lost wages), and her injury was moderate (surgery required). She earns $52,000/year and had a 12-week recovery. The other driver was 100% at fault.
              </p>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4 font-mono bg-white/60 dark:bg-black/20 rounded-xl px-4 py-3">
                <div>Special damages (economic): $18,000 + $7,200 = $25,200</div>
                <div>Multiplier method (3x–5x for moderate): $75,600 – $126,000</div>
                <div>Gross settlement estimate: $100,800 – $151,200</div>
                <div>Attorney fees (33% contingency): −$33,264 – −$49,896</div>
                <div>Medical lien estimate (30% of bills): −$5,400</div>
                <div className="font-bold pt-1">NET TO MARIA: ~$62,136 – $95,904</div>
                <div className="pt-2 text-gray-500">Per diem: $52,000 ÷ 365 × 84 days = $11,967 → $37,167 gross</div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Texas uses modified comparative fault (51% bar). Since Maria was 0% at fault, no fault reduction applies. Her personal injury attorney would negotiate based on the multiplier method as it significantly exceeds the per diem method. This case would likely settle in the $60,000–$95,000 net range after attorney fees.
              </p>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors That Affect Settlement Value</h2>
            <ul className="space-y-5">
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Liability and negligence clarity</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">When the defendant&apos;s negligence is clear and well-documented — a rear-end collision with a police report, surveillance footage of a slip and fall, a dog bite with witnesses — settlement values increase significantly because the insurance adjuster faces higher trial risk. Disputed liability cases often settle for less. Your state&apos;s comparative fault standard determines how your own percentage of fault affects your net recovery.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Injury severity and medical documentation</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Objective medical evidence — MRI findings, surgical records, orthopedic evaluations, documented permanent impairment — dramatically increases settlement value versus subjective soft tissue complaints. Gaps in medical treatment are used by insurance adjusters to minimize your pain and suffering claim. Consistent documentation from the injury date through maximum medical improvement is essential. Never settle before you know your full diagnosis and prognosis.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Insurance coverage and policy limits</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Your practical recovery is limited by available insurance coverage. If the negligent party carries only state minimum liability limits ($25,000/$50,000 is common), your recovery may be capped far below your actual damages. Your own uninsured/underinsured motorist (UM/UIM) coverage, umbrella policies, employer policies for work-related accidents, and multiple defendant theories are additional coverage sources worth investigating with a personal injury attorney.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Attorney representation</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Insurance Research Council data shows that accident victims with attorney representation receive 3.5x more in net compensation — even after paying contingency fees — compared to unrepresented claimants. Insurance adjusters have teams of litigation specialists, medical reviewers, and settlement algorithms calibrated to minimize payouts. A personal injury attorney with local knowledge of courts, judges, and insurers negotiates from a position of strength and knows the true value of your case.</p>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <AffiliateCTA headline="Want to Know What Your Case Is Actually Worth?" />
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <div className="pb-6">
            <AdBanner slot="3333333333" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
