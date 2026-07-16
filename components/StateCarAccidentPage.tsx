import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import CarAccidentCalculatorWrapper from '@/components/CarAccidentCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'
import AffiliateCTA from '@/components/AffiliateCTA'
import { STATES } from '@/lib/settlementData'

const trustSignals = ['⚖️ 2026 Updated', '🔒 Private', '⚡ Instant', '✓ Free']

export function generateStateCarAccidentMetadata(stateAbbr: string): Metadata {
  const s = STATES[stateAbbr]
  if (!s) return {}
  return {
    title: `${s.name} Car Accident Settlement Calculator 2026`,
    description: `Estimate your ${s.name} car accident settlement. ${s.name} uses ${s.faultRule === 'pure_comparative' ? 'pure comparative fault' : s.faultRule === 'contributory' ? 'contributory negligence' : 'modified comparative fault'}. Free 2026 calculator with state-specific laws.`,
    alternates: { canonical: `https://settlementcalculators.app/${s.name.toLowerCase().replace(/\s+/g, '-')}-car-accident-settlement` },
    robots: { index: true, follow: true },
  }
}

export default function StateCarAccidentPage({ stateAbbr }: { stateAbbr: string }) {
  const s = STATES[stateAbbr]
  if (!s) return null

  const fmt = (v: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

  const faqs: FaqItem[] = [
    {
      q: `How much is my ${s.name} car accident claim worth?`,
      a: `Car accident settlements in ${s.name} depend on the severity of your injuries, your medical bills, lost wages, and the available insurance coverage. Minor soft tissue injuries typically settle for $10,000–$35,000. Moderate injuries requiring surgery may settle for $50,000–$200,000. Severe injuries with permanent impairment can exceed $500,000. ${s.name} uses ${s.faultRuleLabel}, which affects your recovery if you were partially at fault. Use the calculator above with your actual damages for a personalized estimate.`,
    },
    {
      q: `What damages can I recover after a car accident in ${s.name}?`,
      a: `In ${s.name}, car accident victims can recover economic damages (medical bills, future medical costs, lost wages, lost earning capacity, vehicle repair, rental car costs) and non-economic damages (pain and suffering, emotional distress, loss of enjoyment of life). In cases of gross negligence or drunk driving, punitive damages may also be available. ${s.name}&apos;s ${s.faultRule === 'pure_comparative' ? 'pure comparative' : s.faultRule === 'contributory' ? 'contributory negligence' : 'modified comparative'} fault rule means ${s.faultRule === 'contributory' ? 'any fault on your part could bar recovery' : 'your recovery is reduced by your percentage of fault'}.`,
    },
    {
      q: `Should I get an attorney for my ${s.name} car accident?`,
      a: `Yes — car accident victims who hire a personal injury attorney receive 3.5x more compensation on average than those who negotiate alone (Insurance Research Council 2024). Insurance adjusters work for the insurance company, not for you. They are trained to minimize settlements. A ${s.name} car accident attorney works on contingency (no fee unless you win), handles all negotiations, gathers evidence, and ensures you don't accept a lowball offer before you know your full damages. Call for a free consultation immediately.`,
    },
    {
      q: `How long do I have to file a car accident claim in ${s.name}?`,
      a: `In ${s.name}, the statute of limitations for a car accident personal injury lawsuit is ${s.solYears} year${s.solYears !== 1 ? 's' : ''} from the date of the accident. Property damage claims may have a different deadline. Claims against government entities (for accidents involving government vehicles or road defects) typically require notice within 60–180 days. Do not wait — evidence disappears, witnesses forget, and missing the statute of limitations permanently bars your claim regardless of how clear-cut the liability is.`,
    },
    {
      q: `What if the other driver was uninsured in ${s.name}?`,
      a: `If the at-fault driver has no insurance (or insufficient coverage), your own uninsured motorist (UM) and underinsured motorist (UIM) coverage may pay your damages up to your policy limits. ${s.name} ${s.faultRule === 'pure_comparative' ? 'allows recovery even with shared fault, which can help UM/UIM claims.' : 'follows specific rules for UM/UIM claims.'} If you don't have UM/UIM coverage, you may need to sue the at-fault driver personally — but collecting on a judgment against an uninsured driver can be difficult. Always carry UM/UIM coverage to protect yourself.`,
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
    name: `${s.name} Car Accident Settlement Calculator 2026`,
    url: `https://settlementcalculators.app/${s.name.toLowerCase().replace(/\s+/g, '-')}-car-accident-settlement`,
    applicationCategory: 'LegalApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  }

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Calculate Your ${s.name} Car Accident Settlement`,
    step: [
      { '@type': 'HowToStep', name: 'Enter injury and vehicle damages', text: `Enter your medical bills, lost wages, vehicle damage, and rental costs. ${s.name} is pre-selected.` },
      { '@type': 'HowToStep', name: 'Select injury severity and fault percentage', text: `Choose injury severity and enter your percentage of fault. ${s.name} uses ${s.faultRuleLabel}.` },
      { '@type': 'HowToStep', name: 'View your ${s.name} car accident settlement estimate', text: 'See your estimated settlement range, property damage claim, attorney fees, and net payout.' },
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
              {s.name} Car Accident Settlement Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Estimate your {s.name} car accident settlement. {s.name} uses {s.faultRuleLabel.split('—')[0].trim()}.
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
              <CarAccidentCalculatorWrapper defaultState={stateAbbr} />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222222" /></div>

          <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-200 mb-2">{s.name} Car Accident Law Overview</h2>
            <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed">
              {s.name} uses {s.faultRuleLabel}. You have {s.solYears} year{s.solYears !== 1 ? 's' : ''} to file a car accident lawsuit. Car accident settlements in {s.name} typically range from {fmt(s.avgPIRange[0])} to {fmt(s.avgPIRange[1])} for moderate injury cases. Car accident victims who hire an attorney receive 3.5x more compensation on average than those who negotiate alone (Insurance Research Council 2024).
            </p>
          </div>

          <div className="mb-4 text-center">
            <a href="/car-accident" className="text-sm text-[#1e293b] dark:text-slate-400 hover:underline">
              ← Back to Car Accident Settlement Calculator
            </a>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How Car Accident Settlements Work in {s.name}</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Car accident settlements in {s.name} involve two separate claims: a property damage claim (vehicle repair or replacement, rental car) and a personal injury claim (medical bills, lost wages, pain and suffering). Insurance companies handle these separately, and the injury claim is almost always worth far more than the property damage claim. Most insurance companies will pay the property damage claim quickly — the injury claim is where negotiation matters most.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The at-fault driver&apos;s liability insurance covers your damages up to their policy limits. {s.name} requires minimum liability coverage of $25,000/$50,000 in most cases, but many at-fault drivers carry only minimum coverage. If your damages exceed the policy limits, your own uninsured/underinsured motorist (UM/UIM) coverage may cover the gap.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {s.name}&apos;s {s.faultRuleLabel} means {s.faultRule === 'contributory' ? 'any finding that you contributed to the accident could bar all recovery. Insurance adjusters in contributory negligence states aggressively look for evidence of plaintiff fault. Document everything and consult an attorney before speaking to the insurance company.' : `your fault percentage reduces your recovery${s.faultRule === 'modified_50' ? ', and any fault of 50% or more bars recovery entirely' : s.faultRule === 'modified_51' ? ', and any fault of 51% or more bars recovery entirely' : ' proportionally, but you can still recover even with substantial fault'}. Never admit fault at the scene.`}
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: {s.name} Car Accident Settlement</h2>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Maria was rear-ended at a stoplight in {s.name}. Her medical bills totaled $18,000, she missed 6 weeks of work ($7,200 lost wages), her vehicle sustained $9,000 in damage, and her injury was moderate (requiring surgery). The other driver was 100% at fault.
              </p>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4 font-mono bg-white/60 dark:bg-black/20 rounded-xl px-4 py-3">
                <div>Injury special damages: $18,000 + $7,200 = $25,200</div>
                <div>Pain & suffering (3x–5x multiplier): $75,600 – $126,000</div>
                <div>Gross injury claim: $100,800 – $151,200</div>
                <div>Attorney fees (33%): −$33,264 – −$49,896</div>
                <div>Medical lien (30%): −$5,400</div>
                <div className="font-bold pt-1">NET INJURY CLAIM: ~$62,136 – $95,904</div>
                <div className="pt-1">Property damage claim (separate): $9,000 vehicle + rental</div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                In {s.name}, this case would likely settle in the range of $60,000–$90,000 for the injury claim, paid by the at-fault driver&apos;s liability insurance. The property damage claim settles separately, typically faster.
              </p>
            </div>
          </div>

          <div className="mb-6">
            <AffiliateCTA headline={`Get a Free ${s.name} Car Accident Case Review`} />
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
