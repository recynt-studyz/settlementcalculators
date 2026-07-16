'use client'

import dynamic from 'next/dynamic'

const CarAccidentCalculator = dynamic(() => import('./CarAccidentCalculator'), { ssr: false })

export default function CarAccidentCalculatorWrapper({ defaultState }: { defaultState?: string }) {
  return <CarAccidentCalculator defaultState={defaultState} />
}
