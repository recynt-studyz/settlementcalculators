'use client'

import { useState, useEffect } from 'react'
import { STATES, STATE_LIST, fmt } from '@/lib/settlementData'
import AffiliateCTA from './AffiliateCTA'

const STORAGE_KEY = 'sc-workerscomp'

const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#1e293b]'
const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
const sectionCls = 'rounded-xl border border-gray-100 dark:border-gray-700 p-4 space-y-3'

const INJURY_TYPES = [
  { val: 'ttd', label: 'Temporary Total Disability (TTD)', desc: 'Completely unable to work temporarily' },
  { val: 'tpd', label: 'Temporary Partial Disability (TPD)', desc: 'Can work at reduced capacity temporarily' },
  { val: 'ppd', label: 'Permanent Partial Disability (PPD)', desc: 'Permanent partial impairment' },
  { val: 'ptd', label: 'Permanent Total Disability (PTD)', desc: 'Permanently unable to work' },
]

// Week multipliers for permanent disability by type
const WEEK_MULTIPLIERS = { ttd: 0, tpd: 0, ppd: 300, ptd: 500 }

export default function WorkersCompCalculator({ defaultState }: { defaultState?: string }) {
  const [stateAbbr, setStateAbbr] = useState(defaultState ?? '')
  const [avgWeeklyWage, setAvgWeeklyWage] = useState('1200')
  const [injuryType, setInjuryType] = useState<'ttd' | 'tpd' | 'ppd' | 'ptd'>('ttd')
  const [impairmentRating, setImpairmentRating] = useState('10')
  const [weeksOut, setWeeksOut] = useState('12')
  const [medBills, setMedBills] = useState('8000')
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.stateAbbr && !defaultState) setStateAbbr(p.stateAbbr)
        if (p.avgWeeklyWage) setAvgWeeklyWage(p.avgWeeklyWage)
        if (p.injuryType) setInjuryType(p.injuryType)
        if (p.impairmentRating) setImpairmentRating(p.impairmentRating)
        if (p.weeksOut) setWeeksOut(p.weeksOut)
        if (p.medBills) setMedBills(p.medBills)
      }
    } catch { /* ignore */ }
  }, [defaultState])

  const save = (updates: Record<string, unknown>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }

  const wage = parseFloat(avgWeeklyWage) || 0
  const weeks = parseFloat(weeksOut) || 0
  const impairment = Math.min(100, parseFloat(impairmentRating) || 0)
  const med = parseFloat(medBills) || 0

  const stateData = stateAbbr ? STATES[stateAbbr] : null
  const stateMax = stateData?.wcMaxWeekly ?? 1200

  // Weekly benefit = 66.7% of AWW, capped at state max
  const weeklyBenefit = Math.min(wage * 0.667, stateMax)

  // TTD/TPD: weeks × weekly benefit
  const tempBenefits = injuryType === 'ttd' || injuryType === 'tpd'
    ? weeklyBenefit * weeks
    : 0

  // Permanent disability
  const permWeekMult = WEEK_MULTIPLIERS[injuryType]
  const permanentDisability = injuryType === 'ppd' || injuryType === 'ptd'
    ? weeklyBenefit * (impairment / 100) * permWeekMult
    : 0

  const totalBenefits = tempBenefits + permanentDisability + med

  const atStateMax = weeklyBenefit >= stateMax

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className={sectionCls}>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Your Information</p>
            <div>
              <label className={labelCls}>State</label>
              <select value={stateAbbr} onChange={e => { setStateAbbr(e.target.value); save({ stateAbbr: e.target.value }) }} className={inputCls}>
                <option value="">Select state...</option>
                {STATE_LIST.map(s => <option key={s.abbr} value={s.abbr}>{s.name}</option>)}
              </select>
              {stateData && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {stateData.name} workers comp max: {fmt(stateMax)}/week
                </p>
              )}
            </div>
            <div>
              <label className={labelCls}>Average weekly wage (AWW) ($)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" min="0" value={avgWeeklyWage}
                  onChange={e => { setAvgWeeklyWage(e.target.value); save({ avgWeeklyWage: e.target.value }) }}
                  className={`${inputCls} pl-7`} />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Your average gross weekly earnings before injury. Weekly benefit = 66.7% of AWW.
              </p>
            </div>
            <div>
              <label className={labelCls}>Medical bills ($)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" min="0" value={medBills}
                  onChange={e => { setMedBills(e.target.value); save({ medBills: e.target.value }) }}
                  className={`${inputCls} pl-7`} />
              </div>
            </div>
          </div>

          <div className={sectionCls}>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Injury Type</p>
            <div className="space-y-2">
              {INJURY_TYPES.map(({ val, label, desc }) => (
                <button key={val}
                  onClick={() => { setInjuryType(val as typeof injuryType); save({ injuryType: val }) }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    injuryType === val ? 'bg-[#1e293b] text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}>
                  <span className="font-medium">{label}</span>
                  <span className={`block text-xs mt-0.5 ${injuryType === val ? 'text-slate-300' : 'text-gray-500'}`}>{desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={sectionCls}>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Disability Details</p>
            {(injuryType === 'ttd' || injuryType === 'tpd') && (
              <div>
                <label className={labelCls}>Weeks out of work</label>
                <input type="number" min="0" value={weeksOut}
                  onChange={e => { setWeeksOut(e.target.value); save({ weeksOut: e.target.value }) }}
                  className={inputCls} />
              </div>
            )}
            {(injuryType === 'ppd' || injuryType === 'ptd') && (
              <div>
                <label className={labelCls}>Impairment rating (%)</label>
                <input type="number" min="0" max="100" value={impairmentRating}
                  onChange={e => { setImpairmentRating(e.target.value); save({ impairmentRating: e.target.value }) }}
                  className={inputCls} />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Whole-person impairment rating assigned by a physician per AMA guidelines
                </p>
              </div>
            )}
          </div>

          <button onClick={() => setShowResults(true)} className="w-full py-3 rounded-xl bg-[#1e293b] text-white font-bold text-sm hover:bg-[#334155] transition">
            Calculate Workers Comp Benefits
          </button>
        </div>

        <div className="space-y-4">
          {showResults || wage > 0 ? (
            <>
              <div className="rounded-xl bg-[#1e293b]/10 dark:bg-[#1e293b]/40 border border-[#1e293b]/30 p-5">
                <p className="text-sm text-[#1e293b] dark:text-slate-300 font-medium mb-1">Total Estimated Workers Comp</p>
                <p className="text-4xl font-bold text-[#1e293b] dark:text-white">{fmt(totalBenefits)}</p>
              </div>

              <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Workers Comp Breakdown</p>
                <div className="space-y-2 text-sm">
                  {[
                    { label: 'Your average weekly wage', val: fmt(wage) },
                    { label: 'Weekly benefit (66.7% of AWW)', val: fmt(wage * 0.667) },
                    ...(atStateMax ? [{ label: `Capped at state maximum`, val: fmt(stateMax), warn: true }] : []),
                    { label: 'Actual weekly benefit', val: fmt(weeklyBenefit), bold: true },
                    ...(tempBenefits > 0 ? [{ label: `Temp. disability (${weeks} weeks × ${fmt(weeklyBenefit)})`, val: fmt(tempBenefits) }] : []),
                    ...(permanentDisability > 0 ? [{ label: `Permanent disability (${impairment}% impairment × ${permWeekMult} weeks)`, val: fmt(permanentDisability) }] : []),
                    { label: 'Medical benefits', val: fmt(med) },
                    { label: 'Total estimated workers comp', val: fmt(totalBenefits), bold: true, highlight: true },
                  ].map(({ label, val, bold, highlight, warn }) => (
                    <div key={label} className={`flex justify-between ${bold ? 'border-t border-gray-100 dark:border-gray-600 pt-2 mt-1' : ''}`}>
                      <span className={`${bold ? 'font-semibold text-gray-800 dark:text-[#e2e8f0]' : 'text-gray-600 dark:text-gray-400'} ${warn ? 'text-amber-600 dark:text-amber-400' : ''}`}>{label}</span>
                      <span className={`font-medium ${highlight ? 'text-[#1e293b] dark:text-slate-200' : warn ? 'text-amber-600 dark:text-amber-400' : 'text-gray-800 dark:text-[#e2e8f0]'}`}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {stateData && (
                <div className="rounded-xl border border-blue-100 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/30 p-4">
                  <p className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-1">{stateData.name} Workers Comp Info</p>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    In {stateData.name}, workers comp pays 66.7% of your average weekly wage up to {fmt(stateMax)}/week. Your employer cannot retaliate against you for filing a workers comp claim — that is illegal under state law.
                  </p>
                </div>
              )}

              <AffiliateCTA headline="Questions About Your Workers Comp Claim?" />
              <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">Estimates for educational purposes only. Workers comp benefits vary by state and case specifics. Consult a licensed workers compensation attorney.</p>
            </>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 p-10 text-center">
              <div className="text-4xl mb-3">🏥</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Enter your wage and injury information to calculate your workers compensation benefits.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
