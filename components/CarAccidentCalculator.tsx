'use client'

import { useState, useEffect } from 'react'
import { STATES, STATE_LIST, getFaultReduction, fmt } from '@/lib/settlementData'
import AffiliateCTA from './AffiliateCTA'

const STORAGE_KEY = 'sc-caraccident'

const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#1e293b] dark:focus:ring-slate-400'
const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
const sectionCls = 'rounded-xl border border-gray-100 dark:border-gray-700 p-4 space-y-3'

export default function CarAccidentCalculator({ defaultState }: { defaultState?: string }) {
  const [medBills, setMedBills] = useState('15000')
  const [futureMed, setFutureMed] = useState('5000')
  const [lostWages, setLostWages] = useState('8000')
  const [futureLost, setFutureLost] = useState('3000')
  const [vehicleDamage, setVehicleDamage] = useState('8000')
  const [rentalCosts, setRentalCosts] = useState('800')
  const [severity, setSeverity] = useState<'minor' | 'moderate' | 'severe'>('moderate')
  const [recoveryWeeks, setRecoveryWeeks] = useState('12')
  const [annualIncome, setAnnualIncome] = useState('52000')
  const [stateAbbr, setStateAbbr] = useState(defaultState ?? '')
  const [faultPct, setFaultPct] = useState('0')
  const [attorney, setAttorney] = useState<'pre' | 'lit' | 'none'>('pre')
  const [isRideshare, setIsRideshare] = useState(false)
  const [isCommercial, setIsCommercial] = useState(false)
  const [hasUMUIM, setHasUMUIM] = useState(false)
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
        if (p.vehicleDamage) setVehicleDamage(p.vehicleDamage)
        if (p.rentalCosts) setRentalCosts(p.rentalCosts)
        if (p.severity) setSeverity(p.severity)
        if (p.recoveryWeeks) setRecoveryWeeks(p.recoveryWeeks)
        if (p.annualIncome) setAnnualIncome(p.annualIncome)
        if (p.stateAbbr && !defaultState) setStateAbbr(p.stateAbbr)
        if (p.faultPct) setFaultPct(p.faultPct)
        if (p.attorney) setAttorney(p.attorney)
        if (p.isRideshare !== undefined) setIsRideshare(p.isRideshare)
        if (p.isCommercial !== undefined) setIsCommercial(p.isCommercial)
        if (p.hasUMUIM !== undefined) setHasUMUIM(p.hasUMUIM)
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

  const multiplierRanges = {
    minor:    { low: 1.5, high: 3.0 },
    moderate: { low: 3.0, high: 5.0 },
    severe:   { low: 5.0, high: 10.0 },
  }

  // Commercial/rideshare boosts multiplier (higher limits available)
  const range = multiplierRanges[severity]
  const boost = isCommercial ? 0.5 : isRideshare ? 0.25 : 0
  const multLow = range.low + boost
  const multHigh = range.high + boost

  const med = parseFloat(medBills) || 0
  const futMed = parseFloat(futureMed) || 0
  const wages = parseFloat(lostWages) || 0
  const futWages = parseFloat(futureLost) || 0
  const vehicle = parseFloat(vehicleDamage) || 0
  const rental = parseFloat(rentalCosts) || 0
  const weeks = parseFloat(recoveryWeeks) || 0
  const income = parseFloat(annualIncome) || 52000
  const fault = parseFloat(faultPct) || 0
  const policy = parseFloat(policyLimit) || 100000

  const injuryDamages = med + futMed + wages + futWages
  const propertyDamages = vehicle + rental  // Separate property damage claim
  const specialDamages = injuryDamages

  const psLow = specialDamages * multLow
  const psHigh = specialDamages * multHigh
  const grossLow = specialDamages + psLow
  const grossHigh = specialDamages + psHigh

  const dailyRate = income / 365
  const perDiemPS = dailyRate * (weeks * 7)
  const grossPerDiem = specialDamages + perDiemPS

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

  const exceedsPolicy = hasPolicyLimit && grossHigh > policy
  const totalDamages = specialDamages + propertyDamages

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className={sectionCls}>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Injury & Medical Damages</p>
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
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Vehicle & Property Damages</p>
            {[
              { label: 'Vehicle damage ($)', val: vehicleDamage, set: setVehicleDamage, key: 'vehicleDamage' },
              { label: 'Rental car costs ($)', val: rentalCosts, set: setRentalCosts, key: 'rentalCosts' },
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
            <div className="space-y-2">
              {[
                { id: 'rideshare', label: 'Rideshare vehicle involved (Uber/Lyft)', val: isRideshare, set: setIsRideshare, key: 'isRideshare' },
                { id: 'commercial', label: 'Commercial vehicle involved (truck/bus)', val: isCommercial, set: setIsCommercial, key: 'isCommercial' },
                { id: 'umuim', label: 'I have UM/UIM (uninsured motorist) coverage', val: hasUMUIM, set: setHasUMUIM, key: 'hasUMUIM' },
              ].map(({ id, label, val, set, key }) => (
                <div key={id} className="flex items-center gap-2">
                  <input type="checkbox" id={id} checked={val}
                    onChange={e => { set(e.target.checked); save({ [key]: e.target.checked }) }}
                    className="rounded border-gray-300 dark:border-gray-600 w-4 h-4 accent-[#1e293b]" />
                  <label htmlFor={id} className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">{label}</label>
                </div>
              ))}
            </div>
          </div>

          <div className={sectionCls}>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Injury Severity</p>
            <div className="grid grid-cols-3 gap-2">
              {(['minor', 'moderate', 'severe'] as const).map(s => (
                <button key={s}
                  onClick={() => { setSeverity(s); save({ severity: s }) }}
                  className={`px-2 py-2 rounded-lg text-xs font-medium transition-colors capitalize ${
                    severity === s ? 'bg-[#1e293b] text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                  }`}>{s}</button>
              ))}
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
          </div>

          <div className={sectionCls}>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Case Details</p>
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
                {[
                  { val: 'pre' as const, label: 'Pre-lit (33%)' },
                  { val: 'lit' as const, label: 'Litigation (40%)' },
                  { val: 'none' as const, label: 'Pro se' },
                ].map(opt => (
                  <button key={opt.val}
                    onClick={() => { setAttorney(opt.val); save({ attorney: opt.val }) }}
                    className={`px-2 py-2 rounded-lg text-xs font-medium transition-colors ${
                      attorney === opt.val ? 'bg-[#1e293b] text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                    }`}>{opt.label}</button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="carPolicyLimit" checked={hasPolicyLimit}
                onChange={e => { setHasPolicyLimit(e.target.checked); save({ hasPolicyLimit: e.target.checked }) }}
                className="rounded border-gray-300 w-4 h-4 accent-[#1e293b]" />
              <label htmlFor="carPolicyLimit" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">Policy limit known</label>
            </div>
            {hasPolicyLimit && (
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" min="0" value={policyLimit}
                  onChange={e => { setPolicyLimit(e.target.value); save({ policyLimit: e.target.value }) }}
                  className={`${inputCls} pl-7`} />
              </div>
            )}
          </div>

          <button onClick={() => setShowResults(true)} className="w-full py-3 rounded-xl bg-[#1e293b] text-white font-bold text-sm hover:bg-[#334155] transition">
            Calculate My Car Accident Settlement
          </button>
        </div>

        <div className="space-y-4">
          {showResults || totalDamages > 0 ? (
            <>
              <div className="rounded-xl bg-[#1e293b]/10 dark:bg-[#1e293b]/40 border border-[#1e293b]/30 p-5">
                <p className="text-sm text-[#1e293b] dark:text-slate-300 font-medium mb-1">Estimated Settlement Range</p>
                <p className="text-4xl font-bold text-[#1e293b] dark:text-white">{fmt(finalLow)} – {fmt(finalHigh)}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Injury claim, net after attorney fees and medical liens</p>
              </div>

              <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Settlement Breakdown</p>
                <div className="space-y-2 text-sm">
                  {[
                    { label: 'Injury special damages', valLow: injuryDamages, valHigh: null },
                    { label: `Pain & suffering (${multLow}–${multHigh}x)`, valLow: psLow, valHigh: psHigh },
                    { label: 'Gross injury claim', valLow: grossLow, valHigh: grossHigh, bold: true },
                    ...(attorney !== 'none' ? [{ label: `Attorney fees (${(contingency*100).toFixed(0)}%)`, valLow: -attyLow, valHigh: -attyHigh }] : []),
                    { label: 'Medical lien estimate', valLow: -medLien, valHigh: null },
                    { label: 'Net injury claim', valLow: netLow, valHigh: netHigh, bold: true, highlight: true },
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
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Property Damage Claim (separate)</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Vehicle damage + rental: {fmt(propertyDamages)}</span>
                  <span className="font-bold text-gray-800 dark:text-[#e2e8f0]">{fmt(propertyDamages)}</span>
                </div>
                {isRideshare && <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">Rideshare: Uber/Lyft carry $1M liability policies — significantly higher limits than personal auto.</p>}
                {isCommercial && <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">Commercial vehicle: Federal regulations require $750K–$5M in liability coverage for commercial trucks.</p>}
                {hasUMUIM && <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">UM/UIM coverage: If the at-fault driver is uninsured or underinsured, your own UM/UIM policy may cover the gap up to your policy limits.</p>}
              </div>

              {exceedsPolicy && (
                <div className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 p-4">
                  <p className="text-sm font-semibold text-red-700 dark:text-red-300">Policy Limit Warning</p>
                  <p className="text-sm text-red-600 dark:text-red-400 mt-1">Estimated damages exceed the {fmt(policy)} policy limit. Recovery may be capped at policy limits unless the defendant has personal assets.</p>
                </div>
              )}

              <div className="rounded-xl border border-blue-100 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/30 p-4">
                <p className="text-xs text-blue-700 dark:text-blue-400">
                  Car accident victims who hire an attorney receive 3.5x more compensation on average than those who negotiate alone — Insurance Research Council 2024.
                </p>
              </div>

              <AffiliateCTA headline="Get a Free Car Accident Case Review" />

              <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
                Estimates for educational purposes only. Not legal advice. Consult a licensed personal injury attorney for an accurate case evaluation.
              </p>
            </>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 p-10 text-center">
              <div className="text-4xl mb-3">🚗</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Enter your damages to see your estimated car accident settlement range.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
