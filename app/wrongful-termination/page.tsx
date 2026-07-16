import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import WrongfulTerminationCalculatorWrapper from '@/components/WrongfulTerminationCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'
import AffiliateCTA from '@/components/AffiliateCTA'

export const metadata: Metadata = {
  title: 'Wrongful Termination Settlement Calculator 2026',
  description:
    'Estimate your wrongful termination settlement including back pay, front pay, emotional distress, and punitive damages. Federal caps by company size. Free 2026 calculator for all 50 states.',
  alternates: { canonical: 'https://settlementcalculators.app/wrongful-termination' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'What qualifies as wrongful termination?',
    a: 'Wrongful termination occurs when an employer fires an employee for an illegal reason. This includes: firing based on protected characteristics (race, sex, age, disability, national origin, religion, pregnancy); retaliation for whistleblowing, filing a workers comp claim, or reporting OSHA violations; termination that violates an employment contract or collective bargaining agreement; firing for exercising a legal right (jury duty, military leave under USERRA, FMLA leave); and violations of implied contracts or good faith covenants. Most employees are at-will, meaning they can be fired for any reason except an illegal one. Consult an employment attorney to evaluate whether your termination was wrongful.',
  },
  {
    q: 'How much can I recover in a wrongful termination case?',
    a: 'Wrongful termination settlements typically include back pay (wages lost from termination to settlement), front pay (projected future lost wages), compensatory damages (emotional distress, job search costs), and sometimes punitive damages. Under Title VII and the ADA, combined compensatory and punitive damages are capped by company size: $50,000 for employers with 15–100 employees; $100,000 for 101–200 employees; $200,000 for 201–500 employees; and $300,000 for employers with 500+ employees. These caps do not apply to back pay, front pay, ADEA claims, or Title VII equal pay claims. Average wrongful termination settlements range from $50,000 to $250,000, with discrimination cases involving large employers often settling higher.',
  },
  {
    q: 'How long do I have to file a wrongful termination claim?',
    a: 'Deadlines vary by claim type and are strictly enforced. For federal discrimination claims under Title VII, ADA, or ADEA, you must file a charge with the EEOC within 180 days (or 300 days in states with their own anti-discrimination agencies) before you can sue — do not wait. Retaliation claims often have separate filing deadlines. State law wrongful termination claims may have 2–3 year statutes of limitations. WARN Act claims (mass layoffs) have specific notice requirements. If you believe you were wrongfully terminated, consult an employment attorney immediately to protect your deadlines.',
  },
  {
    q: 'Do I have to mitigate my wrongful termination damages?',
    a: 'Yes — you have a legal duty to mitigate (minimize) your damages by making reasonable efforts to find comparable employment. This means actively job searching and accepting comparable job offers. If you unreasonably refuse a comparable job or fail to look for work, the amount you could have earned will be deducted from your back pay award. Courts look at the reasonableness of your job search efforts, whether comparable jobs were available, and whether you turned down offers. Documenting your job search efforts throughout the process is important. However, you are not required to accept a job below your skill level or in a different field.',
  },
  {
    q: 'Should I hire an employment attorney for wrongful termination?',
    a: 'Yes — employment law is complex, with strict procedural deadlines (especially EEOC filing requirements) and overlapping federal and state protections. An employment attorney will evaluate which laws apply, identify all viable theories of recovery, handle EEOC charges and state agency filings, gather evidence (personnel files, performance reviews, comparator data), calculate all available damages, and negotiate with the employer\'s legal team. Most employment attorneys handle wrongful termination cases on contingency (no fee unless you win) or on an hourly basis depending on the case strength. Many offer free initial consultations. Consult an attorney before speaking to HR or your employer\'s legal team.',
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
  name: 'Wrongful Termination Settlement Calculator 2026',
  url: 'https://settlementcalculators.app/wrongful-termination',
  applicationCategory: 'LegalApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your Wrongful Termination Settlement',
  step: [
    { '@type': 'HowToStep', name: 'Enter termination details', text: 'Enter your annual salary, weeks of back pay owed, projected front pay period, and termination reason. Select your employer size for the correct federal damage cap.' },
    { '@type': 'HowToStep', name: 'Select claim type and damages', text: 'Choose your termination reason (discrimination, retaliation, FMLA, contract breach, etc.). Toggle emotional distress and punitive damages if applicable.' },
    { '@type': 'HowToStep', name: 'View your settlement estimate', text: 'See your estimated wrongful termination settlement including back pay, front pay, compensatory damages, punitive damages, attorney fees, and net payout — with applicable federal caps.' },
  ],
}

const trustSignals = ['⚖️ 2026 Updated', '🔒 Private', '⚡ Instant', '✓ Free']

export default function WrongfulTerminationPage() {
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
              Wrongful Termination Settlement Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Estimate your wrongful termination settlement including back pay, front pay, emotional distress, and punitive damages. Federal caps by company size. All 50 states.
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
              <WrongfulTerminationCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222222" /></div>

          <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-200 mb-2">Wrongful Termination Key Facts</h2>
            <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed">
              Wrongful termination claims arise when an employer fires an employee for an illegal reason — discrimination, retaliation, or breach of contract. Under Title VII and the ADA, combined compensatory and punitive damages are capped at $300,000 for large employers. Back pay and front pay are uncapped. Average wrongful termination settlements range from $50,000 to $250,000. EEOC charges must be filed within 180–300 days of termination.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How Wrongful Termination Settlements Are Calculated</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Wrongful termination settlements are calculated by adding all available categories of damages: back pay, front pay, compensatory damages, and sometimes punitive damages. Each category has different calculation methods and legal limits.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Back pay represents the wages, benefits, and other compensation you lost from the date of termination to the date of judgment or settlement. It is calculated by multiplying your weekly or monthly compensation (including health insurance value, 401k contributions, and other benefits) by the number of pay periods since termination. Amounts you earned at a new job during this period are subtracted. Back pay is not subject to the federal damage caps and can represent the majority of recovery in cases with long pre-settlement timelines.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Front pay compensates for future lost earnings if reinstatement is not feasible — for example, if the working relationship has been too damaged, if the position no longer exists, or if a discrimination verdict would make return impossible. Courts calculate front pay based on your expected remaining career earnings minus what you can now expect to earn in comparable employment, discounted to present value. Front pay awards can be substantial in cases involving older employees or senior executives.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Compensatory damages cover emotional distress, damage to professional reputation, and out-of-pocket costs (therapy, job search expenses). Punitive damages punish particularly egregious employer conduct. Under Title VII and the ADA, combined compensatory and punitive damages are capped: $50,000 for employers with 15–100 employees; $100,000 for 101–200 employees; $200,000 for 201–500 employees; and $300,000 for 500+ employees. The ADEA (age discrimination) does not allow punitive damages but allows liquidated damages equal to back pay for willful violations.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: Wrongful Termination Settlement</h2>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Jennifer, 52, was fired after 15 years by a Fortune 500 company one week after she filed an age discrimination complaint internally. Annual salary: $95,000 plus $18,000 in benefits. The case settled 18 months after termination. Employer has 2,000 employees.
              </p>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4 font-mono bg-white/60 dark:bg-black/20 rounded-xl px-4 py-3">
                <div>Back pay (18 months × $9,417/month): $169,500</div>
                <div>Benefits back pay (18 months × $1,500/month): $27,000</div>
                <div>Front pay (5 years projected): $285,000</div>
                <div>Emotional distress (at cap for 500+ employees): $300,000</div>
                <div>Gross before fees: $781,500</div>
                <div>Attorney fees (33% contingency): −$257,895</div>
                <div className="font-bold pt-1">NET TO JENNIFER: ~$523,605</div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Jennifer&apos;s case is strong because of the direct temporal connection between her internal complaint and her termination (classic retaliation pattern), her 15-year tenure, and the employer&apos;s size (500+ cap applies). The ADEA claim allows liquidated damages equal to back pay for willful violations — adding another $169,500. This case has significant settlement value above $500,000 before trial risk is applied.
              </p>
            </div>
          </div>

          <div className="mb-6">
            <AffiliateCTA headline="Get a Free Wrongful Termination Case Review" />
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
