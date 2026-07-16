'use client'

import { useState, useEffect } from 'react'
import { STATES, STATE_LIST, getFaultReduction, fmt } from '@/lib/settlementData'
import AffiliateCTA from './AffiliateCTA'

const STORAGE_KEY = 'sc-dogbite'

const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#1e293b]'
const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
const sectionCls = 'rounded-xl border border-gray-100 dark:border-gray-700 p-4 space-y-3'

const SEVERITY_LEVELS = [
  { val: 'minor', label: 'Minor puncture', mult: { low: 1.5, high: 3 } },
  { val: 'multiple', label: 'Multiple bites', mult: { low: 3, high: 5 } },
  { val: 'severe', label: 'Severe / disfiguring', mult: { low: 5, high: 8 } },
  { val: 'child', label: 'Child victim', mult: { low: 6, high: 10 } },
]

export default function DogBiteCalculator({ defaultState }: { defaultState?: string }) {
  const [stateAbbr, setStateAbbr] = useState(defaultState ?? '')
  const [medBills, setMedBills] = useState('5000')
  const [psychTreatment, setPsychTreatment] = useState('2000')
  const [lostWages, setLostWages] = useState('3000')
  const [severity, setSeverity] = useState('minor')
  const [hasScarring, setHasScarring] = useState(false)
  const [hasHomeowners, setHasHomeowners] = useState(true)
  const [faultPct, setFaultPct] = useState('0')
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.stateAbbr && !defaultState) setStateAbbr(p.stateAbbr)
        if (p.medBills) setMedBills(p.medBills)
        if (p.psychTreatment) setPsychTreatment(p.psychTreatment)
        if (p.lostWages) setLostWages(p.lostWages)
        if (p.severity) setSeverity(p.severity)
        if (p.hasScarring !== undefined) setHasScarring(p.hasScarring)
        if (p.hasHomeowners !== undefined) setHasHomeowners(p.hasHomeowners)
        if (p.faultPct) setFaultPct(p.faultPct)
      }
    } catch { /* ignore */ }
  }, [defaultState])

  const save = (updates: Record<string, unknown>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }

  const med = parseFloat(medBills) || 0
  const psych = parseFloat(psychTreatment) || 0
  const wages = parseFloat(lostWages) || 0
  const fault = parseFloat(faultPct) || 0

  const severityData = SEVERITY_LEVELS.find(s => s.val === severity) ?? SEVERITY_LEVELS[0]
  const scarBonus = hasScarring ? 1.5 : 1

  const specialDamages = med + psych + wages
  const multLow = severityData.mult.low * scarBonus
  const multHigh = severityData.mult.high * scarBonus

  const psLow = specialDamages * multLow
  const psHigh = specialDamages * multHigh
  const grossLow = specialDamages + psLow
  const grossHigh = specialDamages + psHigh

  const attyLow = grossLow * 0.33
  const attyHigh = grossHigh * 0.33
  const medLien = med * 0.30

  const netLow = Math.max(0, grossLow - attyLow - medLien)
  const netHigh = Math.max(0, grossHigh - attyHigh - medLien)

  const stateData = stateAbbr ? STATES[stateAbbr] : null
  const isStrictLiability = stateData?.dogBiteStrict ?? true
  const faultRule = stateData?.faultRule ?? 'modified_51'
  const faultReduced = fault > 0 ? getFaultReduction(netLow, netHigh, fault, faultRule) : null
  const finalLow = faultReduced ? faultReduced[0] : netLow
  const finalHigh = faultReduced ? faultReduced[1] : netHigh

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className={sectionCls}>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Your Damages</p>
            {[
              { label: 'Medical bills ($)', val: medBills, set: setMedBills, key: 'medBills' },
              { label: 'Psychological treatment ($)', val: psychTreatment, set: setPsychTreatment, key: 'psychTreatment' },
              { label: 'Lost wages ($)', val: lostWages, set: setLostWages, key: 'lostWages' },
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
                { id: 'scarring', label: 'Significant scarring / plastic surgery needed', val: hasScarring, set: setHasScarring, key: 'hasScarring' },
                { id: 'homeowners', label: 'Dog owner has homeowners insurance', val: hasHomeowners, set: setHasHomeowners, key: 'hasHomeowners' },
              ].map(({ id, label, val, set, key }) => (
                <div key={id} className="flex items-center gap-2">
                  <input type="checkbox" id={id} checked={val}
                    onChange={e => { set(e.target.checked); save({ [key]: e.target.checked }) }}
                    className="rounded border-gray-300 w-4 h-4 accent-[#1e293b]" />
                  <label htmlFor={id} className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">{label}</label>
                </div>
              ))}
            </div>
          </div>

          <div className={sectionCls}>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Bite Severity</p>
            <div className="space-y-2">
              {SEVERITY_LEVELS.map(({ val, label }) => (
                <button key={val}
                  onClick={() => { setSeverity(val); save({ severity: val }) }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    severity === val ? 'bg-[#1e293b] text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}>{label}</button>
              ))}
            </div>
          </div>

          <div className={sectionCls}>
            <div>
              <label className={labelCls}>State</label>
              <select value={stateAbbr} onChange={e => { setStateAbbr(e.target.value); save({ stateAbbr: e.target.value }) }} className={inputCls}>
                <option value="">Select state...</option>
                {STATE_LIST.map(s => <option key={s.abbr} value={s.abbr}>{s.name}</option>)}
              </select>
              {stateData && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {stateData.name}: {isStrictLiability ? 'Strict liability state' : 'One-bite rule state'}
                </p>
              )}
            </div>
            <div>
              <label className={labelCls}>Your fault % (provoked the dog?)</label>
              <input type="number" min="0" max="100" value={faultPct}
                onChange={e => { setFaultPct(e.target.value); save({ faultPct: e.target.value }) }}
                className={inputCls} />
            </div>
          </div>

          <button onClick={() => setShowResults(true)} className="w-full py-3 rounded-xl bg-[#1e293b] text-white font-bold text-sm hover:bg-[#334155] transition">
            Calculate Dog Bite Settlement
          </button>
        </div>

        <div className="space-y-4">
          {showResults || specialDamages > 0 ? (
            <>
              {stateData && (
                <div className={`rounded-xl border p-4 ${isStrictLiability ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30' : 'border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30'}`}>
                  <p className={`text-sm font-semibold mb-1 ${isStrictLiability ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'}`}>
                    {stateData.name} — {isStrictLiability ? 'Strict Liability State' : 'One-Bite Rule State'}
                  </p>
                  <p className={`text-sm ${isStrictLiability ? 'text-green-700 dark:text-green-400' : 'text-amber-700 dark:text-amber-400'}`}>
                    {isStrictLiability
                      ? `${stateData.name} has strict liability — the dog owner is liable regardless of whether they knew the dog was dangerous. This makes your case stronger.`
                      : `${stateData.name} uses the "one bite rule" — you must prove the owner knew or had reason to know the dog was dangerous. Prior incidents, aggressive behavior, or owner warnings can establish this.`}
                  </p>
                </div>
              )}

              <div className="rounded-xl bg-[#1e293b]/10 dark:bg-[#1e293b]/40 border border-[#1e293b]/30 p-5">
                <p className="text-sm text-[#1e293b] dark:text-slate-300 font-medium mb-1">Estimated Settlement Range</p>
                <p className="text-4xl font-bold text-[#1e293b] dark:text-white">{fmt(finalLow)} – {fmt(finalHigh)}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Net after 33% attorney fees and medical lien estimate</p>
              </div>

              <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Settlement Breakdown</p>
                <div className="space-y-2 text-sm">
                  {[
                    { label: 'Special damages (medical, psych, lost wages)', val: fmt(specialDamages) },
                    { label: `Pain & suffering (${multLow.toFixed(1)}–${multHigh.toFixed(1)}x${hasScarring ? ', scarring bonus' : ''})`, val: `${fmt(psLow)} – ${fmt(psHigh)}` },
                    { label: 'Gross settlement', val: `${fmt(grossLow)} – ${fmt(grossHigh)}`, bold: true },
                    { label: 'Attorney fees (33%)', val: `−${fmt(attyLow)} – −${fmt(attyHigh)}` },
                    { label: 'Medical lien estimate', val: `−${fmt(medLien)}` },
                    { label: 'Net to you', val: `${fmt(netLow)} – ${fmt(netHigh)}`, bold: true, highlight: true },
                    ...(fault > 0 && faultReduced ? [{ label: `After ${fault}% fault reduction`, val: `${fmt(faultReduced[0])} – ${fmt(faultReduced[1])}`, bold: true, highlight: true }] : []),
                  ].map(({ label, val, bold, highlight }) => (
                    <div key={label} className={`flex justify-between ${bold ? 'border-t border-gray-100 dark:border-gray-600 pt-2 mt-1' : ''}`}>
                      <span className={bold ? 'font-semibold text-gray-800 dark:text-[#e2e8f0]' : 'text-gray-600 dark:text-gray-400'}>{label}</span>
                      <span className={`font-medium ${highlight ? 'text-[#1e293b] dark:text-slate-200' : 'text-gray-800 dark:text-[#e2e8f0]'}`}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-blue-100 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/30 p-4">
                <p className="text-xs text-blue-700 dark:text-blue-400">
                  Dog bite settlements average $64,555 nationally (Insurance Information Institute 2024). Severe bites with scarring and child victims typically settle significantly above average.
                  {!hasHomeowners && ' Without homeowners insurance, recovery depends on the owner\'s personal assets — consult an attorney about collectibility.'}
                </p>
              </div>

              <AffiliateCTA headline="Get a Free Dog Bite Case Review" />
              <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">Estimates for educational purposes only. Not legal advice. Consult a licensed personal injury attorney.</p>
            </>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 p-10 text-center">
              <div className="text-4xl mb-3">🐕</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Enter your damages to see your estimated dog bite settlement range.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
