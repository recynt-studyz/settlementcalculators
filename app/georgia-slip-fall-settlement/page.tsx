import { generateStateSlipFallMetadata } from '@/components/StateSlipFallPage'
import StateSlipFallPage from '@/components/StateSlipFallPage'
export const generateMetadata = () => generateStateSlipFallMetadata('GA')
export default function Page() { return <StateSlipFallPage stateAbbr="GA" /> }
