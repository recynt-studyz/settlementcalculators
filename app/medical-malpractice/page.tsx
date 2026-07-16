import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import MedicalMalpracticeCalculatorWrapper from '@/components/MedicalMalpracticeCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'
import AffiliateCTA from '@/components/AffiliateCTA'

export const metadata: Metadata = {
  title: 'Medical Malpractice Settlement Calculator 2026 — State Damage Caps',
  description:
    'Estimate your medical malpractice settlement with state-specific damage caps. Covers surgical errors, misdiagnosis, medication errors, and birth injuries. Free 2026 calculator all 50 states.',
  alternates: { canonical: 'https://settlementcalculators.app/medical-malpractice' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'How much are medical malpractice settlements worth?',
    a: 'Medical malpractice settlements vary enormously based on injury severity, state damage caps, and case complexity. The average paid malpractice claim nationally is approximately $350,000–$500,000, but this average includes many smaller cases that settle quickly. Severe permanent injuries — birth injuries causing lifelong disability, surgical errors causing paralysis or organ loss, misdiagnosis resulting in untreatable advanced cancer — can settle for $1–10 million or more. Many states cap non-economic damages (pain and suffering, emotional distress) in malpractice cases at $250,000–$750,000, which limits total recovery. Economic damages (medical bills, future medical costs, lost wages, lost earning capacity, future care costs) are never capped and often represent the largest portion of a severe malpractice award.',
  },
  {
    q: 'What do I need to prove medical malpractice?',
    a: 'Medical malpractice requires proving four elements: (1) duty — a doctor-patient relationship existed at the time of the negligent act; (2) breach — the healthcare provider deviated from the accepted standard of care for their specialty (what a reasonably competent provider in the same field would have done); (3) causation — the deviation directly caused your specific injury; and (4) damages — you suffered actual measurable harm. The standard of care element requires expert medical witnesses from the same specialty who can testify that the defendant\'s conduct fell below what a reasonable practitioner would have done. Expert witnesses are required in virtually all malpractice cases and cost $10,000–$50,000 each, making malpractice cases expensive to pursue. Consult a licensed medical malpractice attorney for a free case evaluation.',
  },
  {
    q: 'Does my state have a cap on malpractice damages?',
    a: 'Many states cap non-economic damages (pain and suffering, emotional distress, loss of consortium) in medical malpractice cases. Common cap amounts include $250,000 (Idaho, Montana, California for cases under MICRA), $350,000 (Nevada), $500,000 (Louisiana, Massachusetts), and $750,000 (Tennessee, Texas per defendant). Some states have total caps on all damages combined. States without caps on non-economic damages include New York, New Jersey, Florida (with some exceptions), Illinois, Oregon, and others. Economic damages — medical bills, future care costs, lost wages, lost earning capacity — are not capped in any state. Our calculator applies your state\'s cap when you select your state and flags when your non-economic damage estimate exceeds the applicable cap.',
  },
  {
    q: 'How long do I have to file a malpractice claim?',
    a: 'Medical malpractice statutes of limitations are often shorter than general personal injury limitations and frequently include unique rules. Most states allow 2–3 years from the date of malpractice, but many use a discovery rule — the clock starts when you knew or should have known about the malpractice (important for misdiagnosis cases). Some states impose an absolute statute of repose of 4–7 years that bars claims regardless of when discovered. Many states also require formal pre-suit notice to the defendant provider, giving them 60–90 days to respond before a lawsuit can be filed. Birth injury cases may allow claims until the child reaches adulthood plus the regular limitations period. Never delay — consult a licensed malpractice attorney immediately as these deadlines are strictly and irreversibly enforced.',
  },
  {
    q: 'How do I find a medical malpractice attorney?',
    a: 'Medical malpractice is a highly specialized practice requiring attorneys with medical knowledge, established expert witness networks, and the financial resources to advance $50,000–$250,000 in case costs (expert witnesses, medical record review, depositions) on contingency. Look for attorneys who specialize exclusively in medical malpractice — not general personal injury — with a track record of malpractice verdicts and settlements in your state. Be wary of attorneys who accept every case — reputable malpractice attorneys decline cases where liability or causation is not reasonably clear because of the high cost of litigation. Most malpractice attorneys offer free initial case evaluations and work on contingency (typically 33–40% of the settlement, higher than general PI because of the greater expense and risk). Our free case review service can connect you with a licensed medical malpractice attorney.',
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
  name: 'Medical Malpractice Settlement Calculator 2026',
  url: 'https://settlementcalculators.app/medical-malpractice',
  applicationCategory: 'LegalApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your Medical Malpractice Settlement',
  step: [
    { '@type': 'HowToStep', name: 'Enter your economic damages', text: 'Enter your medical bills to date, future medical and care costs, lost wages, and future lost earning capacity from the malpractice injury.' },
    { '@type': 'HowToStep', name: 'Select malpractice type, state, and severity', text: 'Choose your malpractice type (surgical error, misdiagnosis, medication error, birth injury, or anesthesia error) and select your state to apply the correct damage cap. Toggle permanent injury for higher multipliers.' },
    { '@type': 'HowToStep', name: 'View your malpractice settlement estimate', text: 'See your estimated gross settlement, non-economic damages (capped at your state limit if applicable), attorney fees (typically 40% for malpractice), and net payout.' },
  ],
}

const trustSignals = ['⚖️ 2026 Updated', '🔒 Private', '⚡ Instant', '✓ Free']

export default function MedicalMalpracticePage() {
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
              Medical Malpractice Settlement Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Estimate your medical malpractice settlement with state-specific damage caps. Covers surgical errors, misdiagnosis, medication errors, birth injuries, and anesthesia errors. All 50 states.
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
              <MedicalMalpracticeCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222222" /></div>

          <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-200 mb-2">Medical Malpractice Settlement Key Facts</h2>
            <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed">
              Medical malpractice requires proving a healthcare provider deviated from the accepted standard of care and that deviation caused your specific injury. Expert medical witnesses are required in virtually all malpractice cases. Many states cap non-economic damages (pain and suffering) at $250,000–$750,000 — economic damages are always uncapped. Malpractice attorney contingency fees are typically 40% due to the higher cost and risk of these cases. These calculators provide estimates for educational purposes only. Results are not legal advice and do not create an attorney-client relationship. Consult a licensed medical malpractice attorney in your state immediately — statutes of limitations are strictly enforced.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How Medical Malpractice Settlements Work</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Medical malpractice occurs when a healthcare provider — physician, surgeon, anesthesiologist, nurse, hospital, or other provider — deviates from the accepted standard of care for their specialty and that deviation causes patient injury. The standard of care is defined as what a reasonably competent provider in the same specialty would have done under similar circumstances. This standard is established by expert medical witnesses, making malpractice cases among the most complex and expensive personal injury claims to litigate.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Unlike car accidents where liability can be established through objective evidence (police reports, accident reconstruction), medical malpractice requires detailed medical expert analysis of treatment decisions, diagnostic reasoning, and surgical technique. Malpractice defense is also well-funded — hospitals and physicians carry malpractice insurance with experienced defense attorneys on retainer. Successful malpractice cases typically require a minimum of two to three expert witnesses (to establish standard of care, breach, and causation/damages), costing $50,000–$250,000 before trial.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Settlement values are built from two components: economic damages and non-economic damages. Economic damages include all quantifiable financial losses — past and future medical bills, future care costs (life care plans), lost wages, and lost earning capacity. These are uncapped in all states. Non-economic damages compensate for pain and suffering, emotional distress, and loss of enjoyment of life. Many states cap non-economic damages in malpractice cases specifically, though not in other personal injury cases. The calculator applies your state&apos;s applicable cap when you select your state.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Birth injury cases are among the most valuable malpractice claims because the plaintiff is a child with a lifetime of damages ahead: lifetime medical care, assistive technology, home modifications, lost earning capacity over a full career, and decades of pain and suffering. These cases routinely settle for $2–10 million and often require specialized pediatric neurologists, life care planners, and economic experts who calculate the present value of lifetime future costs.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: Medical Malpractice Settlement</h2>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Patricia, 45, underwent routine gallbladder surgery in Illinois. Her surgeon negligently nicked her bile duct — a known surgical complication that falls below the standard of care when caused by improper technique. She required two additional surgeries, developed bile duct stricture, and suffers permanent impairment. Medical bills: $145,000. Lost wages (6 months): $38,000. Future care estimated: $85,000. Illinois has no cap on non-economic damages in malpractice cases.
              </p>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4 font-mono bg-white/60 dark:bg-black/20 rounded-xl px-4 py-3">
                <div>Economic damages: $145,000 + $38,000 + $85,000 = $268,000</div>
                <div>Pain &amp; suffering multiplier (surgical, permanent): 5x–8x</div>
                <div>Non-economic damages: $1,340,000 – $2,144,000</div>
                <div>Gross settlement: $1,608,000 – $2,412,000</div>
                <div>No damage cap (Illinois)</div>
                <div>Attorney fees (40% malpractice contingency): −$643,200 – −$964,800</div>
                <div>Medical liens (30% of bills): −$43,500</div>
                <div className="font-bold pt-1">NET TO PATRICIA: ~$921,300 – $1,403,700</div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Patricia&apos;s case is strengthened by the permanent nature of her injury (bile duct stricture is lifelong), the clear causation link (bile duct injury during surgery), and Illinois having no non-economic damages cap. Her personal injury attorney would retain a hepatobiliary surgery expert to testify on the standard of care and a gastroenterologist for future care costs. This case would be expected to settle in the $800,000–$1.2 million net range. Consult a licensed medical malpractice attorney — do not attempt to negotiate a malpractice claim without legal representation.
              </p>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors That Affect Malpractice Settlement Value</h2>
            <ul className="space-y-5">
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">State damage cap</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Whether your state caps non-economic damages in malpractice cases — and at what level — directly determines maximum recovery. A $250,000 cap (as in California under MICRA, recently increased to $350,000 for non-death cases) versus no cap (as in New York or Illinois) can mean millions of dollars difference in the same injury scenario. Our calculator shows your state&apos;s cap and flags when your non-economic estimate exceeds it.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Permanence and severity of injury</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Permanent injuries command significantly higher multipliers than temporary ones. A surgical error causing permanent nerve damage, paralysis, loss of organ function, or cognitive impairment will produce pain and suffering multiples of 5x–10x special damages. Temporary injuries that fully resolve, even if caused by negligence, produce much lower settlements because future economic and non-economic damages are limited.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Clarity of standard-of-care breach</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Cases where the deviation from standard of care is clear and well-documented — wrong-site surgery, medication administered to the wrong patient, failure to diagnose a cancer that was clearly visible on imaging — settle at higher values because jury trial risk is higher for the defendant. Cases involving judgment calls or complex medical decisions that reasonable physicians disagree about are harder to prove and settle for less.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Defendant&apos;s insurance coverage and assets</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Practical recovery is limited by available malpractice insurance. Individual physicians typically carry $1–3 million per-occurrence coverage. Hospitals and health systems carry much larger policies — $10–50 million or more. Identifying all potentially liable defendants (the physician, the hospital, the surgical center, the nursing staff) expands the available coverage and negotiating leverage. Always sue all potentially liable parties to preserve your rights — you can settle with some while continuing against others.</p>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <AffiliateCTA headline="Get a Free Medical Malpractice Case Review" />
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
