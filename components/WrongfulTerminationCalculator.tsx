'use client'

import { useState, useEffect } from 'react'
import { STATE_LIST, fmt } from '@/lib/settlementData'
import AffiliateCTA from './AffiliateCTA'

const STORAGE_KEY = 'sc-wrongfultermination'

const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#1e293b]'
const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
const sectionCls = 'rounded-xl border border-gray-100 dark:border-gray-700 p-4 space-y-3'

const TERMINATION_REASONS = [
  { val: 'discrimination', label: 'Discrimination (race, gender, age, disability)', hasDiscrimination: true, hasPunitive: true },
  { val: 'retaliation', label: 'Retaliation for complaint / whistleblower', hasDiscrimination: false, hasPunitive: true },
  { val: 'fmla', label: 'FMLA / medical leave violation', hasDiscrimination: false, hasPunitive: false },
  { val: 'whistleblower', label: 'Whistleblower retaliation (government/safety)', hasDiscrimination: false, hasPunitive: true },
  { val: 'contract', label: 'Contract breach / implied contract', hasDiscrimination: false, hasPunitive: false },
  { val: 'atwill', label: 'At-will termination — no legal claim', hasDiscrimination: false, hasPunitive: false },
]

const COMPANY_SIZES = [
  { val: 'tiny', label: 'Under 15 employees', fedCap: 50000 },
  { val: 'small', label: '15–100 employees', fedCap: 50000 },
  { val: 'medium', label: '101–200 employees', fedCap: 100000 },
  { val: 'large', label: '201–500 employees', fedCap: 200000 },
  { val: 'xlarge', label: '500+ employees', fedCap: 300000 },
]

