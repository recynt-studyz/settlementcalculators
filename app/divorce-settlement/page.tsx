import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import DivorceSettlementCalculatorWrapper from '@/components/DivorceSettlementCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'
import AffiliateCTA from '@/components/AffiliateCTA'

export const metadata: Metadata = {
  title: 'Divorce Settlement Calculator 2026 — Property Division & Alimony',
  description:
    'Estimate your divorce settlement including property division, alimony, and child support. Covers community property and equitable distribution states. Free 2026 divorce calculator.',
  alternates: { canonical: 'https://settlementcalculators.app/divorce-settlement' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'How is property divided in a divorce?',
    a: 'Property division in divorce depends on whether your state uses community property or equitable distribution rules. Nine community property states (Arizona, California, Idaho, Louisiana, Nevada, New Mexico, Texas, Washington, Wisconsin) generally divide marital property 50/50. The remaining 41 states use equitable distribution, dividing property fairly but not necessarily equally — courts consider the length of the marriage, each spouse\'s contributions, earning capacity, age and health, and other factors. In both systems, separate property (owned before marriage or received as a gift or inheritance) is generally not divided. Marital property includes assets acquired during the marriage: home equity, retirement accounts, investment accounts, vehicles, and business interests.',
  },
  {
    q: 'How is alimony calculated?',
    a: 'Alimony (also called spousal support or maintenance) is calculated differently by each state, with courts generally considering the length of the marriage, each spouse\'s income and earning capacity, the standard of living during the marriage, contributions as a homemaker or to the other spouse\'s career, and age and health. Common duration rules: marriages under 5 years rarely result in long-term alimony; marriages of 10+ years often result in permanent or long-term support; marriages 5–10 years may result in rehabilitative alimony (temporary support while the lower-earning spouse gains skills or education). The amount is typically calculated to equalize the disparity in incomes, often targeting 30–35% of the income difference.',
  },
  {
    q: 'How is child support calculated?',
    a: 'Child support is calculated using state-specific formulas — most states use an income shares model that considers both parents\' incomes, the custody arrangement, and the number of children. As a general guideline: 17% of the non-custodial parent\'s net income for 1 child; 25% for 2 children; 29% for 3; 31% for 4; and 35% for 5 or more. These are starting points — your state formula will adjust for childcare costs, health insurance, special needs, and time spent with each parent. Child support continues until the child turns 18 (or 21 in some states for college). Child support is not tax-deductible for the paying parent or taxable income for the receiving parent.',
  },
  {
    q: 'Should I hire a divorce attorney?',
    a: 'The complexity of your divorce determines how much attorney help you need. Simple divorces (short marriage, no children, few assets, agreement on all issues) may be handled with divorce mediation or an online service at low cost. Complex divorces (long marriage, children, significant assets, business interests, pensions, disputes over property or custody) strongly benefit from a divorce attorney. A divorce attorney protects your legal rights, ensures proper valuation of marital assets (especially retirement accounts requiring a QDRO), negotiates property division and support terms, and drafts legally binding agreements. Mistakes in divorce agreements are very difficult to undo. Most family law attorneys offer free or low-cost consultations.',
  },
  {
    q: 'What is a QDRO and do I need one?',
    a: 'A Qualified Domestic Relations Order (QDRO) is a court order required to divide retirement accounts (401k, 403b, pension plans) in a divorce. Without a QDRO, you cannot transfer a portion of a retirement account to a spouse without triggering taxes and penalties. The QDRO must be drafted by an attorney experienced in retirement account division, approved by the retirement plan administrator, and entered by the court. QDROs are needed for all employer-sponsored retirement plans — IRAs can be divided more simply through a transfer incident to divorce. If your spouse has significant retirement savings, a properly drafted QDRO can be one of the most valuable assets in your divorce settlement.',
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
  name: 'Divorce Settlement Calculator 2026',
  url: 'https://settlementcalculators.app/divorce-settlement',
  applicationCategory: 'LegalApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your Divorce Settlement',
  step: [
    { '@type': 'HowToStep', name: 'Enter marital assets and debts', text: 'Enter the total value of marital assets (home equity, retirement accounts, investments, vehicles) and marital debts. Select your state to apply the correct property division rule (community property or equitable distribution).' },
    { '@type': 'HowToStep', name: 'Enter income and family details', text: 'Enter both spouses\' annual incomes, years married, number of children, and custody arrangement. These determine alimony eligibility and child support estimates.' },
    { '@type': 'HowToStep', name: 'View your divorce settlement estimate', text: 'See your estimated property division, monthly alimony amount and duration, monthly child support, and total settlement value.' },
  ],
}

const trustSignals = ['⚖️ 2026 Updated', '🔒 Private', '⚡ Instant', '✓ Free']

export default function DivorceSettlementPage() {
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
              Divorce Settlement Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Estimate your divorce settlement including property division, alimony, and child support. Covers both community property and equitable distribution states. Free for all 50 states.
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
              <DivorceSettlementCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222222" /></div>

          <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-200 mb-2">Divorce Settlement Key Facts</h2>
            <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed">
              Nine community property states divide marital assets 50/50: Arizona, California, Idaho, Louisiana, Nevada, New Mexico, Texas, Washington, and Wisconsin. The other 41 states use equitable distribution, which is fair but not necessarily equal. Retirement accounts require a QDRO to divide without tax penalties. Child support follows state-specific income shares formulas. Alimony is most common in long marriages (10+ years) with significant income disparity.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How Divorce Settlements Are Calculated</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              A divorce settlement encompasses three main financial components: property division, alimony (spousal support), and child support. Each is calculated differently and governed by different legal rules. Understanding all three is essential to knowing what you are entitled to or obligated to pay.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Property division starts with identifying marital property — assets and debts acquired during the marriage — versus separate property (owned before marriage or received as a gift or inheritance during marriage). Marital property typically includes home equity, retirement account contributions made during marriage, brokerage accounts, vehicles, and business interests built during marriage. In the nine community property states, marital property is divided 50/50 by default. In equitable distribution states, courts divide property fairly based on multiple factors: the length of the marriage, each spouse&apos;s economic and non-economic contributions, earning capacity, age and health, and the custody arrangement.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Alimony is awarded when there is a significant income disparity between spouses, particularly after long marriages where one spouse sacrificed career advancement for the family. Courts typically look at whether the marriage lasted 10+ years, the income gap between spouses, the lower-earning spouse&apos;s ability to become self-supporting, and the standard of living during the marriage. Alimony amounts typically target equalization of approximately 30–40% of the income differential. Duration correlates with marriage length: short marriages may produce temporary rehabilitative alimony of 1–3 years; marriages of 10–20 years may produce alimony for 40–50% of the marriage duration; very long marriages may produce permanent support.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Child support is calculated using state income shares formulas that consider both parents&apos; incomes, the number of children, the custody split, childcare costs, and health insurance. The non-custodial parent (or the higher-earning parent in 50/50 custody) typically pays child support. Deviation from guidelines requires a court finding that the guideline amount is inappropriate. Child support is modifiable if circumstances change substantially — a significant income change, job loss, or change in custody arrangement can trigger a modification.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: Divorce Settlement</h2>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Robert and Susan are divorcing in California (community property state) after 14 years of marriage. Two children, ages 9 and 11. Robert earns $120,000/year; Susan earns $45,000/year. Marital assets: home equity $280,000, retirement accounts $190,000, investments $80,000. Marital debt: $25,000 HELOC.
              </p>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4 font-mono bg-white/60 dark:bg-black/20 rounded-xl px-4 py-3">
                <div>Net marital estate: $280k + $190k + $80k − $25k = $525,000</div>
                <div>Each spouse&apos;s share (50/50 CA): $262,500</div>
                <div>Child support (25% of Robert&apos;s net): ~$2,200/month</div>
                <div>Alimony (14-year marriage, $75k gap): ~$2,500/month</div>
                <div>Alimony duration (14 × 0.4 = 5.6 years): ~67 months</div>
                <div>Total alimony: ~$167,500</div>
                <div className="font-bold pt-1">SUSAN&apos;S TOTAL: $262,500 property + $167,500 alimony</div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                In California, the retirement accounts must be valued carefully — only contributions made during the marriage are community property. Robert&apos;s 401k balance before marriage is his separate property. A QDRO is required to transfer Susan&apos;s share of Robert&apos;s 401k without triggering taxes or penalties. Child support continues until the children turn 18; alimony is modifiable if either spouse&apos;s income changes significantly.
              </p>
            </div>
          </div>

          <div className="mb-6">
            <AffiliateCTA headline="Get a Free Divorce Consultation" />
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
