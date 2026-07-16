import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import WorkersCompCalculatorWrapper from '@/components/WorkersCompCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'
import AffiliateCTA from '@/components/AffiliateCTA'
import { STATES } from '@/lib/settlementData'

const trustSignals = ['⚖️ 2026 Updated', '🔒 Private', '⚡ Instant', '✓ Free']

export function generateStateWorkersCompMetadata(stateAbbr: string): Metadata {
  const s = STATES[stateAbbr]
  if (!s) return {}
  return {
    title: `${s.name} Workers Compensation Calculator 2026`,
    description: `Calculate your ${s.name} workers comp benefits. ${s.name} maximum weekly workers comp benefit: $${s.wcMaxWeekly.toLocaleString()}/week. Free 2026 calculator with ${s.name}-specific rates.`,
    alternates: { canonical: `https://settlementcalculators.app/${s.name.toLowerCase().replace(/\s+/g, '-')}-workers-comp-calculator` },
    robots: { index: true, follow: true },
  }
}

export default function StateWorkersCompPage({ stateAbbr }: { stateAbbr: string }) {
  const s = STATES[stateAbbr]
  if (!s) return null

  const fmt = (v: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

  const faqs: FaqItem[] = [
    {
      q: `How much does workers comp pay in ${s.name}?`,
      a: `In ${s.name}, workers compensation pays 66.7% (two-thirds) of your average weekly wage, up to the state maximum of ${fmt(s.wcMaxWeekly)} per week in 2026. If you earned $1,200/week before your injury, your weekly benefit would be approximately $800/week. If you earned $2,500/week, your benefit would be capped at ${fmt(s.wcMaxWeekly)}/week regardless of your actual wages. Benefits are generally not taxable as income, which means your take-home pay replacement rate is actually higher than 66.7%.`,
    },
    {
      q: `Can I sue my employer instead of filing workers comp in ${s.name}?`,
      a: `Generally, no. ${s.name}&apos;s workers compensation system is an exclusive remedy, meaning you give up your right to sue your employer in exchange for guaranteed benefits regardless of fault. However, there are important exceptions: you can sue third parties (equipment manufacturers, contractors, property owners) whose negligence contributed to your injury; you may be able to sue if your employer intentionally harmed you; and in some states, employers who fail to carry required workers comp insurance lose the exclusive remedy protection. A workers comp attorney can evaluate whether any exceptions apply to your situation.`,
    },
    {
      q: `What injuries are covered by workers compensation in ${s.name}?`,
      a: `${s.name} workers compensation covers any injury that arises out of and in the course of employment — including accidents, repetitive stress injuries (carpal tunnel, back strain from repeated lifting), occupational diseases caused by workplace exposures, and mental/emotional injuries in some circumstances. The injury does not need to be caused by employer negligence — workers comp is no-fault coverage. Even if you were partially at fault for your own injury, you are still entitled to workers comp benefits in ${s.name}.`,
    },
    {
      q: `How long can I receive workers comp benefits in ${s.name}?`,
      a: `Temporary total disability (TTD) benefits in ${s.name} continue until you return to work or reach maximum medical improvement (MMI), typically with a maximum of 500 weeks though this varies. Permanent partial disability (PPD) benefits are paid as a lump sum or weekly payments based on your impairment rating. Permanent total disability (PTD) benefits may continue for life in cases of total and permanent incapacity. Medical benefits for your work injury continue as long as treatment is reasonably necessary and related to your work injury.`,
    },
    {
      q: `Can my employer fire me for filing a workers comp claim in ${s.name}?`,
      a: `No — retaliating against an employee for filing a workers compensation claim is illegal in ${s.name} and all 50 states. Employer retaliation can include firing, demotion, reduced hours, or other adverse employment actions taken because of your workers comp claim. If you believe your employer retaliated against you for filing a claim, you may have both a workers comp retaliation claim and a wrongful termination claim. Document any adverse actions and their timing relative to your injury and claim, and consult an employment attorney immediately.`,
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
    name: `${s.name} Workers Compensation Calculator 2026`,
    url: `https://settlementcalculators.app/${s.name.toLowerCase().replace(/\s+/g, '-')}-workers-comp-calculator`,
    applicationCategory: 'LegalApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  }

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Calculate ${s.name} Workers Comp Benefits`,
    step: [
      { '@type': 'HowToStep', name: 'Enter your average weekly wage', text: `${s.name} is pre-selected. Enter your gross average weekly wage before the injury.` },
      { '@type': 'HowToStep', name: 'Select injury type and disability details', text: 'Choose your disability type (TTD, TPD, PPD, or PTD) and enter weeks out of work or impairment rating.' },
      { '@type': 'HowToStep', name: 'View your benefit estimate', text: `See your weekly benefit (66.7% of AWW, capped at ${fmt(s.wcMaxWeekly)}/week in ${s.name}), temporary disability total, permanent disability estimate, and total workers comp.` },
    ],
  }

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
              {s.name} Workers Compensation Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate your {s.name} workers comp benefits. Maximum weekly benefit: {fmt(s.wcMaxWeekly)}/week.
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
              <WorkersCompCalculatorWrapper defaultState={stateAbbr} />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222222" /></div>

          <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-200 mb-2">{s.name} Workers Comp Quick Facts 2026</h2>
            <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed">
              {s.name} workers compensation pays 66.7% of your average weekly wage, up to a maximum of {fmt(s.wcMaxWeekly)}/week. Benefits cover temporary and permanent disability payments plus all reasonable medical expenses related to your work injury. Your employer cannot retaliate against you for filing a claim.
            </p>
          </div>

          <div className="mb-4 text-center">
            <a href="/workers-comp" className="text-sm text-[#1e293b] dark:text-slate-400 hover:underline">
              ← Back to Workers Comp Calculator
            </a>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How Workers Comp Works in {s.name}</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Workers compensation in {s.name} is a no-fault insurance system — you receive benefits regardless of whether your employer or you caused the accident. In exchange for guaranteed benefits, you generally cannot sue your employer in court. {s.name} employers are required to carry workers compensation insurance, and failure to do so can expose employers to personal liability.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Your weekly benefit in {s.name} is calculated as 66.7% of your average weekly wage (AWW) for the 52 weeks before your injury, up to the state maximum of {fmt(s.wcMaxWeekly)}/week. If you earned {fmt(1500)} per week, your weekly benefit would be {fmt(1000)}/week. Benefits are generally not subject to federal or state income tax, effectively increasing their purchasing power compared to taxable wages.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Once you reach Maximum Medical Improvement (MMI) — the point where your condition is stable and unlikely to improve further — your treating physician will assign a permanent impairment rating as a percentage of whole-person disability. This rating, combined with your weekly benefit rate and a state-specific multiplier, determines your permanent partial disability (PPD) or permanent total disability (PTD) award in {s.name}.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: {s.name} Workers Comp Calculation</h2>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                James works in {s.name} and earns $1,200/week. He suffers a back injury requiring surgery and is out of work for 16 weeks. His physician assigns a 15% permanent partial disability rating.
              </p>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4 font-mono bg-white/60 dark:bg-black/20 rounded-xl px-4 py-3">
                <div>Average weekly wage (AWW): $1,200/week</div>
                <div>Weekly TTD benefit (66.7%): $800/week</div>
                <div>{s.name} maximum: {fmt(s.wcMaxWeekly)}/week (not capped here)</div>
                <div>TTD benefits (16 weeks × $800): $12,800</div>
                <div>PPD award (15% × 300 weeks × $800): $36,000</div>
                <div>Medical benefits (surgery, PT, etc.): $45,000</div>
                <div className="font-bold pt-1">TOTAL WORKERS COMP: ~$93,800</div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                In {s.name}, James&apos;s total workers comp package would be approximately $93,800 including disability payments and medical benefits. The permanent disability award may be paid as a lump sum or structured payments depending on {s.name}&apos;s workers comp regulations.
              </p>
            </div>
          </div>

          <div className="mb-6">
            <AffiliateCTA headline={`Get a Free ${s.name} Workers Comp Review`} />
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
