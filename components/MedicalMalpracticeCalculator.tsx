'use client'

import { useState, useEffect } from 'react'
import { STATES, STATE_LIST, fmt } from '@/lib/settlementData'
import AffiliateCTA from './AffiliateCTA'

const STORAGE_KEY = 'sc-medmalpractice'

const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#1e293b]'
const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
const sectionCls = 'rounded-xl border border-gray-100 dark:border-gray-700 p-4 space-y-3'

const MAL_TYPES = [
  { val: 'surgical', label: 'Surgical error', multiplier: 4 },
  { val: 'misdiagnosis', label: 'Misdiagnosis / delayed diagnosis', multiplier: 3 },
  { val: 'medication', label: 'Medication error', multiplier: 3 },
  { val: 'birth', label: 'Birth injury', multiplier: 6 },
  { val: 'anesthesia', label: 'Anesthesia error', multiplier: 5 },
]

export default function MedicalMalpracticeCalculator({ defaultState }: { defaultState?: string }) {
  const [stateAbbr, setStateAbbr] = useState(defaultState ?? '')
  const [medBills, setMedBills] = useState('50000')
  const [additionalTreatment, setAdditionalTreatment] = useState('25000')
  const [lostWages, setLostWages] = useState('30000')
  const [malType, setMalType] = useState('surgical')
  const [isPermanent, setIsPermanent] = useState(false)
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.stateAbbr && !defaultState) setStateAbbr(p.stateAbbr)
        if (p.medBills) setMedBills(p.medBills)
        if (p.additionalTreatment) setAdditionalTreatment(p.additionalTreatment)
        if (p.lostWages) setLostWages(p.lostWages)
        if (p.malType) setMalType(p.malType)
        if (p.isPermanent !== undefined) setIsPermanent(p.isPermanent)
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
  const addl = parseFloat(additionalTreatment) || 0
  const wages = parseFloat(lostWages) || 0

  const typeData = MAL_TYPES.find(t => t.val === malType) ?? MAL_TYPES[0]
  const mult = isPermanent ? typeData.multiplier * 1.5 : typeData.multiplier
  const multLow = mult * 0.7
  const multHigh = mult * 1.3

  const economicDamages = med + addl + wages
  const nonEcoLow = economicDamages * multLow
  const nonEcoHigh = economicDamages * multHigh

  const grossLow = economicDamages + nonEcoLow
  const grossHigh = economicDamages + nonEcoHigh

  const stateData = stateAbbr ? STATES[stateAbbr] : null
  const stateCap = stateData?.medMalCap ?? null

  const cappedNonEcoLow = stateCap ? Math.min(nonEcoLow, stateCap) : nonEcoLow
  const cappedNonEcoHigh = stateCap ? Math.min(nonEcoHigh, stateCap) : nonEcoHigh
  const cappedGrossLow = economicDamages + cappedNonEcoLow
  const cappedGrossHigh = economicDamages + cappedNonEcoHigh

  // Attorney fees (typically 40% for malpractice due to complexity)
  const attyLow = cappedGrossLow * 0.40
  const attyHigh = cappedGrossHigh * 0.40
  const netLow = Math.max(0, cappedGrossLow - attyLow - med * 0.30)
  const netHigh = Math.max(0, cappedGrossHigh - attyHigh - med * 0.30)

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className={sectionCls}>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Your Damages</p>
            {[
              { label: 'Medical bills caused by malpractice ($)', val: medBills, set: setMedBills, key: 'medBills' },
              { label: 'Additional treatment needed ($)', val: additionalTreatment, set: setAdditionalTreatment, key: 'additionalTreatment' },
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
            <div className="flex items-center gap-2">
              <input type="checkbox" id="isPermanent" checked={isPermanent}
                onChange={e => { setIsPermanent(e.target.checked); save({ isPermanent: e.target.checked }) }}
                className="rounded border-gray-300 w-4 h-4 accent-[#1e293b]" />
              <label htmlFor="isPermanent" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                Permanent injury / long-term impairment
              </label>
            </div>
          </div>

          <div className={sectionCls}>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Type of Malpractice</p>
            <div className="space-y-2">
              {MAL_TYPES.map(({ val, label }) => (
                <button key={val}
                  onClick={() => { setMalType(val); save({ malType: val }) }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    malType === val ? 'bg-[#1e293b] text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
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
                  {stateCap ? `${stateData.name} caps non-economic damages at ${fmt(stateCap)}` : `${stateData.name} has no cap on non-economic damages`}
                </p>
              )}
            </div>
          </div>

          <button onClick={() => setShowResults(true)} className="w-full py-3 rounded-xl bg-[#1e293b] text-white font-bold text-sm hover:bg-[#334155] transition">
            Calculate Malpractice Settlement
          </button>
        </div>

        <div className="space-y-4">
          {showResults || economicDamages > 0 ? (
            <>
              <div className="rounded-xl bg-[#1e293b]/10 dark:bg-[#1e293b]/40 border border-[#1e293b]/30 p-5">
                <p className="text-sm text-[#1e293b] dark:text-slate-300 font-medium mb-1">Estimated Settlement Range</p>
                <p className="text-4xl font-bold text-[#1e293b] dark:text-white">{fmt(netLow)} – {fmt(netHigh)}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Net to you after 40% attorney fees and medical liens</p>
              </div>

              <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Malpractice Breakdown</p>
                <div className="space-y-2 text-sm">
                  {[
                    { label: 'Economic damages', val: fmt(economicDamages) },
                    { label: `Non-economic (pain & suffering, ${multLow.toFixed(1)}–${multHigh.toFixed(1)}x)`, val: `${fmt(nonEcoLow)} – ${fmt(nonEcoHigh)}` },
                    ...(stateCap ? [{ label: `After ${stateData?.name} cap (${fmt(stateCap)})`, val: `${fmt(cappedNonEcoLow)} – ${fmt(cappedNonEcoHigh)}`, warn: true }] : []),
                    { label: 'Gross settlement', val: `${fmt(cappedGrossLow)} – ${fmt(cappedGrossHigh)}`, bold: true },
                    { label: 'Attorney fees (40%)', val: `−${fmt(attyLow)} – −${fmt(attyHigh)}` },
                    { label: 'Medical lien estimate', val: `−${fmt(med * 0.30)}` },
                    { label: 'Net to you', val: `${fmt(netLow)} – ${fmt(netHigh)}`, bold: true, highlight: true },
                  ].map(({ label, val, bold, highlight, warn }) => (
                    <div key={label} className={`flex justify-between ${bold ? 'border-t border-gray-100 dark:border-gray-600 pt-2 mt-1' : ''}`}>
                      <span className={`${bold ? 'font-semibold text-gray-800 dark:text-[#e2e8f0]' : 'text-gray-600 dark:text-gray-400'} ${warn ? 'text-amber-600 dark:text-amber-400' : ''}`}>{label}</span>
                      <span className={`font-medium ${highlight ? 'text-[#1e293b] dark:text-slate-200' : warn ? 'text-amber-600 dark:text-amber-400' : 'text-gray-800 dark:text-[#e2e8f0]'}`}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-4">
                <p className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-1">Important Note</p>
                <p className="text-sm text-amber-700 dark:text-amber-400">
                  Medical malpractice cases are highly complex and expensive to litigate, often requiring expert witnesses and extensive discovery. Most attorneys require strong evidence of negligence before taking these cases on contingency.
                </p>
              </div>

              <AffiliateCTA headline="Get a Free Medical Malpractice Case Review" />
              <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">Estimates for educational purposes only. Medical malpractice values vary enormously by case. Not legal advice.</p>
            </>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 p-10 text-center">
              <div className="text-4xl mb-3">🏥</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Enter your damages to calculate your medical malpractice settlement estimate.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
