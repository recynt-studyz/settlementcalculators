'use client'

import { useState, useEffect } from 'react'
import { STATES, STATE_LIST, getFaultReduction, fmt } from '@/lib/settlementData'
import AffiliateCTA from './AffiliateCTA'

const STORAGE_KEY = 'sc-personalinjury'

const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#1e293b] dark:focus:ring-slate-400'
const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
const sectionCls = 'rounded-xl border border-gray-100 dark:border-gray-700 p-4 space-y-3'

export default function PersonalInjuryCalculator({ defaultState }: { defaultState?: string }) {
  const [medBills, setMedBills] = useState('15000')
  const [futureMed, setFutureMed] = useState('5000')
  const [lostWages, setLostWages] = useState('8000')
  const [futureLost, setFutureLost] = useState('3000')
  const [propDamage, setPropDamage] = useState('5000')
  const [severity, setSeverity] = useState<'minor' | 'moderate' | 'severe'>('moderate')
  const [multiplierOverride, setMultiplierOverride] = useState('')
  const [recoveryWeeks, setRecoveryWeeks] = useState('12')
  const [annualIncome, setAnnualIncome] = useState('52000')
  const [stateAbbr, setStateAbbr] = useState(defaultState ?? '')
  const [faultPct, setFaultPct] = useState('0')
  const [attorney, setAttorney] = useState<'pre' | 'lit' | 'none'>('pre')
  const [hasPolicyLimit, setHasPolicyLimit] = useState(false)
  const [policyLimit, setPolicyLimit] = useState('100000')
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.medBills) setMedBills(p.medBills)
        if (p.futureMed) setFutureMed(p.futureMed)
        if (p.lostWages) setLostWages(p.lostWages)
        if (p.futureLost) setFutureLost(p.futureLost)
        if (p.propDamage) setPropDamage(p.propDamage)
        if (p.severity) setSeverity(p.severity)
        if (p.multiplierOverride) setMultiplierOverride(p.multiplierOverride)
        if (p.recoveryWeeks) setRecoveryWeeks(p.recoveryWeeks)
        if (p.annualIncome) setAnnualIncome(p.annualIncome)
        if (p.stateAbbr && !defaultState) setStateAbbr(p.stateAbbr)
        if (p.faultPct) setFaultPct(p.faultPct)
        if (p.attorney) setAttorney(p.attorney)
        if (p.hasPolicyLimit !== undefined) setHasPolicyLimit(p.hasPolicyLimit)
        if (p.policyLimit) setPolicyLimit(p.policyLimit)
      }
    } catch { /* ignore */ }
  }, [defaultState])

  const save = (updates: Record<string, unknown>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }

  // Multiplier ranges
  const multiplierRanges = {
    minor:    { low: 1.5, high: 3.0, label: 'Minor (sprains, bruising, soft tissue)' },
    moderate: { low: 3.0, high: 5.0, label: 'Moderate (fractures, surgery needed)' },
    severe:   { low: 5.0, high: 10.0, label: 'Severe (TBI, spinal injury, permanent disability)' },
  }

  const range = multiplierRanges[severity]
  const overrideVal = parseFloat(multiplierOverride)
  const multLow = !isNaN(overrideVal) && multiplierOverride !== '' ? Math.max(1, overrideVal * 0.85) : range.low
  const multHigh = !isNaN(overrideVal) && multiplierOverride !== '' ? Math.min(15, overrideVal * 1.15) : range.high

  // Core values
  const med = parseFloat(medBills) || 0
  const futMed = parseFloat(futureMed) || 0
  const wages = parseFloat(lostWages) || 0
  const futWages = parseFloat(futureLost) || 0
  const prop = parseFloat(propDamage) || 0
  const weeks = parseFloat(recoveryWeeks) || 0
  const income = parseFloat(annualIncome) || 52000
  const fault = parseFloat(faultPct) || 0
  const policy = parseFloat(policyLimit) || 100000

  const specialDamages = med + futMed + wages + futWages + prop

  // Multiplier method
  const psLow = specialDamages * multLow
  const psHigh = specialDamages * multHigh
  const grossLow = specialDamages + psLow
  const grossHigh = specialDamages + psHigh

  // Per diem method
  const dailyRate = income / 365
  const perDiemPS = dailyRate * (weeks * 7)
  const grossPerDiem = specialDamages + perDiemPS

  // Attorney fees
  const contingency = attorney === 'pre' ? 0.33 : attorney === 'lit' ? 0.40 : 0
  const attyLow = grossLow * contingency
  const attyHigh = grossHigh * contingency

  // Medical lien (typically reduced to 30% of original bills)
  const medLien = med * 0.30

  // Net to client
  const netLow = Math.max(0, grossLow - attyLow - medLien)
  const netHigh = Math.max(0, grossHigh - attyHigh - medLien)

  // Fault reduction
  const stateData = stateAbbr ? STATES[stateAbbr] : null
  const faultRule = stateData?.faultRule ?? 'modified_51'
  const faultReduced = fault > 0 ? getFaultReduction(netLow, netHigh, fault, faultRule) : null

  const finalLow = faultReduced ? faultReduced[0] : netLow
  const finalHigh = faultReduced ? faultReduced[1] : netHigh

  // Policy limit warning
  const exceedsPolicy = hasPolicyLimit && grossHigh > policy

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* INPUTS */}
        <div className="space-y-4">
          {/* Your Damages */}
          <div className={sectionCls}>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Your Economic Damages</p>
            {[
              { label: 'Medical bills to date ($)', val: medBills, set: setMedBills, key: 'medBills' },
              { label: 'Estimated future medical ($)', val: futureMed, set: setFutureMed, key: 'futureMed' },
              { label: 'Lost wages to date ($)', val: lostWages, set: setLostWages, key: 'lostWages' },
              { label: 'Estimated future lost wages ($)', val: futureLost, set: setFutureLost, key: 'futureLost' },
              { label: 'Property damage ($)', val: propDamage, set: setPropDamage, key: 'propDamage' },
            ].map(({ label, val, set, key }) => (
              <div key={key}>
                <label className={labelCls}>{label}</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input
                    type="number" min="0" value={val}
                    onChange={e => { set(e.target.value); save({ [key]: e.target.value }) }}
                    className={`${inputCls} pl-7`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Injury Severity */}
          <div className={sectionCls}>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Injury Severity</p>
            <div className="space-y-2">
              {(['minor', 'moderate', 'severe'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => { setSeverity(s); setMultiplierOverride(''); save({ severity: s, multiplierOverride: '' }) }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    severity === s
                      ? 'bg-[#1e293b] text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <span className="font-medium capitalize">{s}</span>
                  <span className={`ml-2 text-xs ${severity === s ? 'text-slate-300' : 'text-gray-500'}`}>
                    {multiplierRanges[s].low}–{multiplierRanges[s].high}x — {multiplierRanges[s].label}
                  </span>
                </button>
              ))}
            </div>
            <div>
              <label className={labelCls}>Pain & Suffering Multiplier (override)</label>
              <input
                type="number" min="1" max="15" step="0.5"
                value={multiplierOverride}
                onChange={e => { setMultiplierOverride(e.target.value); save({ multiplierOverride: e.target.value }) }}
                placeholder={`Auto: ${range.low}–${range.high}x`}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Annual income (for per diem calculation)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="number" min="0" value={annualIncome}
                  onChange={e => { setAnnualIncome(e.target.value); save({ annualIncome: e.target.value }) }}
                  className={`${inputCls} pl-7`}
                />
              </div>
            </div>
            <div>
              <label className={labelCls}>Recovery time (weeks)</label>
              <input
                type="number" min="0" value={recoveryWeeks}
                onChange={e => { setRecoveryWeeks(e.target.value); save({ recoveryWeeks: e.target.value }) }}
                className={inputCls}
              />
            </div>
          </div>

          {/* Case Details */}
          <div className={sectionCls}>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Case Details</p>
            <div>
              <label className={labelCls}>State</label>
              <select
                value={stateAbbr}
                onChange={e => { setStateAbbr(e.target.value); save({ stateAbbr: e.target.value }) }}
                className={inputCls}
              >
                <option value="">Select state...</option>
                {STATE_LIST.map(s => (
                  <option key={s.abbr} value={s.abbr}>{s.name}</option>
                ))}
              </select>
              {stateData && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {stateData.name} uses {stateData.faultRuleLabel}
                </p>
              )}
            </div>
            <div>
              <label className={labelCls}>Your fault % (if any)</label>
              <input
                type="number" min="0" max="100" value={faultPct}
                onChange={e => { setFaultPct(e.target.value); save({ faultPct: e.target.value }) }}
                className={inputCls}
                placeholder="0"
              />
            </div>
            <div>
              <label className={labelCls}>Attorney representation</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { val: 'pre' as const, label: 'Pre-litigation (33%)' },
                  { val: 'lit' as const, label: 'In litigation (40%)' },
                  { val: 'none' as const, label: 'No attorney (pro se)' },
                ].map(opt => (
                  <button
                    key={opt.val}
                    onClick={() => { setAttorney(opt.val); save({ attorney: opt.val }) }}
                    className={`px-2 py-2 rounded-lg text-xs font-medium transition-colors ${
                      attorney === opt.val
                        ? 'bg-[#1e293b] text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox" id="policyLimit"
                checked={hasPolicyLimit}
                onChange={e => { setHasPolicyLimit(e.target.checked); save({ hasPolicyLimit: e.target.checked }) }}
                className="rounded border-gray-300 dark:border-gray-600 w-4 h-4 accent-[#1e293b]"
              />
              <label htmlFor="policyLimit" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                Insurance policy limit known
              </label>
            </div>
            {hasPolicyLimit && (
              <div>
                <label className={labelCls}>Policy limit ($)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input
                    type="number" min="0" value={policyLimit}
                    onChange={e => { setPolicyLimit(e.target.value); save({ policyLimit: e.target.value }) }}
                    className={`${inputCls} pl-7`}
                  />
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setShowResults(true)}
            className="w-full py-3 rounded-xl bg-[#1e293b] text-white font-bold text-sm hover:bg-[#334155] transition"
          >
            Calculate My Settlement Estimate
          </button>
        </div>

        {/* RESULTS */}
        <div className="space-y-4">
          {showResults || specialDamages > 0 ? (
            <>
              {/* Main result */}
              <div className="rounded-xl bg-[#1e293b]/10 dark:bg-[#1e293b]/40 border border-[#1e293b]/30 p-5">
                <p className="text-sm text-[#1e293b] dark:text-slate-300 font-medium mb-1">Estimated Settlement Range</p>
                <p className="text-4xl font-bold text-[#1e293b] dark:text-white">
                  {fmt(finalLow)} – {fmt(finalHigh)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Net to you after attorney fees and medical lien estimate</p>
                {faultReduced && faultReduced[0] === 0 && (
                  <p className="mt-2 text-sm font-semibold text-red-600 dark:text-red-400">
                    At {fault}% fault, {stateData?.name ?? 'your state'}&apos;s {stateData?.faultRuleLabel?.split('—')[0]} bars recovery entirely.
                  </p>
                )}
              </div>

              {/* Breakdown */}
              <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Settlement Breakdown</p>
                <div className="space-y-2">
                  {[
                    { label: 'Special damages (economic)', valLow: specialDamages, valHigh: null },
                    { label: `Pain & suffering (${multLow}–${multHigh}x multiplier)`, valLow: psLow, valHigh: psHigh },
                    { label: 'Gross settlement estimate', valLow: grossLow, valHigh: grossHigh, bold: true },
                    ...(attorney !== 'none' ? [{ label: `Attorney fees (${(contingency * 100).toFixed(0)}% contingency)`, valLow: -attyLow, valHigh: -attyHigh }] : []),
                    { label: 'Medical lien estimate (reduced 30%)', valLow: -medLien, valHigh: null },
                    { label: 'Net to you', valLow: netLow, valHigh: netHigh, bold: true, highlight: true },
                    ...(fault > 0 && faultReduced ? [{ label: `After ${fault}% fault reduction`, valLow: faultReduced[0], valHigh: faultReduced[1], bold: true, highlight: true }] : []),
                  ].map(({ label, valLow, valHigh, bold, highlight }) => (
                    <div key={label} className={`flex justify-between text-sm ${bold ? 'border-t border-gray-100 dark:border-gray-600 pt-2 mt-1' : ''}`}>
                      <span className={bold ? 'font-semibold text-gray-800 dark:text-[#e2e8f0]' : 'text-gray-600 dark:text-gray-400'}>{label}</span>
                      <span className={`font-medium ${highlight ? 'text-[#1e293b] dark:text-slate-200' : 'text-gray-800 dark:text-[#e2e8f0]'}`}>
                        {valHigh !== null && valHigh !== valLow
                          ? `${fmt(valLow)} – ${fmt(valHigh)}`
                          : fmt(valLow)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Per diem comparison */}
              <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Both Calculation Methods</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Multiplier method (gross)</span>
                    <span className="font-medium text-gray-800 dark:text-[#e2e8f0]">{fmt(grossLow)} – {fmt(grossHigh)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Per diem method (gross, {weeks} wk × {fmt(dailyRate)}/day)</span>
                    <span className="font-medium text-gray-800 dark:text-[#e2e8f0]">{fmt(grossPerDiem)}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic">
                  Most personal injury attorneys use the higher of the two methods as a starting point for negotiation with the insurance adjuster.
                </p>
              </div>

              {/* Fault note */}
              {fault > 0 && stateData && (
                <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-4">
                  <p className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-1">Comparative Fault Adjustment</p>
                  <p className="text-sm text-amber-700 dark:text-amber-400">
                    {stateData.name} uses {stateData.faultRuleLabel}. At {fault}% fault, your estimated net settlement reduces from {fmt(netLow)}–{fmt(netHigh)} to{' '}
                    {faultReduced && faultReduced[0] > 0 ? `${fmt(faultReduced[0])}–${fmt(faultReduced[1])}` : '$0 (recovery barred)'}.
                  </p>
                </div>
              )}

              {/* Policy limit warning */}
              {exceedsPolicy && (
                <div className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 p-4">
                  <p className="text-sm font-semibold text-red-800 dark:text-red-300 mb-1">Policy Limit Warning</p>
                  <p className="text-sm text-red-700 dark:text-red-400">
                    Your estimated damages exceed the {fmt(policy)} policy limit. Maximum recovery may be capped at policy limits unless the defendant has personal assets that can be pursued through a judgment.
                  </p>
                </div>
              )}

              <AffiliateCTA headline="Want to know what your case is actually worth?" />

              <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
                These calculators provide estimates for educational purposes only. Settlement values depend on specific facts, jurisdiction, insurance limits, and negotiation. Results are not legal advice. Consult a licensed attorney in your state for an accurate case evaluation. Does not create an attorney-client relationship.
              </p>
            </>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 p-10 text-center">
              <div className="text-4xl mb-3">⚖️</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Enter your damages to the left and click Calculate to see your estimated settlement range.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
