'use client'

import dynamic from 'next/dynamic'

const DebtSettlementCalculator = dynamic(() => import('./DebtSettlementCalculator'), { ssr: false })

export default function DebtSettlementCalculatorWrapper() {
  return <DebtSettlementCalculator />
}
