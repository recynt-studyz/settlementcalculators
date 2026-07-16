'use client'

import dynamic from 'next/dynamic'

const WrongfulTerminationCalculator = dynamic(() => import('./WrongfulTerminationCalculator'), { ssr: false })

export default function WrongfulTerminationCalculatorWrapper() {
  return <WrongfulTerminationCalculator />
}
