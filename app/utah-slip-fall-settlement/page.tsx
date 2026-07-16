import { generateStateSlipFallMetadata } from '@/components/StateSlipFallPage'
import StateSlipFallPage from '@/components/StateSlipFallPage'
export const generateMetadata = () => generateStateSlipFallMetadata('UT')
export default function Page() { return <StateSlipFallPage stateAbbr="UT" /> }
