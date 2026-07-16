import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import DogBiteCalculatorWrapper from '@/components/DogBiteCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'
import AffiliateCTA from '@/components/AffiliateCTA'

export const metadata: Metadata = {
  title: 'Dog Bite Settlement Calculator 2026',
  description: 'Estimate your dog bite settlement value. Free 2026 calculator with strict liability vs one-bite rule by state. Average dog bite settlement is $64,555 nationally.',
  alternates: { canonical: 'https://settlementcalculators.app/dog-bite' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  { q: 'How much is a dog bite claim worth?', a: 'Dog bite settlements average $64,555 nationally (Insurance Information Institute 2024), but values vary widely. Minor puncture bites with minimal scarring may settle for $10,000–$25,000. Multiple bites or moderate injuries settle for $25,000–$75,000. Severe bites causing significant disfigurement can settle for $100,000–$500,000 or more. Child victims generally receive higher settlements due to the physical and psychological impact. Cases involving facial scarring that requires plastic surgery are among the highest-value dog bite claims because juries respond strongly to visible, permanent disfigurement.' },
  { q: 'What is strict liability for dog bites?', a: 'In strict liability states, the dog owner is liable for bite injuries regardless of whether they knew the dog was dangerous. You do not need to prove the dog had previously bitten someone or shown aggressive behavior. Most states (including California, Florida, Illinois, and New York) have strict liability dog bite statutes. This makes proving your case much easier — you simply need to show the bite occurred, you were lawfully on the property, and you suffered damages. Strict liability significantly increases settlement values because liability is rarely disputed.' },
  { q: "What is the one bite rule?", a: "In one-bite rule states, the dog owner is only liable if they knew or had reason to know the dog was dangerous — typically established by a prior bite, aggressive behavior, or the owner's own statements about the dog's temperament. States using the one-bite rule include Arkansas, Mississippi, North Dakota, Nevada, and others. Even in one-bite states, you can establish prior knowledge through evidence of prior aggression, a guard dog designation, 'beware of dog' signs (which can show awareness of danger), and neighbor testimony about the dog's behavior. A personal injury attorney can evaluate which evidence supports your case." },
  { q: "Does homeowners insurance cover dog bites?", a: "Yes — homeowners and renters insurance typically covers dog bite liability. Most policies include $100,000–$300,000 in personal liability coverage that pays for dog bite injuries regardless of where the bite occurs (on or off the owner's property). Some insurers exclude certain breeds (pit bulls, Rottweilers, German Shepherds) or charge higher premiums. Umbrella policies add additional coverage. Without homeowners insurance, recovery depends on the owner's personal assets. When evaluating a dog bite claim, determining available insurance coverage is one of the first steps your attorney will take." },
  { q: 'What should I do immediately after a dog bite?', a: 'After a dog bite: (1) Seek medical attention immediately — dog bites carry serious infection risks including rabies and tetanus, and medical records documenting the injuries from day one are critical for your claim; (2) Photograph your injuries before treatment if possible, and photograph the scene where the bite occurred; (3) Get the dog owner\'s contact and insurance information; (4) Report the bite to local animal control; (5) Get witness contact information; (6) Request the dog\'s vaccination records from the owner; (7) Preserve any torn clothing; (8) Contact a personal injury attorney before speaking to the owner\'s insurance company.' },
]

const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const webAppSchema = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Dog Bite Settlement Calculator 2026', url: 'https://settlementcalculators.app/dog-bite', applicationCategory: 'LegalApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }
const trustSignals = ['⚖️ 2026 Updated', '🔒 Private', '⚡ Instant', '✓ Free']

export default function DogBitePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema).replace(/</g, '\\u003c') }} />
      <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/herobgsc.webp')" }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 pb-10">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">Dog Bite Settlement Calculator 2026</h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">Estimate your dog bite settlement. Dog bites average $64,555 nationally. Includes strict liability vs one-bite rule by state, scarring multipliers, and homeowners insurance analysis.</p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">{trustSignals.map(t => <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>)}</div>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="1111111111" /></div>
          <div className="max-w-5xl mx-auto px-4"><div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden"><DogBiteCalculatorWrapper /></div></div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>
      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222222" /></div>
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How Dog Bite Settlements Work</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">Dog bite claims are governed by either strict liability statutes (most states) or the common law one-bite rule. In strict liability states, you need only prove the bite occurred, you were lawfully present, and you suffered injuries. In one-bite rule states, you must additionally prove the owner had prior knowledge of the dog&apos;s dangerous propensities.</p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">The severity of scarring is the single biggest factor affecting dog bite settlement values beyond the basic medical and economic damages. Facial scars, particularly on children, dramatically increase pain and suffering multipliers because juries and insurance adjusters understand the lifelong psychological and social impact. Plastic surgery costs, multiple revision surgeries, and psychological treatment for PTSD after severe attacks are all compensable damages.</p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Child victims generally receive higher settlements for comparable injuries because: (1) children face more scarring years ahead; (2) developmental and psychological impacts are more severe; (3) juries are particularly sympathetic to child victims; and (4) future medical costs (scar revision surgeries, psychological treatment) are larger for children. Child victims can file claims through a parent or guardian, and settlements for minors typically require court approval to protect the child&apos;s interests.</p>
          </div>
          <div className="mb-6"><AffiliateCTA headline="Get a Free Dog Bite Case Review" /></div>
          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333333" /></div>
        </div>
      </section>
      <Footer />
    </>
  )
}
