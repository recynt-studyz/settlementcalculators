'use client'

import { useState, useEffect } from 'react'
import { STATES, STATE_LIST, getFaultReduction, fmt } from '@/lib/settlementData'
import AffiliateCTA from './AffiliateCTA'

const STORAGE_KEY = 'sc-slipfall'

const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#1e293b]'
const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
const sectionCls = 'rounded-xl border border-gray-100 dark:border-gray-700 p-4 space-y-3'

const LOCATIONS = ['Retail store', 'Restaurant', 'Grocery store', 'Private property', 'Government property', 'Sidewalk/public', 'Workplace']
const NOTICES = ['Owner knew about hazard', 'Owner should have known', 'Unknown']
const INJURY_LOCS = ['Head/neck', 'Back/spine', 'Hip/knee', 'Wrist/arm', 'Ankle/foot', 'Multiple areas']

export default function SlipFallCalculator({ defaultState }: { defaultState?: string }) {
  const [medBills, setMedBills] = useState('15000')
  const [futureMed, setFutureMed] = useState('5000')
  const [lostWages, setLostWages] = useState('8000')
  const [futureLost, setFutureLost] = useState('3000')
  const [severity, setSeverity] = useState<'minor' | 'moderate' | 'severe'>('moderate')
  const [annualIncome, setAnnualIncome] = useState('52000')
  const [recoveryWeeks, setRecoveryWeeks] = useState('12')
  const [stateAbbr, setStateAbbr] = useState(defaultState ?? '')
  const [faultPct, setFaultPct] = useState('0')
  const [attorney, setAttorney] = useState<'pre' | 'lit' | 'none'>('pre')
  const [location, setLocation] = useState(LOCATIONS[0])
  const [notice, setNotice] = useState(NOTICES[0])
  const [injuryLoc, setInjuryLoc] = useState(INJURY_LOCS[0])
  const [documented, setDocumented] = useState(false)
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
        if (p.severity) setSeverity(p.severity)
        if (p.annualIncome) setAnnualIncome(p.annualIncome)
        if (p.recoveryWeeks) setRecoveryWeeks(p.recoveryWeeks)
        if (p.stateAbbr && !defaultState) setStateAbbr(p.stateAbbr)
        if (p.faultPct) setFaultPct(p.faultPct)
        if (p.attorney) setAttorney(p.attorney)
        if (p.location) setLocation(p.location)
        if (p.notice) setNotice(p.notice)
        if (p.injuryLoc) setInjuryLoc(p.injuryLoc)
        if (p.documented !== undefined) setDocumented(p.documented)
      }
    } catch { /* ignore */ }
  }, [defaultState])

  const save = (updates: Record<string, unknown>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }

  const ranges = {
    minor:    { low: 1.5, high: 2.5 },
    moderate: { low: 2.5, high: 4.5 },
    severe:   { low: 4.5, high: 8.0 },
  }

  // Premises liability strength
  const caseStrength = (() => {
    let score = 0
    if (notice === 'Owner knew about hazard') score += 2
    if (notice === 'Owner should have known') score += 1
    if (documented) score += 1
    if (['Retail store', 'Grocery store', 'Restaurant'].includes(location)) score += 1
    if (injuryLoc === 'Back/spine' || injuryLoc === 'Head/neck') score += 1
    if (parseFloat(faultPct) === 0) score += 1
    return score >= 5 ? 'Strong' : score >= 3 ? 'Moderate' : 'Weak'
  })()

  const range = ranges[severity]
  const med = parseFloat(medBills) || 0
  const futMed = parseFloat(futureMed) || 0
  const wages = parseFloat(lostWages) || 0
  const futWages = parseFloat(futureLost) || 0
  const weeks = parseFloat(recoveryWeeks) || 0
  const income = parseFloat(annualIncome) || 52000
  const fault = parseFloat(faultPct) || 0

  const specialDamages = med + futMed + wages + futWages
  const psLow = specialDamages * range.low
  const psHigh = specialDamages * range.high
  const grossLow = specialDamages + psLow
  const grossHigh = specialDamages + psHigh

  const dailyRate = income / 365
  const grossPerDiem = specialDamages + dailyRate * (weeks * 7)

  const contingency = attorney === 'pre' ? 0.33 : attorney === 'lit' ? 0.40 : 0
  const attyLow = grossLow * contingency
  const attyHigh = grossHigh * contingency
  const medLien = med * 0.30

  const netLow = Math.max(0, grossLow - attyLow - medLien)
  const netHigh = Math.max(0, grossHigh - attyHigh - medLien)

  const stateData = stateAbbr ? STATES[stateAbbr] : null
  const faultRule = stateData?.faultRule ?? 'modified_51'
  const faultReduced = fault > 0 ? getFaultReduction(netLow, netHigh, fault, faultRule) : null
  const finalLow = faultReduced ? faultReduced[0] : netLow
  const finalHigh = faultReduced ? faultReduced[1] : netHigh

  const strengthColor = caseStrength === 'Strong' ? 'text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800'
    : caseStrength === 'Moderate' ? 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800'
    : 'text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800'

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className={sectionCls}>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Your Damages</p>
            {[
              { label: 'Medical bills to date ($)', val: medBills, set: setMedBills, key: 'medBills' },
              { label: 'Estimated future medical ($)', val: futureMed, set: setFutureMed, key: 'futureMed' },
              { label: 'Lost wages to date ($)', val: lostWages, set: setLostWages, key: 'lostWages' },
              { label: 'Estimated future lost wages ($)', val: futureLost, set: setFutureLost, key: 'futureLost' },
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
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Premises Liability Factors</p>
            <div>
              <label className={labelCls}>Location type</label>
              <select value={location} onChange={e => { setLocation(e.target.value); save({ location: e.target.value }) }} className={inputCls}>
                {LOCATIONS.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Did the owner know about the hazard?</label>
              <select value={notice} onChange={e => { setNotice(e.target.value); save({ notice: e.target.value }) }} className={inputCls}>
                {NOTICES.map(n => <option key={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Primary injury location</label>
              <select value={injuryLoc} onChange={e => { setInjuryLoc(e.target.value); save({ injuryLoc: e.target.value }) }} className={inputCls}>
                {INJURY_LOCS.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="documented" checked={documented}
                onChange={e => { setDocumented(e.target.checked); save({ documented: e.target.checked }) }}
                className="rounded border-gray-300 w-4 h-4 accent-[#1e293b]" />
              <label htmlFor="documented" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                Documented the scene (photos, incident report)
              </label>
            </div>
          </div>

          <div className={sectionCls}>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Injury & Case Details</p>
            <div>
              <label className={labelCls}>Injury severity</label>
              <div className="grid grid-cols-3 gap-2">
                {(['minor', 'moderate', 'severe'] as const).map(s => (
                  <button key={s} onClick={() => { setSeverity(s); save({ severity: s }) }}
                    className={`px-2 py-2 rounded-lg text-xs font-medium capitalize transition-colors ${
                      severity === s ? 'bg-[#1e293b] text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                    }`}>{s}</button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Annual income ($)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input type="number" min="0" value={annualIncome}
                    onChange={e => { setAnnualIncome(e.target.value); save({ annualIncome: e.target.value }) }}
                    className={`${inputCls} pl-7`} />
                </div>
              </div>
              <div>
                <label className={labelCls}>Recovery weeks</label>
                <input type="number" min="0" value={recoveryWeeks}
                  onChange={e => { setRecoveryWeeks(e.target.value); save({ recoveryWeeks: e.target.value }) }}
                  className={inputCls} />
              </div>
            </div>
            <div>
              <label className={labelCls}>State</label>
              <select value={stateAbbr} onChange={e => { setStateAbbr(e.target.value); save({ stateAbbr: e.target.value }) }} className={inputCls}>
                <option value="">Select state...</option>
                {STATE_LIST.map(s => <option key={s.abbr} value={s.abbr}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Your fault % (if any)</label>
              <input type="number" min="0" max="100" value={faultPct}
                onChange={e => { setFaultPct(e.target.value); save({ faultPct: e.target.value }) }}
                className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Attorney representation</label>
              <div className="grid grid-cols-3 gap-2">
                {[{ val: 'pre' as const, label: 'Pre-lit (33%)' }, { val: 'lit' as const, label: 'Litigation (40%)' }, { val: 'none' as const, label: 'Pro se' }].map(opt => (
                  <button key={opt.val} onClick={() => { setAttorney(opt.val); save({ attorney: opt.val }) }}
                    className={`px-2 py-2 rounded-lg text-xs font-medium transition-colors ${
                      attorney === opt.val ? 'bg-[#1e293b] text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                    }`}>{opt.label}</button>
                ))}
              </div>
            </div>
          </div>

          <button onClick={() => setShowResults(true)} className="w-full py-3 rounded-xl bg-[#1e293b] text-white font-bold text-sm hover:bg-[#334155] transition">
            Calculate My Slip & Fall Settlement
          </button>
        </div>

        <div className="space-y-4">
          {showResults || specialDamages > 0 ? (
            <>
              <div className={`rounded-xl border p-4 ${strengthColor}`}>
                <p className="text-sm font-semibold mb-1">Premises Liability Assessment</p>
                <p className="text-2xl font-bold">{caseStrength} Case</p>
                <p className="text-xs mt-1">
                  {caseStrength === 'Strong' ? 'Strong evidence of liability. Property owner knew or should have known about the hazard.' :
                   caseStrength === 'Moderate' ? 'Moderate liability. Evidence could support a claim but may face defenses.' :
                   'Liability may be difficult to prove. Consider whether negligence can be established.'}
                </p>
              </div>

              <div className="rounded-xl bg-[#1e293b]/10 dark:bg-[#1e293b]/40 border border-[#1e293b]/30 p-5">
                <p className="text-sm text-[#1e293b] dark:text-slate-300 font-medium mb-1">Estimated Settlement Range</p>
                <p className="text-4xl font-bold text-[#1e293b] dark:text-white">{fmt(finalLow)} – {fmt(finalHigh)}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Net to you after attorney fees and medical liens</p>
              </div>

              <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Settlement Breakdown</p>
                <div className="space-y-2 text-sm">
                  {[
                    { label: 'Special damages', valLow: specialDamages, valHigh: null },
                    { label: `Pain & suffering (${range.low}–${range.high}x)`, valLow: psLow, valHigh: psHigh },
                    { label: 'Gross settlement', valLow: grossLow, valHigh: grossHigh, bold: true },
                    ...(attorney !== 'none' ? [{ label: `Attorney fees (${(contingency*100).toFixed(0)}%)`, valLow: -attyLow, valHigh: -attyHigh }] : []),
                    { label: 'Medical lien estimate', valLow: -medLien, valHigh: null },
                    { label: 'Net to you', valLow: netLow, valHigh: netHigh, bold: true, highlight: true },
                    ...(fault > 0 && faultReduced ? [{ label: `After ${fault}% fault reduction`, valLow: faultReduced[0], valHigh: faultReduced[1], bold: true, highlight: true }] : []),
                  ].map(({ label, valLow, valHigh, bold, highlight }) => (
                    <div key={label} className={`flex justify-between ${bold ? 'border-t border-gray-100 dark:border-gray-600 pt-2 mt-1' : ''}`}>
                      <span className={bold ? 'font-semibold text-gray-800 dark:text-[#e2e8f0]' : 'text-gray-600 dark:text-gray-400'}>{label}</span>
                      <span className={`font-medium ${highlight ? 'text-[#1e293b] dark:text-slate-200' : 'text-gray-800 dark:text-[#e2e8f0]'}`}>
                        {valHigh !== null && valHigh !== valLow ? `${fmt(valLow)} – ${fmt(valHigh)}` : fmt(valLow)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Per Diem Comparison</p>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Per diem method ({weeks} weeks × {fmt(dailyRate)}/day): <span className="font-medium text-gray-800 dark:text-[#e2e8f0]">{fmt(grossPerDiem)}</span>
                </div>
              </div>

              {fault > 0 && stateData && (
                <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-4">
                  <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">Comparative Fault Adjustment</p>
                  <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                    {stateData.name}: {stateData.faultRuleLabel}. At {fault}% fault, your recovery adjusts to {faultReduced && faultReduced[0] > 0 ? `${fmt(faultReduced[0])}–${fmt(faultReduced[1])}` : '$0 (recovery barred)'}.
                  </p>
                </div>
              )}

              <AffiliateCTA headline="Get a Free Slip & Fall Case Review" />
              <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">Estimates for educational purposes only. Not legal advice. Consult a licensed premises liability attorney.</p>
            </>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 p-10 text-center">
              <div className="text-4xl mb-3">⚠️</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Enter your damages to see your estimated slip and fall settlement range.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
