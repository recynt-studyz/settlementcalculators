import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import SlipFallCalculatorWrapper from '@/components/SlipFallCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'
import AffiliateCTA from '@/components/AffiliateCTA'

export const metadata: Metadata = {
  title: 'Slip and Fall Settlement Calculator 2026 — Premises Liability',
  description:
    'Estimate your slip and fall settlement value including medical bills, lost wages, and pain and suffering. State-specific negligence rules and case strength analysis. All 50 states.',
  alternates: { canonical: 'https://settlementcalculators.app/slip-fall' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'How much are slip and fall settlements worth?',
    a: 'Slip and fall settlements vary widely by injury severity and liability strength. Minor injuries (sprains, bruising) typically settle for $10,000–$35,000. Moderate injuries requiring surgery often settle for $40,000–$150,000. Severe injuries (back/spine surgery, hip replacement, TBI from head impact) can reach $200,000–$500,000 or more. The strength of notice evidence — whether the property owner knew about the hazard — significantly affects settlement value. Cases with surveillance video showing a longstanding hazard settle for significantly more than cases with no notice evidence. Consult a licensed personal injury attorney to evaluate your specific premises liability claim.',
  },
  {
    q: 'What do I need to prove in a slip and fall case?',
    a: 'A premises liability slip and fall claim requires proving: (1) the property owner owed you a duty of care; (2) the owner breached that duty by allowing a dangerous condition to exist; (3) the owner knew or should have known about the hazard (the notice element); (4) the breach caused your fall and injuries; and (5) you suffered actual damages. Notice is the most contested element — you must show the hazard existed long enough that a reasonable property owner conducting regular inspections should have discovered and fixed it. Surveillance footage, cleaning logs, maintenance records, incident reports, and witness statements establish notice and are critical to your premises liability claim.',
  },
  {
    q: 'How long do I have to file a slip and fall claim?',
    a: 'The statute of limitations for slip and fall premises liability claims varies by state — typically 2–3 years from the date of the accident. Claims against government entities (falls on public property, government buildings, public sidewalks) often require formal written notice within 60–180 days of the incident — much shorter than the general limitations period. Evidence disappears quickly in slip and fall cases: surveillance footage is typically overwritten within 30–90 days, hazardous conditions are fixed, and witnesses forget. Document everything at the scene and consult a licensed premises liability attorney immediately — do not wait.',
  },
  {
    q: 'What if I was partially at fault for my slip and fall?',
    a: "Your state's comparative fault rule determines how your own negligence affects your recovery. Pure comparative fault states (California, New York, Florida) allow recovery even if you were 90% at fault, though your economic and non-economic damages are proportionally reduced. Modified comparative fault states (most states) allow recovery only if you were less than 50% or 51% at fault. Contributory negligence states (Alabama, Maryland, North Carolina, Virginia) bar all recovery if you were even 1% at fault. Insurance adjusters routinely claim plaintiff negligence — wearing inappropriate footwear, looking at a phone, ignoring warning signs. Never admit fault at the scene and consult a premises liability attorney before speaking to the insurance adjuster.",
  },
  {
    q: "Does property owner's insurance cover slip and fall injuries?",
    a: "Commercial property owners carry general liability insurance that covers slip and fall injuries. Homeowners insurance also typically covers premises liability for falls on residential property. The policy limits vary — retail stores and large commercial properties often carry $1–5 million in liability coverage, while residential homeowners policies typically have $100,000–$300,000. Without insurance, you can pursue the property owner's personal assets, but collection is much more difficult. Always determine available insurance coverage and consult a licensed attorney before deciding whether to pursue a premises liability claim — settlements are limited by available coverage.",
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
  name: 'Slip and Fall Settlement Calculator 2026',
  url: 'https://settlementcalculators.app/slip-fall',
  applicationCategory: 'LegalApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your Slip and Fall Settlement',
  step: [
    { '@type': 'HowToStep', name: 'Enter your economic damages', text: 'Enter your medical bills, future medical costs, lost wages, and future lost wages from your slip and fall injuries.' },
    { '@type': 'HowToStep', name: 'Select case details and state', text: 'Select your state, injury severity, location type, notice strength, and whether the hazard was documented. The calculator assesses your case strength (Strong/Moderate/Weak).' },
    { '@type': 'HowToStep', name: 'View your settlement estimate', text: 'See your slip and fall settlement range, pain and suffering estimate, attorney fees, medical lien deduction, and net payout after all deductions and fault reduction.' },
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

export default function SlipFallPage() {
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
              Slip and Fall Settlement Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Estimate your slip and fall premises liability settlement. Includes case strength assessment, comparative fault rules, and net payout after attorney fees and medical liens. All 50 states.
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
              <SlipFallCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222222" /></div>

          <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-200 mb-2">Slip and Fall Settlement Key Facts</h2>
            <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed">
              Slip and fall premises liability claims require proving the property owner knew or should have known about the hazardous condition. State comparative fault rules — pure comparative, modified comparative, or contributory negligence — determine how your own fault percentage affects recovery. Premises liability victims with a personal injury attorney receive significantly more compensation than unrepresented claimants. These calculators provide estimates for educational purposes only. Results are not legal advice and do not create an attorney-client relationship. Consult a licensed attorney in your state for an accurate case evaluation.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How Slip and Fall Settlements Are Calculated</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Slip and fall settlements are a form of premises liability claim — you must prove the property owner was negligent in maintaining safe conditions. Unlike car accidents where liability is often clear from the collision, slip and fall cases require establishing that the owner knew or should have known about the hazardous condition. This notice element is what insurance adjusters and defense attorneys attack most aggressively in premises liability negotiations.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Once liability is established, settlement value follows the same multiplier method used in other personal injury cases: economic damages (medical bills, lost wages, future medical costs) multiplied by an injury severity factor reflecting your pain and suffering. For slip and fall cases, multipliers typically range from 1.5x for minor soft tissue injuries to 8x for severe spinal injuries or traumatic brain injuries. Falls on commercial property with strong notice evidence — surveillance footage of a long-standing hazard, ignored maintenance complaints, prior incidents — can command higher multipliers because of increased jury risk for the defendant.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Attorney fees (33% pre-litigation contingency, 40% if litigation is filed) and medical liens (estimated 30% of medical bills, typically negotiated down) are deducted from the gross settlement. Your state&apos;s comparative fault rule then reduces the net figure by your percentage of fault. States using contributory negligence (Alabama, Maryland, North Carolina, Virginia) bar all recovery if you bear any fault at all — making attorney representation especially critical in those states.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Location type significantly affects settlement value beyond the basic damages. Commercial property owners (grocery stores, retailers, restaurants) carry larger liability insurance policies and face greater reputational risk than residential property owners. Government property falls require strict procedural compliance, including notice filings within 60–180 days. Private residential falls depend heavily on available homeowners insurance coverage — typically $100,000–$300,000 in personal liability coverage.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: Slip and Fall Settlement</h2>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Sandra slipped on an unmarked wet floor at a Texas grocery store. She fractured her wrist requiring surgery. Medical bills: $28,000. Six weeks lost wages: $5,200. Store surveillance showed the spill was present for 30 minutes before her fall — establishing strong constructive notice. Sandra was 0% at fault. Texas uses modified comparative fault (51% bar).
              </p>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4 font-mono bg-white/60 dark:bg-black/20 rounded-xl px-4 py-3">
                <div>Special damages (economic): $28,000 + $5,200 = $33,200</div>
                <div>Pain &amp; suffering (3x–5x, moderate injury): $99,600 – $166,000</div>
                <div>Gross settlement: $132,800 – $199,200</div>
                <div>Attorney fees (33% contingency): −$43,824 – −$65,736</div>
                <div>Medical lien (30% of bills): −$8,400</div>
                <div>Fault reduction (0%): $0</div>
                <div className="font-bold pt-1">NET TO SANDRA: ~$80,576 – $125,064</div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                The 30-minute surveillance evidence strongly supports the &quot;owner knew or should have known&quot; element of premises liability, making this a strong case with clear notice. The grocery chain&apos;s insurance carrier would face significant jury trial risk given documented evidence of negligence, motivating a settlement in the $75,000–$120,000 net range. Sandra should consult a licensed attorney before accepting any settlement offer from the insurance adjuster.
              </p>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors That Affect Slip and Fall Settlement Value</h2>
            <ul className="space-y-5">
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Strength of notice evidence</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">The single most important factor in slip and fall liability is proof that the property owner knew or should have known about the hazard. Surveillance footage, maintenance logs, prior complaints, and inspection records directly establish notice and can transform a weak case into a strong one. Without notice evidence, even severe injuries may not produce significant settlements.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Injury severity and documentation</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Objective injury evidence — fracture X-rays, MRI findings, surgical records, physical therapy records — dramatically increases settlement value compared to soft tissue complaints without imaging. Document all treatment from the date of the fall through maximum medical improvement. Never settle a slip and fall claim before you have reached MMI and know the full extent of your injuries and any permanent impairment.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">State comparative fault rule</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Your state&apos;s negligence standard determines whether your own fault percentage bars or reduces recovery. In contributory negligence states, the defendant&apos;s insurance adjuster will aggressively look for any plaintiff fault — inappropriate footwear, distracted walking, ignoring warning signs — to eliminate your recovery entirely. Having a premises liability attorney is especially important in contributory negligence states.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Available insurance coverage</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Your practical recovery ceiling is determined by available insurance. Commercial properties typically carry $1–5 million in general liability coverage. Residential homeowners policies carry $100,000–$300,000. Without insurance, pursuing personal assets of a property owner is difficult. Identifying all available coverage — including umbrella policies and multiple defendant theories — is one of the first steps a premises liability attorney will take.</p>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <AffiliateCTA headline="Get a Free Slip & Fall Case Review" />
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Slip and Fall Settlements by State</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              State law — fault rules, statutes of limitations, and premises liability standards — significantly affects slip and fall settlement values. Select your state for a calculator pre-set with your state&apos;s specific rules.
            </p>
            <div className="flex flex-wrap gap-2">
              {STATE_LINKS.map(({ slug, name }) => (
                <a
                  key={slug}
                  href={`/${slug}-slip-fall-settlement`}
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
