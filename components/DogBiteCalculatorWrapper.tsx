'use client'

import dynamic from 'next/dynamic'

const DogBiteCalculator = dynamic(() => import('./DogBiteCalculator'), { ssr: false })

export default function DogBiteCalculatorWrapper({ defaultState }: { defaultState?: string }) {
  return <DogBiteCalculator defaultState={defaultState} />
}
