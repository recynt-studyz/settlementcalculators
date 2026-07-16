import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import SlipFallCalculatorWrapper from '@/components/SlipFallCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'
import AffiliateCTA from '@/components/AffiliateCTA'

export const metadata: Metadata = {
  title: 'Slip and Fall Settlement Calculator 2026',
  description: 'Estimate your slip and fall settlement value. Free premises liability calculator with state-specific negligence rules and injury multipliers. All 50 states.',
  alternates: { canonical: 'https://settlementcalculators.app/slip-fall' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  { q: 'How much are slip and fall settlements worth?', a: 'Slip and fall settlements vary widely by injury severity and liability strength. Minor injuries (sprains, bruising) typically settle for $10,000–$35,000. Moderate injuries requiring surgery often settle for $40,000–$150,000. Severe injuries (back/spine surgery, hip replacement, TBI from head impact) can reach $200,000–$500,000 or more. The strength of notice evidence — whether the property owner knew about the hazard — significantly affects value. Cases with surveillance video showing a longtime hazard settle for significantly more than cases with no notice evidence.' },
  { q: 'What do I need to prove in a slip and fall case?', a: 'A premises liability slip and fall claim requires proving: (1) the property owner owed you a duty of care; (2) the owner breached that duty by allowing a dangerous condition to exist; (3) the owner knew or should have known about the hazard (notice); (4) the breach caused your fall and injuries; and (5) you suffered actual damages. Notice is the most contested element — you must show the hazard existed long enough that a reasonable property owner conducting regular inspections should have discovered and remedied it. Surveillance footage, cleaning logs, maintenance records, incident reports, and witness testimony establish notice.' },
  { q: 'How long do I have to file a slip and fall claim?', a: 'The statute of limitations for slip and fall claims varies by state — typically 2–3 years from the date of the accident. Claims against government entities (falls on public property, government buildings) often require formal written notice within 60–180 days of the incident — much shorter than the general limitations period. Evidence disappears quickly in slip and fall cases: surveillance footage is typically overwritten within 30–90 days, hazardous conditions are fixed, and witnesses forget. Document everything at the scene and contact a premises liability attorney immediately.' },
  { q: 'What if I was partially at fault for my slip and fall?', a: 'Your state\'s comparative fault rule determines how your own negligence affects your recovery. Pure comparative fault states (California, New York, Florida) allow recovery even if you were 90% at fault, though your damages are proportionally reduced. Modified comparative fault states (most states) allow recovery only if you were less than 50% or 51% at fault. Contributory negligence states (Alabama, Maryland, North Carolina, Virginia, DC) bar all recovery if you were even 1% at fault. Insurance adjusters always look for evidence of plaintiff fault — wearing inappropriate footwear, looking at a phone, ignoring warning signs — to reduce or eliminate your claim.' },
  { q: "Does property owner's insurance cover slip and fall injuries?", a: "Commercial property owners carry general liability insurance that covers slip and fall injuries. Homeowners insurance also typically covers premises liability for falls on residential property. The policy limits vary — retail stores and large commercial properties often carry $1–5 million in coverage, while residential homeowners policies may have $100,000–$300,000 in liability coverage. Without insurance, you can pursue the property owner's personal assets, but collection is much more difficult. Always determine available insurance coverage before deciding whether to pursue a claim." },
]

const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const webAppSchema = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Slip and Fall Settlement Calculator 2026', url: 'https://settlementcalculators.app/slip-fall', applicationCategory: 'LegalApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }

const trustSignals = ['⚖️ 2026 Updated', '🔒 Private', '⚡ Instant', '✓ Free']

export default function SlipFallPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema).replace(/</g, '\\u003c') }} />
      <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/herobgsc.webp')" }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 pb-10">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">Slip and Fall Settlement Calculator 2026</h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">Estimate your slip and fall premises liability settlement. Includes case strength assessment, state fault rules, and net payout after attorney fees. All 50 states.</p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">{trustSignals.map(t => <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>)}</div>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="1111111111" /></div>
          <div className="max-w-5xl mx-auto px-4"><div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden"><SlipFallCalculatorWrapper /></div></div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>
      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222222" /></div>
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How Slip and Fall Settlements Are Calculated</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">Slip and fall settlements are a form of premises liability claim — you must prove the property owner was negligent in maintaining safe conditions. Unlike car accidents where fault is often clear, slip and fall cases require establishing that the owner knew or should have known about the hazardous condition. This notice element is what insurance adjusters and defense attorneys attack most aggressively.</p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">Once liability is established, settlement value follows the same multiplier method used in other personal injury cases: special damages (medical bills, lost wages) multiplied by an injury severity factor (1.5x–8x for slip and fall cases). Falls tend to produce higher multipliers than car accidents for equivalent injuries because the defendant&apos;s failure to maintain safe property is particularly compelling to juries.</p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Location matters significantly. Falls in commercial settings (grocery stores, retail chains, restaurants) benefit from the expectation of professional property maintenance and regular inspection. Corporate defendants with deep pockets and reputational concerns are more motivated to settle. Falls on government property face special procedural hurdles. Private residential falls depend on homeowners insurance availability.</p>
          </div>
          <div className="mb-6"><AffiliateCTA headline="Get a Free Slip & Fall Case Review" /></div>
          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333333" /></div>
        </div>
      </section>
      <Footer />
    </>
  )
}
