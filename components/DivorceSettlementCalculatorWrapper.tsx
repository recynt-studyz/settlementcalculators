'use client'

import dynamic from 'next/dynamic'

const DivorceSettlementCalculator = dynamic(() => import('./DivorceSettlementCalculator'), { ssr: false })

export default function DivorceSettlementCalculatorWrapper() {
  return <DivorceSettlementCalculator />
}
