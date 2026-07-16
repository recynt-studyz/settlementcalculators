'use client'

import { useState, useEffect } from 'react'
import { fmt } from '@/lib/settlementData'
import AffiliateCTA from './AffiliateCTA'

const STORAGE_KEY = 'sc-debtSettlement'

const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#1e293b]'
const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
const sectionCls = 'rounded-xl border border-gray-100 dark:border-gray-700 p-4 space-y-3'

const DEBT_TYPES = [
  { val: 'credit', label: 'Credit card', settleRate: 0.45 },
  { val: 'medical', label: 'Medical bills', settleRate: 0.35 },
  { val: 'personal', label: 'Personal loan', settleRate: 0.50 },
  { val: 'mixed', label: 'Mixed debt', settleRate: 0.48 },
]

// Approximate marginal tax rates by income
function estimateTaxBracket(monthlyIncome: number): number {
  const annual = monthlyIncome * 12
  if (annual < 48000) return 0.12
  if (annual < 103000) return 0.22
  if (annual < 197000) return 0.24
  return 0.32
}

export default function DebtSettlementCalculator() {
  const [totalDebt, setTotalDebt] = useState('25000')
  const [debtType, setDebtType] = useState('credit')
  const [monthsDelinquent, setMonthsDelinquent] = useState('6')
  const [monthlyIncome, setMonthlyIncome] = useState('4000')
  const [monthlyExpenses, setMonthlyExpenses] = useState('3200')
  const [lumpSum, setLumpSum] = useState('8000')
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.totalDebt) setTotalDebt(p.totalDebt)
        if (p.debtType) setDebtType(p.debtType)
        if (p.monthsDelinquent) setMonthsDelinquent(p.monthsDelinquent)
        if (p.monthlyIncome) setMonthlyIncome(p.monthlyIncome)
        if (p.monthlyExpenses) setMonthlyExpenses(p.monthlyExpenses)
        if (p.lumpSum) setLumpSum(p.lumpSum)
      }
    } catch { /* ignore */ }
  }, [])

  const save = (updates: Record<string, unknown>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }

  const debt = parseFloat(totalDebt) || 0
  const mDelinquent = parseFloat(monthsDelinquent) || 0
  const income = parseFloat(monthlyIncome) || 0
  const expenses = parseFloat(monthlyExpenses) || 0
  const lump = parseFloat(lumpSum) || 0

  const typeData = DEBT_TYPES.find(t => t.val === debtType) ?? DEBT_TYPES[0]
  // Longer delinquency = slightly better settlement (creditor wants to close)
  const delinquencyBonus = Math.min(0.10, mDelinquent * 0.01)
  const settleRateLow = Math.max(0.25, typeData.settleRate - 0.10 - delinquencyBonus)
  const settleRateHigh = typeData.settleRate + 0.10

  const settledLow = debt * settleRateLow
  const settledHigh = debt * settleRateHigh
  const savingsLow = debt - settledHigh
  const savingsHigh = debt - settledLow

  const taxRate = estimateTaxBracket(income)
  const forgiven = debt - ((settledLow + settledHigh) / 2)
  const taxBill = Math.max(0, forgiven * taxRate)

  const disposableIncome = Math.max(0, income - expenses)
  const lumpFeasible = lump >= settledLow
  const paymentMonths = disposableIncome > 0 ? Math.ceil(settledLow / (disposableIncome * 0.5)) : null

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className={sectionCls}>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Your Debt Situation</p>
            <div>
              <label className={labelCls}>Total debt ($)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" min="0" value={totalDebt}
                  onChange={e => { setTotalDebt(e.target.value); save({ totalDebt: e.target.value }) }}
                  className={`${inputCls} pl-7`} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Type of debt</label>
              <div className="grid grid-cols-2 gap-2">
                {DEBT_TYPES.map(({ val, label }) => (
                  <button key={val}
                    onClick={() => { setDebtType(val); save({ debtType: val }) }}
                    className={`px-2 py-2 rounded-lg text-xs font-medium transition-colors ${
                      debtType === val ? 'bg-[#1e293b] text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                    }`}>{label}</button>
                ))}
              </div>
            </div>
            <div>
              <label className={labelCls}>Months delinquent (past due)</label>
              <input type="number" min="0" value={monthsDelinquent}
                onChange={e => { setMonthsDelinquent(e.target.value); save({ monthsDelinquent: e.target.value }) }}
                className={inputCls} />
            </div>
          </div>

          <div className={sectionCls}>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Your Finances</p>
            {[
              { label: 'Monthly income ($)', val: monthlyIncome, set: setMonthlyIncome, key: 'monthlyIncome' },
              { label: 'Monthly expenses ($)', val: monthlyExpenses, set: setMonthlyExpenses, key: 'monthlyExpenses' },
              { label: 'Lump sum available to settle ($)', val: lumpSum, set: setLumpSum, key: 'lumpSum' },
            ].map(({ label, val, set, key }) => (
              <div key={key}>
                <label className={labelCls}>{label}</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input type="number" min="0" value={val}
                    onChange={e => { set(e.target.value); save({ [key]: e.target.value }) }}
                    className={`${inputCls} pl-7`} />
                </div>
              </div>
            ))}
          </div>

          <button onClick={() => setShowResults(true)} className="w-full py-3 rounded-xl bg-[#1e293b] text-white font-bold text-sm hover:bg-[#334155] transition">
            Calculate Debt Settlement
          </button>
        </div>

        <div className="space-y-4">
          {showResults || debt > 0 ? (
            <>
              <div className="rounded-xl bg-[#1e293b]/10 dark:bg-[#1e293b]/40 border border-[#1e293b]/30 p-5">
                <p className="text-sm text-[#1e293b] dark:text-slate-300 font-medium mb-1">Typical Settlement Range</p>
                <p className="text-4xl font-bold text-[#1e293b] dark:text-white">{fmt(settledLow)} – {fmt(settledHigh)}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {(settleRateLow * 100).toFixed(0)}%–{(settleRateHigh * 100).toFixed(0)}% of {fmt(debt)} original debt
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Settlement Analysis</p>
                <div className="space-y-2 text-sm">
                  {[
                    { label: 'Original debt', val: fmt(debt) },
                    { label: 'Typical settlement (40–60% of debt)', val: `${fmt(settledLow)} – ${fmt(settledHigh)}` },
                    { label: 'Potential savings vs. paying in full', val: `${fmt(savingsLow)} – ${fmt(savingsHigh)}`, highlight: true },
                    { label: `Lump sum available (${fmt(lump)})`, val: lumpFeasible ? 'May be sufficient' : 'May need more', warn: !lumpFeasible },
                    { label: `Monthly disposable income`, val: fmt(disposableIncome) },
                    ...(paymentMonths ? [{ label: `Approx. months to settle via payments`, val: `${paymentMonths} months` }] : []),
                  ].map(({ label, val, highlight, warn }) => (
                    <div key={label} className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">{label}</span>
                      <span className={`font-medium ${highlight ? 'text-green-600 dark:text-green-400' : warn ? 'text-amber-600 dark:text-amber-400' : 'text-gray-800 dark:text-[#e2e8f0]'}`}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 p-4">
                <p className="text-sm font-semibold text-red-800 dark:text-red-300 mb-1">Tax Warning</p>
                <p className="text-sm text-red-700 dark:text-red-400">
                  Forgiven debt is taxable income (IRS Form 1099-C). If you settle {fmt(debt)} for {fmt((settledLow + settledHigh) / 2)}, approximately {fmt(forgiven)} in forgiven debt will be reported as income. At your estimated {(taxRate * 100).toFixed(0)}% tax bracket, this could add approximately{' '}
                  <strong>{fmt(taxBill)}</strong> to your tax bill.
                  Exception: If you are insolvent (liabilities exceed assets), you may qualify for IRS insolvency exclusion.
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Credit Score Impact</p>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex justify-between">
                    <span>Estimated score drop</span>
                    <span className="font-medium text-red-600 dark:text-red-400">100–150 points</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time to recover</span>
                    <span className="font-medium text-gray-800 dark:text-[#e2e8f0]">4–7 years</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Typical resolution time</span>
                    <span className="font-medium text-gray-800 dark:text-[#e2e8f0]">2–4 years</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Alternatives to Consider</p>
                <ul className="space-y-1.5 text-sm text-gray-600 dark:text-gray-400">
                  <li><span className="font-medium text-gray-800 dark:text-[#e2e8f0]">1. Debt consolidation loan</span> — lower interest, no credit damage, longer payoff</li>
                  <li><span className="font-medium text-gray-800 dark:text-[#e2e8f0]">2. Credit counseling / DMP</span> — negotiate lower rates, structured repayment</li>
                  <li><span className="font-medium text-gray-800 dark:text-[#e2e8f0]">3. Chapter 7 bankruptcy</span> — discharges most unsecured debt, major credit impact</li>
                  <li><span className="font-medium text-gray-800 dark:text-[#e2e8f0]">4. Chapter 13 bankruptcy</span> — structured repayment plan, keep assets</li>
                  <li><span className="font-medium text-gray-800 dark:text-[#e2e8f0]">5. Do nothing</span> — statute of limitations on debt: 3–6 years (varies by state)</li>
                </ul>
              </div>

              <AffiliateCTA headline="Get a Free Debt Relief Consultation" />
              <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">Estimates for educational purposes only. Actual settlement amounts vary. Consult a licensed debt settlement attorney or nonprofit credit counselor.</p>
            </>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 p-10 text-center">
              <div className="text-4xl mb-3">💳</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Enter your debt information to see what you might settle for.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
