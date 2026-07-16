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
  description:
    'Calculate your workers comp weekly benefit, temporary disability total, and permanent disability award. State maximum weekly benefits for all 50 states. Free 2026 calculator.',
  alternates: { canonical: 'https://settlementcalculators.app/workers-comp' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'How much does workers comp pay?',
    a: "Workers compensation pays 66.7% (two-thirds) of your average weekly wage (AWW), up to your state's maximum weekly benefit. State maximums range from approximately $600/week in lower-benefit states to over $2,000/week in higher-benefit states for 2026. Benefits are generally not taxable as income, which means your effective take-home pay replacement is higher than the 66.7% rate. For permanent disability, you receive additional compensation based on your impairment rating multiplied by your weekly benefit and a state-specific number of weeks. Medical benefits cover all reasonable and necessary treatment related to your work injury. Consult a licensed workers comp attorney to ensure you receive all benefits you are entitled to.",
  },
  {
    q: 'Can I sue my employer instead of filing workers comp?',
    a: "Generally no — workers compensation is an exclusive remedy, meaning you give up the right to sue your employer in exchange for guaranteed no-fault benefits. However, important exceptions exist: you can sue third parties (equipment manufacturers, contractors, property owners) whose negligence contributed to your injury; you may sue if your employer intentionally harmed you; and if your employer is illegally uninsured, they typically lose the exclusive remedy protection. Third-party lawsuits can supplement your workers comp recovery — an employer's negligence is no defense in a third-party personal injury claim. A workers comp attorney can evaluate whether any third-party or exception claims apply to your situation.",
  },
  {
    q: 'What injuries are covered by workers compensation?',
    a: "Workers compensation covers any injury that arises out of and in the course of employment. This includes sudden traumatic accidents (falls, machinery injuries, workplace vehicle accidents), repetitive stress injuries (carpal tunnel from repetitive motions, back strain from repeated lifting, rotator cuff injuries from overhead work), occupational diseases caused by workplace exposure (asbestosis, hearing loss, chemical exposure, occupational cancer), and in many states, mental/emotional injuries related to workplace trauma. The injury does not need to be caused by employer negligence — workers comp is no-fault coverage, meaning you are entitled to benefits even if you were partially at fault for your own injury.",
  },
  {
    q: 'How long can I receive workers comp benefits?',
    a: "Temporary total disability (TTD) benefits continue until you return to work or reach maximum medical improvement (MMI). The maximum duration varies by state — typically 104–500 weeks. Once you reach MMI, a physician assigns a permanent impairment rating as a percentage of whole-person disability. Permanent partial disability (PPD) benefits are paid as a lump sum or structured payments based on your rating, your weekly benefit, and your state's schedule of weeks for various injuries. Permanent total disability (PTD) benefits may continue for life in cases of total and permanent incapacity. Medical benefits for your work injury generally continue as long as the treatment is reasonable and necessary, with no time limits in most states.",
  },
  {
    q: 'Can my employer fire me for filing a workers comp claim?',
    a: "No — retaliation for filing a workers compensation claim is illegal in all 50 states. Prohibited retaliation includes firing, demotion, reduced hours, shift changes, hostile work environment, and other adverse employment actions taken because of your workers comp claim. If your employer retaliates, you may have both a workers comp retaliation claim and a wrongful termination claim with additional remedies including reinstatement, back pay, and damages beyond workers comp benefits. Document all adverse employment actions and their timing relative to your injury and claim filing. Contact a workers comp attorney immediately if you believe you are experiencing retaliation.",
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
  name: 'Workers Compensation Calculator 2026',
  url: 'https://settlementcalculators.app/workers-comp',
  applicationCategory: 'LegalApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your Workers Comp Benefits',
  step: [
    { '@type': 'HowToStep', name: 'Enter your average weekly wage and state', text: 'Select your state and enter your gross average weekly wage (AWW) for the 52 weeks before your injury. The calculator applies your state\'s 2026 maximum weekly benefit cap.' },
    { '@type': 'HowToStep', name: 'Select injury type and disability details', text: 'Choose your disability type: temporary total disability (TTD), temporary partial disability (TPD), permanent partial disability (PPD with impairment rating), or permanent total disability (PTD). Enter weeks out of work and impairment rating if applicable.' },
    { '@type': 'HowToStep', name: 'View your workers comp benefit estimate', text: 'See your weekly TTD benefit (66.7% of AWW, capped at state maximum), total temporary disability amount, permanent disability estimate, and total workers comp package including medical benefits.' },
  ],
}

const trustSignals = ['⚖️ 2026 Updated', '🔒 Private', '⚡ Instant', '✓ Free']

