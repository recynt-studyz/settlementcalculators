'use client'

import dynamic from 'next/dynamic'

const WorkersCompCalculator = dynamic(() => import('./WorkersCompCalculator'), { ssr: false })

export default function WorkersCompCalculatorWrapper({ defaultState }: { defaultState?: string }) {
  return <WorkersCompCalculator defaultState={defaultState} />
}
