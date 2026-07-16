import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import CarAccidentCalculatorWrapper from '@/components/CarAccidentCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'
import AffiliateCTA from '@/components/AffiliateCTA'

export const metadata: Metadata = {
  title: 'Car Accident Settlement Calculator 2026',
  description:
    'Estimate your car accident settlement value including medical bills, lost wages, pain and suffering, and property damage. Free 2026 calculator for all 50 states.',
  alternates: { canonical: 'https://settlementcalculators.app/car-accident' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'How much is my car accident claim worth?',
    a: 'Car accident claim values depend on your injury severity, medical bills, lost wages, and the available insurance coverage. Minor soft tissue injuries (whiplash, sprains) typically settle for $10,000–$35,000. Moderate injuries requiring surgery often settle for $50,000–$200,000. Severe injuries with permanent impairment can exceed $500,000. Property damage is handled separately from injury claims. Use our calculator with your actual damages for a personalized estimate — then consult a personal injury attorney for a professional evaluation.',
  },
  {
    q: 'What damages can I recover after a car accident?',
    a: 'Car accident victims can recover economic damages (medical bills, future medical costs, lost wages, lost earning capacity, vehicle repair, rental car costs) and non-economic damages (pain and suffering, emotional distress, loss of enjoyment of life). In cases of gross negligence or drunk driving, punitive damages may be available. Your state\'s comparative fault rule affects how your own fault percentage reduces your recovery — in contributory negligence states, any fault can bar all recovery.',
  },
  {
    q: 'Should I get an attorney for my car accident?',
    a: 'Yes — car accident victims who hire a personal injury attorney receive 3.5x more compensation on average than those who negotiate alone (Insurance Research Council 2024). Insurance adjusters work for the insurance company and are trained to minimize payouts. A car accident attorney works on contingency (no fee unless you win), gathers evidence, handles all communication with insurers, and ensures you don\'t accept a lowball offer before knowing your full damages. Call for a free case evaluation immediately after your accident.',
  },
  {
    q: 'How long do I have to file a car accident claim?',
    a: 'The statute of limitations for car accident injury claims varies by state — typically 2–3 years from the accident date, though some states allow as little as 1 year (Tennessee, Kentucky, Louisiana) or as many as 6 years (Maine, North Dakota). Claims against government vehicles or road defects may require formal notice within 60–180 days. Property damage claims may have different deadlines. Do not rely on these general rules — confirm your state\'s specific deadline with a car accident attorney as soon as possible.',
  },
  {
    q: 'What if the other driver was uninsured?',
    a: 'If the at-fault driver has no insurance, your own uninsured motorist (UM) coverage may pay your damages up to your policy limits. If they have insufficient insurance, your underinsured motorist (UIM) coverage bridges the gap. Without UM/UIM coverage, you may need to sue the driver personally — but collecting against an uninsured driver can be very difficult. You can also check if the accident occurred in a state with uninsured motorist fund programs. Always carry UM/UIM coverage — it is often inexpensive and essential protection.',
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
  name: 'Car Accident Settlement Calculator 2026',
  url: 'https://settlementcalculators.app/car-accident',
  applicationCategory: 'LegalApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your Car Accident Settlement',
  step: [
    { '@type': 'HowToStep', name: 'Enter injury damages', text: 'Enter medical bills, future medical costs, lost wages, and future lost wages from your car accident injuries.' },
    { '@type': 'HowToStep', name: 'Enter vehicle and property damages', text: 'Enter vehicle repair costs and rental car expenses. Note rideshare or commercial vehicle involvement for higher liability limits.' },
    { '@type': 'HowToStep', name: 'View injury claim and property damage estimates', text: 'See your car accident settlement range, property damage claim, attorney fees, and net payout. Compare multiplier and per diem calculation methods.' },
  ],
}

const trustSignals = ['⚖️ 2026 Updated', '🔒 Private', '⚡ Instant', '✓ Free']

export default function CarAccidentPage() {
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
              Car Accident Settlement Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Estimate your car accident settlement including injury damages, vehicle damage, and pain and suffering. Covers rideshare, commercial vehicles, and UM/UIM claims. All 50 states.
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
              <CarAccidentCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222222" /></div>

          <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-200 mb-2">Car Accident Settlement Key Facts</h2>
            <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed">
              Car accident claims involve two separate recoveries: a property damage claim (vehicle repair, rental car) settled with the property damage adjuster, and a personal injury claim (medical bills, lost wages, pain and suffering) negotiated with the liability adjuster. Car accident victims with an attorney receive 3.5x more compensation on average than unrepresented claimants (Insurance Research Council 2024). Rideshare and commercial vehicles carry significantly higher insurance limits.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How Car Accident Settlements Work</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Car accident settlements are negotiated with the at-fault driver&apos;s liability insurance company. The insurer&apos;s goal is to close your claim for as little as possible. Your goal is to be fully compensated for all economic damages (medical bills, lost wages, vehicle damage) and non-economic damages (pain and suffering, emotional distress, loss of enjoyment of life).
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The injury claim and property damage claim are handled separately. Property damage is typically resolved quickly — the insurer either pays to repair your vehicle or pays its pre-accident market value (actual cash value) if totaled. The injury claim takes longer because you should not settle until you have reached maximum medical improvement (MMI) and know the full extent of your injuries and long-term prognosis.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Special situations increase available coverage dramatically. Rideshare vehicles (Uber, Lyft) carry $1 million in liability coverage when a driver is actively transporting passengers. Commercial vehicles (delivery trucks, semi-trucks, company vehicles) are required by federal regulations to carry $750,000 to $5 million in liability coverage depending on cargo type. These higher limits can dramatically increase your practical recovery.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: Car Accident Settlement</h2>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                David was T-boned by a driver who ran a red light in Florida. Medical bills: $32,000 (back surgery). Lost wages: $12,000 (8 weeks out). Vehicle damage: $15,000. Injury classified as moderate-to-severe. At-fault driver had $100,000 policy limits.
              </p>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4 font-mono bg-white/60 dark:bg-black/20 rounded-xl px-4 py-3">
                <div>Injury special damages: $32,000 + $12,000 = $44,000</div>
                <div>Pain & suffering (4x–7x): $176,000 – $308,000</div>
                <div>Gross injury claim: $220,000 – $352,000</div>
                <div>Policy limit: $100,000 (injury claim capped here)</div>
                <div>Attorney fees (33%): −$33,000</div>
                <div>Medical lien: −$9,600</div>
                <div className="font-bold pt-1">NET FROM INJURY CLAIM: ~$57,400</div>
                <div className="pt-1">Property damage (separate): $15,000</div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                David&apos;s injury damages exceed the $100,000 policy limit. His attorney would pursue the policy limits plus investigate whether David has UIM coverage to recover additional amounts. Florida uses modified comparative fault (51% bar) — since David was not at fault, his full recovery applies against the policy limit.
              </p>
            </div>
          </div>

          <div className="mb-6">
            <AffiliateCTA headline="Get a Free Car Accident Case Review" />
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>


          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Car Accident Settlement Calculator by State</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Each state has different fault rules, insurance minimums, and statutes of limitations that affect car accident settlement values. Select your state for a calculator pre-set with your state&apos;s specific laws.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                {slug:'alabama',name:'Alabama'},{slug:'alaska',name:'Alaska'},{slug:'arizona',name:'Arizona'},{slug:'arkansas',name:'Arkansas'},
                {slug:'california',name:'California'},{slug:'colorado',name:'Colorado'},{slug:'connecticut',name:'Connecticut'},{slug:'delaware',name:'Delaware'},
                {slug:'florida',name:'Florida'},{slug:'georgia',name:'Georgia'},{slug:'hawaii',name:'Hawaii'},{slug:'idaho',name:'Idaho'},
                {slug:'illinois',name:'Illinois'},{slug:'indiana',name:'Indiana'},{slug:'iowa',name:'Iowa'},{slug:'kansas',name:'Kansas'},
                {slug:'kentucky',name:'Kentucky'},{slug:'louisiana',name:'Louisiana'},{slug:'maine',name:'Maine'},{slug:'maryland',name:'Maryland'},
                {slug:'massachusetts',name:'Massachusetts'},{slug:'michigan',name:'Michigan'},{slug:'minnesota',name:'Minnesota'},{slug:'mississippi',name:'Mississippi'},
                {slug:'missouri',name:'Missouri'},{slug:'montana',name:'Montana'},{slug:'nebraska',name:'Nebraska'},{slug:'nevada',name:'Nevada'},
                {slug:'new-hampshire',name:'New Hampshire'},{slug:'new-jersey',name:'New Jersey'},{slug:'new-mexico',name:'New Mexico'},{slug:'new-york',name:'New York'},
                {slug:'north-carolina',name:'North Carolina'},{slug:'north-dakota',name:'North Dakota'},{slug:'ohio',name:'Ohio'},{slug:'oklahoma',name:'Oklahoma'},
                {slug:'oregon',name:'Oregon'},{slug:'pennsylvania',name:'Pennsylvania'},{slug:'rhode-island',name:'Rhode Island'},{slug:'south-carolina',name:'South Carolina'},
                {slug:'south-dakota',name:'South Dakota'},{slug:'tennessee',name:'Tennessee'},{slug:'texas',name:'Texas'},{slug:'utah',name:'Utah'},
                {slug:'vermont',name:'Vermont'},{slug:'virginia',name:'Virginia'},{slug:'washington',name:'Washington'},{slug:'west-virginia',name:'West Virginia'},
                {slug:'wisconsin',name:'Wisconsin'},{slug:'wyoming',name:'Wyoming'},
              ].map(({slug, name}) => (
                <a key={slug} href={`/${slug}-car-accident-settlement`}
                  className="text-xs px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-[#1e293b] hover:text-white hover:border-[#1e293b] transition-colors">
                  {name}
                </a>
              ))}
            </div>
          </div>

          <div className="pb-6"><AdBanner slot="3333333333" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
