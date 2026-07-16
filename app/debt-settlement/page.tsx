import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import DebtSettlementCalculatorWrapper from '@/components/DebtSettlementCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'
import AffiliateCTA from '@/components/AffiliateCTA'

export const metadata: Metadata = {
  title: 'Debt Settlement Calculator 2026 — Estimate Your Payoff Amount',
  description:
    'Estimate how much you can settle your debt for, potential tax liability on forgiven debt, and credit score impact. Free 2026 debt settlement calculator for credit cards, medical bills, and personal loans.',
  alternates: { canonical: 'https://settlementcalculators.app/debt-settlement' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'How much can I settle my debt for?',
    a: 'The amount you can settle debt for depends on the type of debt, how long it has been delinquent, and the creditor. Credit card debt typically settles for 40–60% of the original balance — meaning a $20,000 balance might settle for $8,000–$12,000. Medical debt often settles for even less (30–50%) because hospitals have more flexibility. Personal loans settle for 40–60%. The longer the debt has been delinquent, the more motivated the creditor is to settle — accounts that have been delinquent 6+ months and sold to debt collectors often settle for 25–40 cents on the dollar. Debt settlement companies typically negotiate 30–50% reductions after their fees, but their fees (15–25% of enrolled debt) reduce the net benefit.',
  },
  {
    q: 'Does debt settlement hurt my credit score?',
    a: 'Yes — debt settlement significantly damages your credit score. The damage typically occurs in stages: stopping payments (required for negotiation) causes immediate score drops of 50–100 points or more; the settlement itself is reported as "settled for less than the full amount," which stays on your credit report for 7 years; the delinquency marks from missed payments also remain for 7 years. Most people who pursue debt settlement see credit score drops of 100–150 points, with recovery taking 4–7 years. By contrast, Chapter 7 bankruptcy stays on your report for 10 years but may allow faster score recovery because all discharged debts are resolved at once. If protecting your credit score is a priority, debt settlement is not the right choice.',
  },
  {
    q: 'Is forgiven debt taxable?',
    a: 'Generally, yes — the IRS treats forgiven debt as taxable income. If you settle a $20,000 debt for $8,000, the forgiven $12,000 is reported to the IRS on Form 1099-C and added to your taxable income. At a 22% marginal rate, this creates a $2,640 unexpected tax bill. There are important exceptions: if you are insolvent (your total liabilities exceed total assets) at the time of settlement, you can exclude the forgiven amount from income using IRS Form 982. Bankruptcy discharge also exempts forgiven debt from taxation. Consult a tax professional before finalizing any debt settlement, especially for large balances.',
  },
  {
    q: 'What are the alternatives to debt settlement?',
    a: 'Debt settlement is not right for everyone. Alternatives include: (1) Debt management plans (DMPs) through nonprofit credit counseling agencies — lower interest rates without credit damage; (2) Balance transfer to a 0% APR card for qualified borrowers; (3) Personal debt consolidation loan at lower interest rate; (4) Negotiating directly with creditors for hardship programs or extended payment plans; (5) Chapter 7 bankruptcy — eliminates most unsecured debt faster, with less total cost in many cases, though with a 10-year credit report mark; (6) Chapter 13 bankruptcy — repayment plan over 3–5 years, keeps assets, reorganizes all debts. If you qualify for bankruptcy, it often provides a faster, cleaner resolution than debt settlement.',
  },
  {
    q: 'Should I use a debt settlement company?',
    a: 'Debt settlement companies charge 15–25% of enrolled debt in fees, which significantly erodes the benefit of settlement. For example, a company charging 20% fees on a $30,000 enrolled debt collects $6,000 in fees — even if they settle for 50 cents on the dollar ($15,000), your total cost is $21,000 versus the original $30,000. You can often negotiate directly with creditors or debt collectors yourself. However, debt settlement companies have established relationships with major creditors and collection agencies, handle all communications, and provide expertise — which has value for people who find the process overwhelming. If you choose a debt settlement company, use a nonprofit or a company accredited by the American Fair Credit Council (AFCC) and avoid upfront fees.',
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
  name: 'Debt Settlement Calculator 2026',
  url: 'https://settlementcalculators.app/debt-settlement',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your Debt Settlement Amount',
  step: [
    { '@type': 'HowToStep', name: 'Enter your debt details', text: 'Enter your total debt balance, debt type (credit card, medical, personal loan, or mixed), and how long the debt has been delinquent.' },
    { '@type': 'HowToStep', name: 'Enter income and tax information', text: 'Enter your estimated monthly income to calculate the tax liability on any forgiven debt amount.' },
    { '@type': 'HowToStep', name: 'View your settlement estimate', text: 'See your estimated settlement range, potential savings, tax liability on forgiven debt, credit score impact, and alternative options comparison.' },
  ],
}

const trustSignals = ['⚖️ 2026 Updated', '🔒 Private', '⚡ Instant', '✓ Free']

export default function DebtSettlementPage() {
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
              Debt Settlement Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Estimate how much you can settle your debt for, potential tax liability on forgiven debt, and credit score impact. Covers credit cards, medical bills, and personal loans.
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
              <DebtSettlementCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222222" /></div>

          <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-200 mb-2">Debt Settlement Key Facts</h2>
            <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed">
              Credit card debt typically settles for 40–60 cents on the dollar. Medical debt often settles for 30–50%. Accounts more than 6 months delinquent — especially those sold to collection agencies — often settle for 25–40 cents on the dollar. Forgiven debt is generally taxable income unless you qualify for the insolvency exclusion. Debt settlement causes credit score drops of 100–150 points with 4–7 years of recovery time.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How Debt Settlement Works</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Debt settlement is a negotiation process in which you (or a debt settlement company on your behalf) negotiate with creditors to accept less than the full amount owed as payment in full. Creditors agree to settle because receiving something is better than potentially receiving nothing through a bankruptcy discharge. The key to successful debt settlement is leverage — creditors are most willing to negotiate when a debt is significantly delinquent and they believe bankruptcy is a real possibility.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The debt settlement process typically works as follows: you stop making payments to creditors (accumulating funds in a dedicated savings account instead); accounts become delinquent; creditors begin calling and may file lawsuits if the debt is large; once you have accumulated enough to make a settlement offer (typically after 6–18 months), you negotiate a lump-sum settlement for less than the full balance. The creditor accepts the settlement, reports the account as &quot;settled&quot; or &quot;settled for less than full balance,&quot; and the remaining balance is forgiven.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The major risks of debt settlement include: significant credit damage from missed payments; the possibility of lawsuits and wage garnishment before settlement is reached; tax liability on forgiven debt (generally taxable as ordinary income unless you qualify for the insolvency exclusion under IRS Form 982); continued accrual of interest and fees during the settlement period; and the possibility that not all creditors agree to settle. There is no guarantee any creditor will accept a settlement offer.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If you are considering debt settlement, evaluate all alternatives first. Nonprofit credit counseling agencies offer debt management plans that reduce interest rates and create structured repayment without credit damage. Chapter 7 bankruptcy eliminates most unsecured debt faster and with a cleaner legal outcome for many people — the 10-year credit report impact is often no worse in practice than the 7-year impact of settled accounts plus missed payments. Consulting a bankruptcy attorney (most offer free consultations) and a nonprofit credit counselor before pursuing debt settlement is strongly recommended.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: Debt Settlement</h2>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Kevin has $35,000 in credit card debt across 3 cards, all 8 months delinquent. Annual income: $52,000. He engages in direct settlement negotiations (no settlement company) after consulting with a bankruptcy attorney who confirmed settlement is preferable to bankruptcy in his situation.
              </p>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4 font-mono bg-white/60 dark:bg-black/20 rounded-xl px-4 py-3">
                <div>Original debt: $35,000</div>
                <div>Settlement range (40–55% for 8-month delinquency): $14,000–$19,250</div>
                <div>Amount forgiven: $15,750–$21,000</div>
                <div>Tax on forgiven debt (22% marginal rate): $3,465–$4,620</div>
                <div>Net savings after tax: $12,285–$16,380</div>
                <div>Credit score impact: −100 to −150 points</div>
                <div className="font-bold pt-1">TOTAL KEVIN PAYS: ~$17,465–$23,870 (including taxes)</div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Kevin saves $11,130–$17,535 versus paying the full $35,000, but faces tax liability on forgiven amounts. He should consult a CPA about the insolvency exclusion — if his liabilities exceed his assets at the time of settlement, he may be able to exclude some or all forgiven debt from taxable income using IRS Form 982. His credit score will take 4–6 years to recover, but he avoids bankruptcy.
              </p>
            </div>
          </div>

          <div className="mb-6">
            <AffiliateCTA headline="Get a Free Debt Relief Consultation" />
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
