import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import PersonalInjuryCalculatorWrapper from '@/components/PersonalInjuryCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'
import AffiliateCTA from '@/components/AffiliateCTA'
import { STATES } from '@/lib/settlementData'

const trustSignals = ['⚖️ 2026 Updated', '🔒 Private', '⚡ Instant', '✓ Free']

export function generateStatePersonalInjuryMetadata(stateAbbr: string): Metadata {
  const s = STATES[stateAbbr]
  if (!s) return {}
  return {
    title: `${s.name} Personal Injury Settlement Calculator 2026`,
    description: `Calculate your ${s.name} personal injury settlement. ${s.name} uses ${s.faultRule === 'pure_comparative' ? 'pure comparative fault — you can recover even if partially at fault' : s.faultRule === 'contributory' ? 'contributory negligence — any fault bars recovery' : 'modified comparative fault'}. Free 2026 calculator with ${s.name}-specific laws and limits.`,
    alternates: { canonical: `https://settlementcalculators.app/${s.name.toLowerCase().replace(/\s+/g, '-')}-personal-injury-settlement` },
    robots: { index: true, follow: true },
  }
}

export default function StatePersonalInjuryPage({ stateAbbr }: { stateAbbr: string }) {
  const s = STATES[stateAbbr]
  if (!s) return null

  const faqs: FaqItem[] = [
    {
      q: `What is the statute of limitations for personal injury in ${s.name}?`,
      a: `In ${s.name}, you generally have ${s.solYears} year${s.solYears !== 1 ? 's' : ''} from the date of injury to file a personal injury lawsuit. Missing this deadline typically bars your claim entirely, regardless of how strong your case is. Some exceptions exist for minors, cases involving government entities (which may have shorter notice requirements), and injuries discovered later (the discovery rule). Consult a ${s.name} personal injury attorney as soon as possible after your injury to protect your rights.`,
    },
    {
      q: `Does ${s.name} use comparative fault?`,
      a: `${s.name} uses ${s.faultRuleLabel}. ${s.faultRule === 'pure_comparative' ? `Under pure comparative fault, you can recover damages even if you were primarily at fault for the accident. Your recovery is simply reduced by your percentage of fault. For example, if you were 40% at fault and your damages are $100,000, you can still recover $60,000.` : s.faultRule === 'contributory' ? `Under contributory negligence, if you are found even 1% at fault for the accident, you may be completely barred from recovering any damages. This is one of the strictest fault standards in the country. An experienced ${s.name} personal injury attorney can help you build a case that minimizes any finding of contributory negligence.` : `Under modified comparative fault, you can recover damages as long as your fault does not reach or exceed ${s.faultRule === 'modified_50' ? '50%' : '51%'}. Your recovery is reduced by your percentage of fault. For example, if you were 30% at fault and your damages are $100,000, you can recover $70,000.`}`,
    },
    {
      q: `What is the average personal injury settlement in ${s.name}?`,
      a: `Personal injury settlements in ${s.name} typically range from ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(s.avgPIRange[0])} to ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(s.avgPIRange[1])} for moderate injury cases, though values vary enormously based on injury severity, liability clarity, insurance coverage, and the skill of your personal injury attorney. Severe injuries involving permanent disability, traumatic brain injury, or spinal cord damage can result in settlements of $500,000 to several million dollars. Use our calculator above to estimate your specific case value based on your actual damages.`,
    },
    {
      q: `Are there damage caps in ${s.name}?`,
      a: `${s.medMalCap ? `${s.name} caps non-economic damages (pain and suffering) in medical malpractice cases at ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(s.medMalCap)}. However, for general personal injury cases — car accidents, slip and falls, dog bites — ${s.name} does not cap damages. Economic damages (medical bills, lost wages) are always fully recoverable, and non-economic damages (pain and suffering) in non-malpractice cases are not limited.` : `${s.name} generally does not cap damages in personal injury cases. Both economic damages (medical bills, lost wages, future care costs) and non-economic damages (pain and suffering, emotional distress, loss of enjoyment of life) are fully recoverable up to what a jury awards. This makes ${s.name} relatively plaintiff-friendly for personal injury cases.`}`,
    },
    {
      q: `How do I find a personal injury attorney in ${s.name}?`,
      a: `When looking for a personal injury attorney in ${s.name}, seek one who specializes specifically in personal injury law (not a general practice attorney), has experience with cases similar to yours, and works on contingency — meaning you pay nothing unless they win. Most reputable personal injury attorneys offer free case evaluations. Look for an attorney licensed to practice in ${s.name} who has local knowledge of ${s.name} courts, judges, and insurance companies. Our free case review service above can connect you with a licensed ${s.name} personal injury attorney for a no-obligation consultation.`,
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
    name: `${s.name} Personal Injury Settlement Calculator 2026`,
    url: `https://settlementcalculators.app/${s.name.toLowerCase().replace(/\s+/g, '-')}-personal-injury-settlement`,
    applicationCategory: 'LegalApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  }

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Calculate Your ${s.name} Personal Injury Settlement`,
    step: [
      { '@type': 'HowToStep', name: 'Enter your damages', text: `Enter your medical bills, future medical costs, lost wages, and property damage. ${s.name} is pre-selected as your state.` },
      { '@type': 'HowToStep', name: 'Select injury severity and case details', text: `Choose your injury severity (minor, moderate, or severe) and enter your fault percentage. ${s.name} uses ${s.faultRuleLabel}.` },
      { '@type': 'HowToStep', name: 'View your estimated settlement range', text: `See your estimated ${s.name} personal injury settlement range, including multiplier method and per diem calculations, attorney fees, and net payout.` },
    ],
  }

  const fmt = (v: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

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
              {s.name} Personal Injury Settlement Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Estimate your {s.name} personal injury settlement value. {s.name} uses {s.faultRuleLabel.split('—')[0].trim()}.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="1111111111" /></div>
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <PersonalInjuryCalculatorWrapper defaultState={stateAbbr} />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222222" /></div>

          <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-200 mb-2">{s.name} Personal Injury Law Overview</h2>
            <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed">
              {s.name} uses {s.faultRuleLabel}. You have {s.solYears} year{s.solYears !== 1 ? 's' : ''} from the date of injury to file a personal injury lawsuit in {s.name}. Personal injury settlements typically range from {fmt(s.avgPIRange[0])} to {fmt(s.avgPIRange[1])} for moderate cases in {s.name}.
              {s.medMalCap ? ` ${s.name} caps non-economic damages in medical malpractice cases at ${fmt(s.medMalCap)}, but general personal injury cases have no damage cap.` : ` ${s.name} has no cap on personal injury damages.`}
            </p>
          </div>

          <div className="mb-4 text-center">
            <a href="/" className="text-sm text-[#1e293b] dark:text-slate-400 hover:underline">
              ← Back to Personal Injury Settlement Calculator
            </a>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How {s.name} Personal Injury Settlements Are Calculated</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Personal injury settlements in {s.name} are calculated using the same fundamental method used nationwide: add up all economic damages (medical bills, future medical costs, lost wages, property damage), then multiply by a factor reflecting pain and suffering severity — typically 1.5x to 10x depending on injury severity. This is called the multiplier method, and it is the standard approach used by insurance adjusters and personal injury attorneys throughout {s.name}.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {s.name}&apos;s {s.faultRuleLabel} directly affects your settlement value. {s.faultRule === 'pure_comparative' ? `Under ${s.name}&apos;s pure comparative fault rule, your settlement is reduced proportionally by your percentage of fault, but you can still recover damages even if you were 99% at fault. For example, if your damages total $100,000 and you were 30% at fault, you recover $70,000.` : s.faultRule === 'contributory' ? `Under ${s.name}&apos;s contributory negligence standard, if you are found even 1% responsible for the accident, you may be completely barred from recovering any damages. This makes it critical to work with an experienced ${s.name} personal injury attorney who can minimize any finding of contributory fault.` : `Under ${s.name}&apos;s modified comparative fault rule, your settlement is reduced by your percentage of fault, and you are completely barred from recovery if you are ${s.faultRule === 'modified_50' ? '50% or more' : '51% or more'} at fault.`}
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The statute of limitations for personal injury in {s.name} is {s.solYears} year{s.solYears !== 1 ? 's' : ''} from the date of injury. Government entities may require formal notice within 60–180 days of the incident. Do not delay in consulting a licensed {s.name} personal injury attorney — missing these deadlines permanently bars your claim.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: {s.name} Personal Injury Settlement</h2>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Alex was injured in a rear-end collision in {s.name}. Medical bills totaled $22,000, they missed 8 weeks of work ($6,400 lost wages), and the injury was moderate (required physical therapy and a minor surgical procedure). The at-fault driver was 100% responsible.
              </p>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4 font-mono bg-white/60 dark:bg-black/20 rounded-xl px-4 py-3">
                <div>Special damages: $22,000 + $6,400 = $28,400</div>
                <div>Pain & suffering (3x–5x multiplier): $85,200 – $142,000</div>
                <div>Gross settlement estimate: $113,600 – $170,400</div>
                <div>Attorney fees (33%): −$37,488 – −$56,232</div>
                <div>Medical lien (reduced 30%): −$6,600</div>
                <div className="font-bold pt-1">NET TO ALEX: ~$69,512 – $107,568</div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {s.faultRule !== 'contributory' ? `Since Alex was 0% at fault, ${s.name}&apos;s comparative fault rule does not reduce the settlement. If Alex had been found 20% at fault, the net recovery would reduce to approximately $55,610–$86,054.` : `Since Alex was 0% at fault, ${s.name}&apos;s contributory negligence rule does not affect the settlement. It is critical that Alex can demonstrate no contributory fault, as even 1% fault would bar all recovery under ${s.name} law.`}
              </p>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors That Affect Your {s.name} Settlement</h2>
            <ul className="space-y-5">
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">{s.name}&apos;s Fault Rule ({s.faultRuleLabel.split('—')[0].trim()})</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{s.name}&apos;s {s.faultRuleLabel} means {s.faultRule === 'pure_comparative' ? 'your settlement is reduced by your fault percentage, but you always have a right to recover something.' : s.faultRule === 'contributory' ? 'any fault at all on your part may completely eliminate your right to compensation. Defense attorneys in contributory negligence states aggressively argue plaintiff fault to bar all recovery.' : `if you are ${s.faultRule === 'modified_50' ? '50%' : '51%'} or more at fault, you cannot recover at all. Insurance adjusters in ${s.name} often try to inflate your percentage of fault to reach this threshold.`} Your personal injury attorney&apos;s ability to establish clear liability and minimize your assigned fault percentage directly determines your settlement value.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Statute of Limitations: {s.solYears} Year{s.solYears !== 1 ? 's' : ''} in {s.name}</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">You have {s.solYears} year{s.solYears !== 1 ? 's' : ''} from the date of injury to file a personal injury lawsuit in {s.name}. Claims against government entities may require formal notice within 60–180 days. Missing these deadlines permanently bars your claim. The statute of limitations clock typically starts on the date of injury, though the discovery rule may delay the clock in cases where injuries were not immediately apparent.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Insurance Coverage Available</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Your settlement is practically limited by available insurance coverage. If the at-fault party carries only minimum liability limits, your recovery may be capped at those limits regardless of your actual damages. Uninsured/underinsured motorist coverage from your own policy can bridge this gap in motor vehicle cases. For premises liability and other claims, the defendant&apos;s commercial or homeowners insurance policy limits control maximum recovery absent personal asset pursuit.</p>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <AffiliateCTA headline={`Get a Free ${s.name} Case Review`} />
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <div className="pb-6"><AdBanner slot="3333333333" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