export default function WrongfulTerminationCalculator() {
  const [annualSalary, setAnnualSalary] = useState('65000')
  const [monthsUnemployed, setMonthsUnemployed] = useState('3')
  const [monthsToFind, setMonthsToFind] = useState('6')
  const [reason, setReason] = useState('discrimination')
  const [companySize, setCompanySize] = useState('medium')
  const [stateAbbr, setStateAbbr] = useState('')
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.annualSalary) setAnnualSalary(p.annualSalary)
        if (p.monthsUnemployed) setMonthsUnemployed(p.monthsUnemployed)
        if (p.monthsToFind) setMonthsToFind(p.monthsToFind)
        if (p.reason) setReason(p.reason)
        if (p.companySize) setCompanySize(p.companySize)
        if (p.stateAbbr) setStateAbbr(p.stateAbbr)
      }
    } catch { /* ignore */ }
  }, [])

  const save = (updates: Record<string, unknown>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }

  const salary = parseFloat(annualSalary) || 0
  const monthlyWage = salary / 12
  const moUnemployed = parseFloat(monthsUnemployed) || 0
  const moToFind = parseFloat(monthsToFind) || 0

  const reasonData = TERMINATION_REASONS.find(r => r.val === reason) ?? TERMINATION_REASONS[0]
  const sizeData = COMPANY_SIZES.find(s => s.val === companySize) ?? COMPANY_SIZES[2]

  const backPay = monthlyWage * moUnemployed
  const frontPay = monthlyWage * moToFind
  const emotionalDistressLow = backPay * 0.5
  const emotionalDistressHigh = backPay * 1.5
  const punitiveMultLow = reasonData.hasPunitive ? 2 : 0
  const punitiveMultHigh = reasonData.hasPunitive ? 4 : 0
  const punitiveLow = reasonData.hasPunitive ? backPay * punitiveMultLow : 0
  const punitiveHigh = reasonData.hasPunitive ? backPay * punitiveMultHigh : 0

  const grossLow = backPay + frontPay + emotionalDistressLow + punitiveLow
  const grossHigh = backPay + frontPay + emotionalDistressHigh + punitiveHigh

  // Apply federal caps for discrimination claims
  const cappedLow = reasonData.hasDiscrimination ? Math.min(grossLow - backPay - frontPay, sizeData.fedCap) + backPay + frontPay : grossLow
  const cappedHigh = reasonData.hasDiscrimination ? Math.min(grossHigh - backPay - frontPay, sizeData.fedCap) + backPay + frontPay : grossHigh

  // Attorney fees typically recoverable in employment cases (not deducted from plaintiff's recovery)
  const attyFeeLow = cappedLow * 0.33
  const attyFeeHigh = cappedHigh * 0.33
  const netLow = Math.max(0, cappedLow - attyFeeLow)
  const netHigh = Math.max(0, cappedHigh - attyFeeHigh)

  const isNoClaimCase = reason === 'atwill'

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className={sectionCls}>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Your Employment Situation</p>
            <div>
              <label className={labelCls}>Annual salary at time of termination ($)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" min="0" value={annualSalary}
                  onChange={e => { setAnnualSalary(e.target.value); save({ annualSalary: e.target.value }) }}
                  className={`${inputCls} pl-7`} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Months unemployed so far</label>
                <input type="number" min="0" value={monthsUnemployed}
                  onChange={e => { setMonthsUnemployed(e.target.value); save({ monthsUnemployed: e.target.value }) }}
                  className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Est. months to find equiv. work</label>
                <input type="number" min="0" value={monthsToFind}
                  onChange={e => { setMonthsToFind(e.target.value); save({ monthsToFind: e.target.value }) }}
                  className={inputCls} />
              </div>
            </div>
          </div>

          <div className={sectionCls}>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Reason for Termination</p>
            <div className="space-y-2">
              {TERMINATION_REASONS.map(({ val, label }) => (
                <button key={val}
                  onClick={() => { setReason(val); save({ reason: val }) }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    reason === val ? 'bg-[#1e293b] text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}>{label}</button>
              ))}
            </div>
          </div>

          <div className={sectionCls}>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Company & State</p>
            <div>
              <label className={labelCls}>Company size</label>
              <div className="space-y-1.5">
                {COMPANY_SIZES.map(({ val, label, fedCap }) => (
                  <button key={val}
                    onClick={() => { setCompanySize(val); save({ companySize: val }) }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors ${
                      companySize === val ? 'bg-[#1e293b] text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}>
                    <span className="font-medium">{label}</span>
                    <span className={`ml-2 ${companySize === val ? 'text-slate-300' : 'text-gray-500'}`}>Fed. cap: {fmt(fedCap)}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className={labelCls}>State</label>
              <select value={stateAbbr} onChange={e => { setStateAbbr(e.target.value); save({ stateAbbr: e.target.value }) }} className={inputCls}>
                <option value="">Select state...</option>
                {STATE_LIST.map(s => <option key={s.abbr} value={s.abbr}>{s.name}</option>)}
              </select>
            </div>
          </div>

          <button onClick={() => setShowResults(true)} className="w-full py-3 rounded-xl bg-[#1e293b] text-white font-bold text-sm hover:bg-[#334155] transition">
            Calculate Wrongful Termination Estimate
          </button>
        </div>

        <div className="space-y-4">
          {showResults || salary > 0 ? (
            <>
              {isNoClaimCase ? (
                <div className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 p-5">
                  <p className="text-lg font-bold text-red-800 dark:text-red-300">At-Will Termination</p>
                  <p className="text-sm text-red-700 dark:text-red-400 mt-2">
                    At-will employees can be terminated for any reason or no reason at all (except illegal reasons). Without an employment contract, protected class discrimination, or retaliation for protected activity, you likely do not have a legal wrongful termination claim. An employment attorney can review the full circumstances.
                  </p>
                </div>
              ) : (
                <>
                  <div className="rounded-xl bg-[#1e293b]/10 dark:bg-[#1e293b]/40 border border-[#1e293b]/30 p-5">
                    <p className="text-sm text-[#1e293b] dark:text-slate-300 font-medium mb-1">Estimated Settlement Range</p>
                    <p className="text-4xl font-bold text-[#1e293b] dark:text-white">{fmt(netLow)} – {fmt(netHigh)}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Net after 33% attorney fees</p>
                  </div>

                  <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Settlement Breakdown</p>
                    <div className="space-y-2 text-sm">
                      {[
                        { label: `Back pay (${moUnemployed} months × ${fmt(monthlyWage)}/mo)`, val: fmt(backPay) },
                        { label: `Front pay (${moToFind} months to find work)`, val: fmt(frontPay) },
                        { label: 'Emotional distress damages', val: `${fmt(emotionalDistressLow)} – ${fmt(emotionalDistressHigh)}` },
                        ...(reasonData.hasPunitive ? [{ label: `Punitive damages (${punitiveMultLow}–${punitiveMultHigh}x back pay)`, val: `${fmt(punitiveLow)} – ${fmt(punitiveHigh)}` }] : []),
                        { label: 'Gross claim', val: `${fmt(grossLow)} – ${fmt(grossHigh)}`, bold: true },
                        ...(reasonData.hasDiscrimination ? [{ label: `Federal cap (${sizeData.label})`, val: fmt(sizeData.fedCap), warn: true }] : []),
                        { label: `Capped gross claim`, val: `${fmt(cappedLow)} – ${fmt(cappedHigh)}`, bold: true },
                        { label: 'Attorney fees (33%)', val: `−${fmt(attyFeeLow)} – −${fmt(attyFeeHigh)}` },
                        { label: 'Net to you', val: `${fmt(netLow)} – ${fmt(netHigh)}`, bold: true, highlight: true },
                      ].map(({ label, val, bold, highlight, warn }) => (
                        <div key={label} className={`flex justify-between ${bold ? 'border-t border-gray-100 dark:border-gray-600 pt-2 mt-1' : ''}`}>
                          <span className={`${bold ? 'font-semibold text-gray-800 dark:text-[#e2e8f0]' : 'text-gray-600 dark:text-gray-400'} ${warn ? 'text-amber-600 dark:text-amber-400' : ''}`}>{label}</span>
                          <span className={`font-medium ${highlight ? 'text-[#1e293b] dark:text-slate-200' : warn ? 'text-amber-600 dark:text-amber-400' : 'text-gray-800 dark:text-[#e2e8f0]'}`}>{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-blue-100 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/30 p-4">
                    <p className="text-xs text-blue-700 dark:text-blue-400">
                      Note: In employment cases, attorney fees are often recoverable from the defendant under fee-shifting statutes (Title VII, ADA, ADEA, FMLA). This means the defendant may pay your attorney fees separately, increasing your net recovery.
                    </p>
                  </div>
                </>
              )}

              <AffiliateCTA headline="Get a Free Wrongful Termination Case Review" />
              <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">Estimates for educational purposes only. Employment law varies significantly by state. Not legal advice.</p>
            </>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 p-10 text-center">
              <div className="text-4xl mb-3">💼</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Enter your salary and termination details to estimate your wrongful termination settlement.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
