import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import DogBiteCalculatorWrapper from '@/components/DogBiteCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'
import AffiliateCTA from '@/components/AffiliateCTA'

export const metadata: Metadata = {
  title: 'Dog Bite Settlement Calculator 2026 — Strict Liability by State',
  description:
    'Estimate your dog bite settlement. Average dog bite claim is $64,555 nationally. Strict liability vs one-bite rule by state. Includes scarring, child victims, and homeowners insurance. 2026.',
  alternates: { canonical: 'https://settlementcalculators.app/dog-bite' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'How much is a dog bite claim worth?',
    a: 'Dog bite claims average $64,555 nationally (Insurance Information Institute 2024), but values vary widely by injury severity, scarring, and state law. Minor puncture bites with minimal scarring may settle for $10,000–$25,000. Multiple bites or moderate injuries typically settle for $25,000–$75,000. Severe bites causing significant facial disfigurement, nerve damage, or permanent scarring can settle for $100,000–$500,000 or more. Child victims generally receive higher settlements than adults for comparable injuries because they face more years of living with scars, and juries are particularly sympathetic to child plaintiffs. Consult a licensed personal injury attorney immediately after a dog bite — strict liability laws in most states make these cases valuable, but insurance adjusters still minimize payments to unrepresented claimants.',
  },
  {
    q: 'What is strict liability for dog bites?',
    a: 'In strict liability states, the dog owner is liable for bite injuries regardless of whether they knew the dog was dangerous or had previously bitten anyone. You do not need to prove the dog had shown prior aggressive behavior. Most states have enacted strict liability dog bite statutes, including California, Florida, Illinois, New York, Texas, and others. In strict liability states, liability is rarely disputed — the only question is the amount of damages. This makes dog bite cases in strict liability states more straightforward and more likely to result in significant settlements. The owner cannot escape liability by claiming the dog had never bitten before or had never shown aggressive tendencies.',
  },
  {
    q: 'What is the one-bite rule for dog bites?',
    a: "In one-bite rule states, the dog owner is only liable if they knew or had reason to know the dog was dangerous — typically established by evidence of a prior bite, demonstrated aggressive behavior (growling, lunging, attempted bites), or the owner's own statements about the dog's temperament. States using the one-bite rule include Arkansas, Mississippi, North Dakota, Nevada, and others. Even in one-bite rule states, prior knowledge can be established through evidence of prior aggressive incidents, 'beware of dog' signs (which demonstrate owner awareness of danger), breed reputation arguments, and neighbor testimony about the dog's behavior. A personal injury attorney familiar with your state's dog bite law can evaluate the evidence for establishing prior knowledge.",
  },
  {
    q: 'Does homeowners insurance cover dog bites?',
    a: "Yes — homeowners and renters insurance typically covers dog bite liability as part of personal liability coverage. Most homeowners policies include $100,000–$300,000 in liability coverage that pays for dog bite injuries on or off the owner's property. Some insurers exclude certain breeds (pit bulls, Rottweilers, German Shepherds, Dobermans) from coverage or charge significantly higher premiums. Umbrella insurance policies add $1–5 million in additional liability coverage. If the dog owner has no homeowners insurance or the policy excludes their breed, recovery depends on the owner's personal assets, which can be difficult to collect. Determining available insurance coverage is one of the first things your personal injury attorney will investigate.",
  },
  {
    q: 'What should I do immediately after a dog bite?',
    a: "After a dog bite: (1) Seek medical attention immediately — dog bites carry serious infection risks including rabies, tetanus, and MRSA, and same-day medical records documenting the injuries are critical to your personal injury claim; (2) Photograph your injuries before treatment if possible, and photograph the scene where the bite occurred; (3) Get the dog owner's contact information and homeowners or renters insurance information; (4) Report the bite to local animal control and get the report number; (5) Get the names and contact information of any witnesses; (6) Request the dog's vaccination records; (7) Preserve torn clothing as evidence; (8) Contact a personal injury attorney before providing any recorded statement to the dog owner's insurance company — insurance adjusters are trained to minimize or deny dog bite claims.",
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
  name: 'Dog Bite Settlement Calculator 2026',
  url: 'https://settlementcalculators.app/dog-bite',
  applicationCategory: 'LegalApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your Dog Bite Settlement',
  step: [
    { '@type': 'HowToStep', name: 'Enter your medical bills and lost wages', text: 'Enter your medical bills from the dog bite (ER, wound care, plastic surgery, rabies treatment), lost wages, and any future medical costs for scar revision surgery.' },
    { '@type': 'HowToStep', name: 'Select injury severity, state, and victim type', text: 'Choose bite severity (minor, multiple, severe, or child victim), your state (determines strict liability or one-bite rule), and whether you have significant scarring.' },
    { '@type': 'HowToStep', name: 'View your dog bite settlement estimate', text: 'See your estimated dog bite settlement range including pain and suffering, attorney fees (33% contingency), and net payout. The calculator flags strict liability states where liability is rarely disputed.' },
  ],
}

const trustSignals = ['⚖️ 2026 Updated', '🔒 Private', '⚡ Instant', '✓ Free']

export default function DogBitePage() {
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
              Dog Bite Settlement Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Estimate your dog bite settlement. Average dog bite claim: $64,555 nationally. Strict liability vs one-bite rule by state. Includes scarring multipliers, child victim premiums, and homeowners insurance analysis.
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
              <DogBiteCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222222" /></div>

          <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-200 mb-2">Dog Bite Settlement Key Facts</h2>
            <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed">
              Dog bites average $64,555 per claim nationally (Insurance Information Institute 2024). Most states impose strict liability on dog owners — meaning you do not need to prove the dog was previously dangerous. Homeowners and renters insurance typically covers dog bite liability. Facial scars and child victims command significantly higher multipliers. These calculators provide estimates for educational purposes only. Results are not legal advice and do not create an attorney-client relationship. Consult a licensed personal injury attorney in your state immediately — evidence must be preserved quickly and insurance adjusters are trained to minimize dog bite claims.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How Dog Bite Settlements Work</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Dog bite claims are governed primarily by state statute, with most states imposing strict liability on dog owners. In strict liability states — California, Florida, Illinois, New York, Texas, and most others — you need only prove the bite occurred, you were lawfully present at the location, and you suffered injuries. The owner cannot escape liability by claiming the dog had never bitten before or had no history of aggression. This makes dog bite cases in strict liability states among the most straightforward personal injury claims from a liability standpoint, though insurance adjusters still work to minimize payouts.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Settlement values are calculated using the same multiplier methodology as other personal injury claims: special economic damages (medical bills, lost wages, future medical costs including scar revision surgeries) multiplied by a factor reflecting pain and suffering severity. Dog bite pain and suffering multipliers typically range from 1.5x for minor puncture bites to 10x for severe maulings causing permanent disfigurement, nerve damage, or psychological trauma. The multiplier is significantly increased by scarring — particularly facial scarring — because of its lifelong visible impact.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The severity of scarring is the single biggest factor affecting dog bite settlement values beyond basic medical and economic damages. Facial scars on children dramatically increase pain and suffering multipliers because juries and insurance adjusters understand the lifelong psychological and social impact of visible disfigurement. Plastic surgery costs, multiple revision surgeries, and psychological treatment for PTSD after severe attacks are all fully compensable economic damages. Expert testimony from plastic surgeons on the permanent nature of scarring and future surgical needs adds significant value to severe dog bite claims.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Child victims receive higher settlements for equivalent injuries for several reasons: they face more years of living with physical and psychological consequences; courts require additional scrutiny of child settlements to ensure the child&apos;s interests are protected; developmental and psychological impacts are more severe in children; and future medical costs (scar revision surgeries, psychological treatment through childhood and adolescence) are larger. Minor child settlements typically require court approval through a petition to the court, and settlement funds are often placed in a protected account until the child reaches adulthood.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: Dog Bite Settlement</h2>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Emma, age 7, was bitten by a neighbor&apos;s Rottweiler in California (strict liability state). The dog bit her face, requiring emergency wound closure and two subsequent plastic surgery procedures. Medical bills: $22,000. Future scar revision surgery: $15,000. No lost wages (child victim). Homeowners insurance policy limit: $300,000.
              </p>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4 font-mono bg-white/60 dark:bg-black/20 rounded-xl px-4 py-3">
                <div>Economic special damages: $22,000 + $15,000 = $37,000</div>
                <div>Child victim + facial scarring multiplier (7x–10x): $259,000 – $370,000</div>
                <div>Gross settlement: $296,000 – $407,000</div>
                <div>Policy limit cap: $300,000 (insurer&apos;s maximum)</div>
                <div>Attorney fees (33% of $300,000): −$99,000</div>
                <div>Medical liens: −$6,600</div>
                <div className="font-bold pt-1">NET TO EMMA&apos;S TRUST: ~$194,400</div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                California&apos;s strict liability statute means liability is not disputed — the only question is the amount of Emma&apos;s damages. The homeowners insurer would be highly motivated to settle at or near their $300,000 policy limits given the strong liability facts and child victim. Emma&apos;s parents should pursue this claim through a licensed personal injury attorney — settlements for minor children require court approval and placement in a protected trust or annuity until Emma reaches adulthood. Do not accept any payment from the dog owner&apos;s insurer without legal representation.
              </p>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors That Affect Dog Bite Settlement Value</h2>
            <ul className="space-y-5">
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Strict liability vs. one-bite rule state</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Your state&apos;s dog bite liability standard is the foundation of your claim. In strict liability states, the owner is liable regardless of the dog&apos;s history. In one-bite rule states, you must establish prior knowledge of the dog&apos;s dangerous propensities — which requires evidence of prior bites, aggression reports, or signs the owner acknowledged the danger. Our calculator identifies your state&apos;s standard and adjusts the settlement estimate accordingly.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Severity and location of scarring</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Facial scars — especially on children — are the highest-value element in dog bite claims beyond severe physical injury. Insurance adjusters and juries understand that visible facial disfigurement is a permanent, lifelong consequence that affects self-image, social relationships, and professional opportunities. Cases with significant permanent facial scarring often settle at or near available policy limits regardless of the economic damages amount.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Available homeowners insurance coverage</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Most dog bite settlements are paid by the dog owner&apos;s homeowners or renters insurance. Policy limits are the practical ceiling for most cases. Standard homeowners policies carry $100,000–$300,000 in personal liability coverage. Umbrella policies add $1–5 million. If the owner has no insurance or their breed is excluded, recovery requires pursuing personal assets — which is much more difficult and time-consuming.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Psychological impact and PTSD</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Severe dog attacks often cause post-traumatic stress disorder, particularly in children. Fear of dogs, nightmares, anxiety, and avoidance behaviors documented by a licensed psychologist or psychiatrist add significant non-economic damage value to dog bite claims. Treatment records, psychological evaluations, and expert testimony on the prognosis for full psychological recovery all support higher settlements.</p>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <AffiliateCTA headline="Get a Free Dog Bite Case Review" />
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
