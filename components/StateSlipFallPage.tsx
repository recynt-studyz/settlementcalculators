import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import SlipFallCalculatorWrapper from '@/components/SlipFallCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'
import AffiliateCTA from '@/components/AffiliateCTA'
import { STATES } from '@/lib/settlementData'

const trustSignals = ['⚖️ 2026 Updated', '🔒 Private', '⚡ Instant', '✓ Free']

export function generateStateSlipFallMetadata(stateAbbr: string): Metadata {
  const s = STATES[stateAbbr]
  if (!s) return {}
  return {
    title: `${s.name} Slip and Fall Settlement Calculator 2026`,
    description: `Estimate your ${s.name} slip and fall settlement. ${s.name} uses ${s.faultRule === 'contributory' ? 'contributory negligence' : 'comparative fault'} for premises liability. Free 2026 calculator with ${s.name}-specific negligence rules.`,
    alternates: { canonical: `https://settlementcalculators.app/${s.name.toLowerCase().replace(/\s+/g, '-')}-slip-fall-settlement` },
    robots: { index: true, follow: true },
  }
}

export default function StateSlipFallPage({ stateAbbr }: { stateAbbr: string }) {
  const s = STATES[stateAbbr]
  if (!s) return null

  const fmt = (v: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

  const faqs: FaqItem[] = [
    {
      q: `How much are slip and fall settlements worth in ${s.name}?`,
      a: `Slip and fall settlements in ${s.name} vary widely based on injury severity, the strength of liability evidence, and available insurance coverage. Minor injuries (sprains, bruising) typically settle for $10,000–$35,000. Moderate injuries (fractures, surgery) settle for $40,000–$150,000. Severe injuries (back/spine, TBI, hip replacement) can reach $200,000–$500,000 or more. The strength of your premises liability case — whether the property owner knew about the hazard — significantly affects settlement value. Use our calculator with your specific damages for a personalized estimate.`,
    },
    {
      q: `What do I need to prove in a ${s.name} slip and fall case?`,
      a: `In ${s.name}, a slip and fall premises liability claim requires proving: (1) the property owner had a duty of care to you (different for invitees, licensees, and trespassers); (2) the property owner breached that duty by failing to maintain safe conditions or warn of known hazards; (3) the breach caused your fall and injuries; and (4) you suffered actual damages. The critical element is often notice — proving the owner knew or should have known about the hazard. Evidence like surveillance video, incident reports, inspection records, witness statements, and photographs of the scene is essential.`,
    },
    {
      q: `How long do I have to file a slip and fall claim in ${s.name}?`,
      a: `In ${s.name}, the statute of limitations for slip and fall premises liability claims is ${s.solYears} year${s.solYears !== 1 ? 's' : ''} from the date of the accident. Claims against government entities (falls on public property, government buildings) typically require formal notice within 60–180 days — often much sooner than the general limitation period. Preserve evidence immediately, take photographs, get witness information, and report the accident to the property owner before leaving if possible.`,
    },
    {
      q: `What if I was partially at fault for my slip and fall in ${s.name}?`,
      a: `${s.name} uses ${s.faultRuleLabel}. ${s.faultRule === 'contributory' ? `Under ${s.name}&apos;s contributory negligence rule, if you are found even partially at fault — for example, if you were looking at your phone, wearing improper footwear, or ignored a warning sign — you may be completely barred from recovering any damages. Insurance adjusters in contributory negligence states aggressively attempt to attribute fault to the plaintiff. Having an experienced premises liability attorney is especially important in ${s.name}.` : `Under ${s.name}&apos;s ${s.faultRule === 'modified_50' ? 'modified comparative fault (50% bar)' : s.faultRule === 'modified_51' ? 'modified comparative fault (51% bar)' : 'pure comparative fault'} rule, your recovery is reduced by your percentage of fault${s.faultRule !== 'pure_comparative' ? `, and you cannot recover if you are ${s.faultRule === 'modified_50' ? '50%' : '51%'} or more at fault` : ', but you can always recover something regardless of your fault percentage'}.`}`,
    },
    {
      q: `Does property owner's insurance cover slip and fall injuries in ${s.name}?`,
      a: `Yes — commercial property owners typically carry general liability insurance that covers slip and fall injuries. Homeowners and renters insurance also covers premises liability for falls on residential property. The available insurance coverage often determines your practical recovery ceiling. If damages exceed policy limits, you may need to pursue the property owner's personal assets, which can be difficult. For falls on government property, special notice requirements and sometimes damage caps apply. An experienced ${s.name} premises liability attorney can identify all available insurance coverage.`,
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
    name: `${s.name} Slip and Fall Settlement Calculator 2026`,
    url: `https://settlementcalculators.app/${s.name.toLowerCase().replace(/\s+/g, '-')}-slip-fall-settlement`,
    applicationCategory: 'LegalApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema).replace(/</g, '\\u003c') }} />

      <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/herobgsc.webp')" }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 pb-10">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
              {s.name} Slip and Fall Settlement Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Estimate your {s.name} slip and fall settlement. {s.name} uses {s.faultRuleLabel.split('—')[0].trim()} for premises liability cases.
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
              <SlipFallCalculatorWrapper defaultState={stateAbbr} />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222222" /></div>

          <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-200 mb-2">{s.name} Premises Liability Overview</h2>
            <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed">
              {s.name} slip and fall cases are governed by premises liability law. You must prove the property owner knew or should have known about the hazard. {s.name} uses {s.faultRuleLabel}. The statute of limitations for slip and fall claims in {s.name} is {s.solYears} year{s.solYears !== 1 ? 's' : ''}. Typical {s.name} slip and fall settlements range from {fmt(s.avgPIRange[0])} to {fmt(s.avgPIRange[1])} for moderate injury cases.
            </p>
          </div>

          <div className="mb-4 text-center">
            <a href="/slip-fall" className="text-sm text-[#1e293b] dark:text-slate-400 hover:underline">
              ← Back to Slip & Fall Settlement Calculator
            </a>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How Slip and Fall Cases Work in {s.name}</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Slip and fall cases in {s.name} are a type of premises liability claim. To win, you must prove the property owner or occupier was negligent in maintaining safe conditions. The key legal question is whether the owner knew (or should have known) about the dangerous condition and failed to fix it or warn visitors.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The strength of notice evidence determines settlement value more than almost any other factor. A grocery store with a spill that sat for 45 minutes before you fell (documented by surveillance footage and cleaning logs) presents much stronger liability than a spill that occurred moments before your fall with no prior notice to the store.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {s.name}&apos;s {s.faultRuleLabel} means {s.faultRule === 'contributory' ? `defendants will aggressively argue that you were also negligent — for example, that you were distracted, wearing inappropriate footwear, or ignored warning signs. Even a small finding of contributory fault could eliminate your entire recovery in ${s.name}.` : `your settlement will be reduced proportionally by your percentage of fault. Insurance companies routinely argue that plaintiffs were partially at fault for not watching where they were walking. Having clear documentation of the hazard and your right to be in the location strengthens your case.`}
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: {s.name} Slip and Fall Settlement</h2>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Sandra slipped on an unmarked wet floor at a {s.name} grocery store. She broke her wrist and required surgery. Medical bills: $28,000. Six weeks lost wages: $5,200. Store surveillance showed the spill was present for 30 minutes before her fall.
              </p>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4 font-mono bg-white/60 dark:bg-black/20 rounded-xl px-4 py-3">
                <div>Special damages: $28,000 + $5,200 = $33,200</div>
                <div>Pain & suffering (3x–5x, moderate injury): $99,600 – $166,000</div>
                <div>Gross settlement: $132,800 – $199,200</div>
                <div>Attorney fees (33%): −$43,824 – −$65,736</div>
                <div>Medical lien: −$8,400</div>
                <div className="font-bold pt-1">NET TO SANDRA: ~$80,576 – $125,064</div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                The 30-minute surveillance evidence of the spill strongly supports the &quot;owner knew or should have known&quot; element of premises liability in {s.name}, making this a strong case. This case would likely settle in the $75,000–$120,000 range.
              </p>
            </div>
          </div>

          <div className="mb-6">
            <AffiliateCTA headline={`Get a Free ${s.name} Slip & Fall Case Review`} />
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
