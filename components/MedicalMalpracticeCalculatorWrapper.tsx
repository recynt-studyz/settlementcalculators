'use client'

import dynamic from 'next/dynamic'

const MedicalMalpracticeCalculator = dynamic(() => import('./MedicalMalpracticeCalculator'), { ssr: false })

export default function MedicalMalpracticeCalculatorWrapper({ defaultState }: { defaultState?: string }) {
  return <MedicalMalpracticeCalculator defaultState={defaultState} />
}
