'use client'

import dynamic from 'next/dynamic'

const SlipFallCalculator = dynamic(() => import('./SlipFallCalculator'), { ssr: false })

export default function SlipFallCalculatorWrapper({ defaultState }: { defaultState?: string }) {
  return <SlipFallCalculator defaultState={defaultState} />
}
