'use client'

import dynamic from 'next/dynamic'

const PersonalInjuryCalculator = dynamic(() => import('./PersonalInjuryCalculator'), { ssr: false })

export default function PersonalInjuryCalculatorWrapper({ defaultState }: { defaultState?: string }) {
  return <PersonalInjuryCalculator defaultState={defaultState} />
}
