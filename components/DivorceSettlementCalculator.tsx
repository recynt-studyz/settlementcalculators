'use client'

import { useState, useEffect } from 'react'
import { STATE_LIST, fmt } from '@/lib/settlementData'
import AffiliateCTA from './AffiliateCTA'

const STORAGE_KEY = 'sc-divorce'

const COMMUNITY_PROPERTY_STATES = new Set(['AZ', 'CA', 'ID', 'LA', 'NV', 'NM', 'TX', 'WA', 'WI'])

const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#1e293b]'
const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
const sectionCls = 'rounded-xl border border-gray-100 dark:border-gray-700 p-4 space-y-3'

// Child support income shares percentages by number of children
const CHILD_SUPPORT_PCT = [0, 0.17, 0.25, 0.29, 0.31, 0.35]

export default function DivorceSettlementCalculator() {
  const [homeValue, setHomeValue] = useState('350000')
  const [mortgage, setMortgage] = useState('220000')
  const [retirement, setRetirement] = useState('150000')
  const [savings, setSavings] = useState('25000')
  const [investments, setInvestments] = useState('50000')
  const [otherAssets, setOtherAssets] = useState('0')
  const [creditCardDebt, setCreditCardDebt] = useState('15000')
  const [carLoans, setCarLoans] = useState('20000')
  const [otherDebt, setOtherDebt] = useState('0')
  const [yourIncome, setYourIncome] = useState('65000')
  const [spouseIncome, setSpouseIncome] = useState('85000')
  const [yearsMarried, setYearsMarried] = useState('8')
  const [children, setChildren] = useState(0)
  const [stateAbbr, setStateAbbr] = useState('')
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.homeValue) setHomeValue(p.homeValue)
        if (p.mortgage) setMortgage(p.mortgage)
        if (p.retirement) setRetirement(p.retirement)
        if (p.savings) setSavings(p.savings)
        if (p.investments) setInvestments(p.investments)
        if (p.otherAssets) setOtherAssets(p.otherAssets)
        if (p.creditCardDebt) setCreditCardDebt(p.creditCardDebt)
        if (p.carLoans) setCarLoans(p.carLoans)
        if (p.otherDebt) setOtherDebt(p.otherDebt)
        if (p.yourIncome) setYourIncome(p.yourIncome)
        if (p.spouseIncome) setSpouseIncome(p.spouseIncome)
        if (p.yearsMarried) setYearsMarried(p.yearsMarried)
        if (p.children !== undefined) setChildren(p.children)
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

  const hv = parseFloat(homeValue) || 0
  const mort = parseFloat(mortgage) || 0
  const ret = parseFloat(retirement) || 0
  const sav = parseFloat(savings) || 0
  const inv = parseFloat(investments) || 0
  const other = parseFloat(otherAssets) || 0
  const cc = parseFloat(creditCardDebt) || 0
  const car = parseFloat(carLoans) || 0
  const od = parseFloat(otherDebt) || 0
  const myInc = parseFloat(yourIncome) || 0
  const spInc = parseFloat(spouseIncome) || 0
  const yrs = parseFloat(yearsMarried) || 0

  const homeEquity = Math.max(0, hv - mort)
  const totalAssets = homeEquity + ret + sav + inv + other
  const totalDebt = cc + car + od
  const netMaritalEstate = totalAssets - totalDebt
  const yourShare = netMaritalEstate / 2

  const isCommunityProp = COMMUNITY_PROPERTY_STATES.has(stateAbbr)

  // Alimony: only if married 10+ years (120 months) or significant income disparity
  const incomeDiff = Math.abs(myInc - spInc)
  const higherIncome = Math.max(myInc, spInc)
  const lowerIncome = Math.min(myInc, spInc)
  const hasAlimony = yrs >= 10 || (yrs >= 5 && incomeDiff > 20000)
  const monthlyAlimony = hasAlimony ? ((higherIncome - lowerIncome) * 0.30) / 12 : 0
  const alimonyDuration = yrs >= 20 ? yrs * 0.5 : yrs >= 10 ? yrs * 0.4 : yrs * 0.25

  // Child support (income shares model)
  const combinedIncome = myInc + spInc
  const supportPct = CHILD_SUPPORT_PCT[Math.min(children, 5)] ?? 0.35
  const totalChildSupport = combinedIncome * supportPct / 12
  const myIncPct = combinedIncome > 0 ? myInc / combinedIncome : 0.5
  const myChildSupportShare = totalChildSupport * myIncPct

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className={sectionCls}>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Marital Assets</p>
            {[
              { label: 'Home value ($)', val: homeValue, set: setHomeValue, key: 'homeValue' },
              { label: 'Mortgage remaining ($)', val: mortgage, set: setMortgage, key: 'mortgage' },
              { label: 'Retirement accounts ($)', val: retirement, set: setRetirement, key: 'retirement' },
              { label: 'Savings / checking ($)', val: savings, set: setSavings, key: 'savings' },
              { label: 'Investment accounts ($)', val: investments, set: setInvestments, key: 'investments' },
              { label: 'Other assets ($)', val: otherAssets, set: setOtherAssets, key: 'otherAssets' },
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

          <div className={sectionCls}>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Marital Debts</p>
            {[
              { label: 'Credit card debt ($)', val: creditCardDebt, set: setCreditCardDebt, key: 'creditCardDebt' },
              { label: 'Car loans ($)', val: carLoans, set: setCarLoans, key: 'carLoans' },
              { label: 'Other debt ($)', val: otherDebt, set: setOtherDebt, key: 'otherDebt' },
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

          <div className={sectionCls}>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Income & Children</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Your annual income ($)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input type="number" min="0" value={yourIncome}
                    onChange={e => { setYourIncome(e.target.value); save({ yourIncome: e.target.value }) }}
                    className={`${inputCls} pl-7`} />
                </div>
              </div>
              <div>
                <label className={labelCls}>Spouse annual income ($)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input type="number" min="0" value={spouseIncome}
                    onChange={e => { setSpouseIncome(e.target.value); save({ spouseIncome: e.target.value }) }}
                    className={`${inputCls} pl-7`} />
                </div>
              </div>
            </div>
            <div>
              <label className={labelCls}>Years married</label>
              <input type="number" min="0" value={yearsMarried}
                onChange={e => { setYearsMarried(e.target.value); save({ yearsMarried: e.target.value }) }}
                className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Children under 18</label>
              <div className="flex items-center gap-3">
                <button onClick={() => { const v = Math.max(0, children - 1); setChildren(v); save({ children: v }) }}
                  className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold text-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition">−</button>
                <span className="w-8 text-center font-bold text-lg text-gray-800 dark:text-[#e2e8f0]">{children}</span>
                <button onClick={() => { const v = Math.min(6, children + 1); setChildren(v); save({ children: v }) }}
                  className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold text-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition">+</button>
              </div>
            </div>
            <div>
              <label className={labelCls}>State</label>
              <select value={stateAbbr} onChange={e => { setStateAbbr(e.target.value); save({ stateAbbr: e.target.value }) }} className={inputCls}>
                <option value="">Select state...</option>
                {STATE_LIST.map(s => <option key={s.abbr} value={s.abbr}>{s.name}</option>)}
              </select>
              {stateAbbr && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {isCommunityProp ? 'Community property state — 50/50 split generally required' : 'Equitable distribution state — courts divide assets fairly (often near 50/50)'}
                </p>
              )}
            </div>
          </div>

          <button onClick={() => setShowResults(true)} className="w-full py-3 rounded-xl bg-[#1e293b] text-white font-bold text-sm hover:bg-[#334155] transition">
            Calculate Divorce Settlement
          </button>
        </div>

        <div className="space-y-4">
          {showResults || netMaritalEstate > 0 ? (
            <>
              <div className="rounded-xl bg-[#1e293b]/10 dark:bg-[#1e293b]/40 border border-[#1e293b]/30 p-5">
                <p className="text-sm text-[#1e293b] dark:text-slate-300 font-medium mb-1">Your Estimated Share</p>
                <p className="text-4xl font-bold text-[#1e293b] dark:text-white">{fmt(yourShare)}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">50% of {fmt(netMaritalEstate)} net marital estate</p>
              </div>

              <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Asset Division Breakdown</p>
                <div className="space-y-2 text-sm">
                  {[
                    { label: 'Home equity', val: homeEquity, each: homeEquity / 2 },
                    { label: 'Retirement accounts', val: ret, each: ret / 2 },
                    { label: 'Savings & checking', val: sav, each: sav / 2 },
                    { label: 'Investments', val: inv, each: inv / 2 },
                    ...(other > 0 ? [{ label: 'Other assets', val: other, each: other / 2 }] : []),
                  ].map(({ label, val, each }) => (
                    <div key={label} className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">{label}: {fmt(val)}</span>
                      <span className="font-medium text-gray-800 dark:text-[#e2e8f0]">{fmt(each)} each</span>
                    </div>
                  ))}
                  <div className="flex justify-between border-t border-gray-100 dark:border-gray-600 pt-2 mt-1">
                    <span className="font-semibold text-gray-800 dark:text-[#e2e8f0]">Shared debt</span>
                    <span className="font-medium text-gray-800 dark:text-[#e2e8f0]">−{fmt(totalDebt / 2)} each</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-100 dark:border-gray-600 pt-2 mt-1">
                    <span className="font-bold text-gray-800 dark:text-[#e2e8f0]">Net marital estate</span>
                    <span className="font-bold text-gray-800 dark:text-[#e2e8f0]">{fmt(netMaritalEstate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold text-[#1e293b] dark:text-slate-200">Your estimated share (50%)</span>
                    <span className="font-bold text-[#1e293b] dark:text-slate-200">{fmt(yourShare)}</span>
                  </div>
                </div>
              </div>

              {hasAlimony && monthlyAlimony > 0 && (
                <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Alimony Estimate</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Married {yrs} years with income difference of {fmt(incomeDiff)}/year. Possible alimony:{' '}
                    <span className="font-bold text-gray-800 dark:text-[#e2e8f0]">{fmt(monthlyAlimony)}/month</span> for approximately{' '}
                    <span className="font-bold text-gray-800 dark:text-[#e2e8f0]">{Math.round(alimonyDuration)} years</span>.
                  </p>
                </div>
              )}

              {children > 0 && (
                <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Child Support Estimate</p>
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <div className="flex justify-between">
                      <span>Combined income × {(supportPct * 100).toFixed(0)}% support rate</span>
                      <span className="font-medium text-gray-800 dark:text-[#e2e8f0]">{fmt(totalChildSupport)}/month total</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Your share ({(myIncPct * 100).toFixed(0)}% of combined income)</span>
                      <span className="font-medium text-[#1e293b] dark:text-slate-200">{fmt(myChildSupportShare)}/month</span>
                    </div>
                  </div>
                </div>
              )}

              <AffiliateCTA headline="Get a Free Divorce Consultation" />
              <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">Estimates for educational purposes only. Property division varies by state law, judge, and circumstances. Not legal advice. Consult a licensed family law attorney.</p>
            </>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 p-10 text-center">
              <div className="text-4xl mb-3">⚖️</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Enter your marital assets and debts to estimate your divorce settlement.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