const STATE_LINKS = [
  { slug: 'alabama', name: 'Alabama' }, { slug: 'alaska', name: 'Alaska' },
  { slug: 'arizona', name: 'Arizona' }, { slug: 'arkansas', name: 'Arkansas' },
  { slug: 'california', name: 'California' }, { slug: 'colorado', name: 'Colorado' },
  { slug: 'connecticut', name: 'Connecticut' }, { slug: 'delaware', name: 'Delaware' },
  { slug: 'florida', name: 'Florida' }, { slug: 'georgia', name: 'Georgia' },
  { slug: 'hawaii', name: 'Hawaii' }, { slug: 'idaho', name: 'Idaho' },
  { slug: 'illinois', name: 'Illinois' }, { slug: 'indiana', name: 'Indiana' },
  { slug: 'iowa', name: 'Iowa' }, { slug: 'kansas', name: 'Kansas' },
  { slug: 'kentucky', name: 'Kentucky' }, { slug: 'louisiana', name: 'Louisiana' },
  { slug: 'maine', name: 'Maine' }, { slug: 'maryland', name: 'Maryland' },
  { slug: 'massachusetts', name: 'Massachusetts' }, { slug: 'michigan', name: 'Michigan' },
  { slug: 'minnesota', name: 'Minnesota' }, { slug: 'mississippi', name: 'Mississippi' },
  { slug: 'missouri', name: 'Missouri' }, { slug: 'montana', name: 'Montana' },
  { slug: 'nebraska', name: 'Nebraska' }, { slug: 'nevada', name: 'Nevada' },
  { slug: 'new-hampshire', name: 'New Hampshire' }, { slug: 'new-jersey', name: 'New Jersey' },
  { slug: 'new-mexico', name: 'New Mexico' }, { slug: 'new-york', name: 'New York' },
  { slug: 'north-carolina', name: 'North Carolina' }, { slug: 'north-dakota', name: 'North Dakota' },
  { slug: 'ohio', name: 'Ohio' }, { slug: 'oklahoma', name: 'Oklahoma' },
  { slug: 'oregon', name: 'Oregon' }, { slug: 'pennsylvania', name: 'Pennsylvania' },
  { slug: 'rhode-island', name: 'Rhode Island' }, { slug: 'south-carolina', name: 'South Carolina' },
  { slug: 'south-dakota', name: 'South Dakota' }, { slug: 'tennessee', name: 'Tennessee' },
  { slug: 'texas', name: 'Texas' }, { slug: 'utah', name: 'Utah' },
  { slug: 'vermont', name: 'Vermont' }, { slug: 'virginia', name: 'Virginia' },
  { slug: 'washington', name: 'Washington' }, { slug: 'west-virginia', name: 'West Virginia' },
  { slug: 'wisconsin', name: 'Wisconsin' }, { slug: 'wyoming', name: 'Wyoming' },
]

export default function WorkersCompPage() {
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
              Workers Compensation Calculator 2026 — All 50 States
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate your workers comp weekly benefit, temporary disability total, and permanent disability award. State maximum weekly benefits hardcoded for all 50 states. Free 2026 calculator.
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
              <WorkersCompCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222222" /></div>

          <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-200 mb-2">Workers Comp Key Facts 2026</h2>
            <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed">
              Workers compensation is a no-fault benefit system — you receive benefits regardless of who caused your workplace injury. Weekly benefits equal 66.7% of your average weekly wage, capped at your state&apos;s 2026 maximum. Workers comp is generally the exclusive remedy against your employer, but third-party personal injury claims are not barred. These calculators provide estimates for educational purposes only. Results are not legal advice and do not create an attorney-client relationship. Consult a licensed workers compensation attorney in your state for an accurate benefits evaluation.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How Workers Compensation Is Calculated</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Workers compensation is a no-fault insurance system mandated by state law. You receive benefits regardless of whether your employer or you caused the workplace accident. In exchange for this guaranteed coverage, you generally give up the right to sue your employer in civil court — this is called the exclusive remedy doctrine. Your employer is legally required to carry workers comp insurance, and filing a claim cannot legally be used against you.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Your weekly benefit is calculated as 66.7% of your average weekly wage (AWW) for the 52 weeks before your injury, capped at your state&apos;s 2026 maximum. Workers comp benefits are generally not subject to federal or state income tax, which increases their effective purchasing power. For example, if you earned $1,500/week before your injury and your state maximum is $1,200/week, your weekly TTD benefit is $1,000/week (66.7% × $1,500). Since this amount is tax-free, it may replace 80–90% of your after-tax take-home pay.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Medical benefits cover all reasonable and necessary treatment related to your work injury — doctor visits, surgery, physical therapy, prescription medications, diagnostic tests, medical equipment, and home health care — at no cost to you. Unlike health insurance, workers comp has no deductibles, copays, or out-of-pocket maximums for covered work injury treatment. Your employer or their insurer selects the authorized treating physician in most states.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Once you reach Maximum Medical Improvement (MMI) — the point where your condition is medically stable and unlikely to improve further — your treating physician assigns a permanent impairment rating as a percentage of whole-person disability. This rating, combined with your weekly benefit rate and a state-specific number of weeks per body part, determines your permanent partial disability (PPD) or permanent total disability (PTD) award. Many states allow these awards to be paid as lump sums, which can be negotiated through a workers comp settlement.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: Workers Comp Calculation</h2>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                James works in Ohio and earns $1,200/week as a warehouse supervisor. He suffers a back injury requiring surgery when a forklift he was operating malfunctioned. He is out of work for 16 weeks before returning to light duty. His physician assigns a 15% permanent partial disability rating at MMI. Ohio&apos;s maximum weekly benefit for 2026 is $1,220.
              </p>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4 font-mono bg-white/60 dark:bg-black/20 rounded-xl px-4 py-3">
                <div>Average weekly wage (AWW): $1,200/week</div>
                <div>Weekly TTD benefit (66.7%): $800/week</div>
                <div>Ohio maximum: $1,220/week (not capped here)</div>
                <div>TTD benefits (16 weeks × $800): $12,800</div>
                <div>PPD award (15% impairment × 300 weeks × $800): $36,000</div>
                <div>Medical benefits (surgery, PT, imaging): $52,000</div>
                <div className="font-bold pt-1">TOTAL WORKERS COMP: ~$100,800</div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                James may also have a third-party personal injury claim against the forklift manufacturer if the equipment was defective. A third-party claim is not barred by workers comp exclusivity and can recover damages not available under workers comp — including pain and suffering, full lost wages beyond 66.7%, and punitive damages. A workers comp attorney can evaluate whether a third-party claim is viable and help maximize total recovery. Consult a licensed attorney before settling any workers comp claim.
              </p>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors That Affect Workers Comp Benefits</h2>
            <ul className="space-y-5">
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Average weekly wage calculation</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Your AWW calculation includes all compensation — base wages, overtime, bonuses, commissions, and employer-provided benefits. If your wages fluctuate due to seasonal work or overtime, ensuring the correct 52-week lookback is critical. Incorrect AWW calculations — often understated by the insurer — reduce every benefit category. An attorney can audit your AWW calculation and file for corrections.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Independent medical examination (IME)</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Workers comp insurers frequently require injured workers to undergo an Independent Medical Examination (IME) by a physician they select. IME doctors are typically paid by the insurer and have financial incentives to minimize impairment ratings and conclude that you have reached MMI earlier than your treating physician believes. Low IME ratings reduce permanent disability awards. Having a workers comp attorney who can challenge IME conclusions and arrange for your own independent expert is essential in significant permanent disability cases.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Third-party claims</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">If your work injury was caused or contributed to by a third party — a negligent driver in a work-related vehicle accident, a defective product manufacturer, a subcontractor, or a property owner — you can pursue a personal injury claim against that third party in addition to your workers comp benefits. Third-party claims are not subject to the exclusive remedy limitation and can recover pain and suffering, full economic damages, and punitive damages not available in workers comp.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Permanent impairment rating disputes</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">The permanent impairment rating assigned at MMI determines your permanent disability award. A difference of even 5% in impairment rating can mean tens of thousands of dollars in permanent disability benefits. Ratings assigned by the workers comp insurer&apos;s IME physician are frequently lower than ratings by your own treating physician. You have the right to contest impairment ratings, and in many states, to request an additional independent medical opinion. A workers comp attorney can navigate the rating dispute process.</p>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <AffiliateCTA headline="Questions About Your Workers Comp Claim?" />
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Workers Comp Calculator by State</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Workers comp maximum weekly benefits and benefit calculation rules vary by state. Select your state for a calculator pre-loaded with your state&apos;s 2026 maximum weekly benefit.
            </p>
            <div className="flex flex-wrap gap-2">
              {STATE_LINKS.map(({ slug, name }) => (
                <a
                  key={slug}
                  href={`/${slug}-workers-comp-calculator`}
                  className="text-xs px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-[#1e293b] hover:text-white hover:border-[#1e293b] transition-colors"
                >
                  {name}
                </a>
              ))}
            </div>
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
