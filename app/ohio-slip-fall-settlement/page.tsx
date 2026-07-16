import { generateStateSlipFallMetadata } from '@/components/StateSlipFallPage'
import StateSlipFallPage from '@/components/StateSlipFallPage'
export const generateMetadata = () => generateStateSlipFallMetadata('OH')
export default function Page() { return <StateSlipFallPage stateAbbr="OH" /> }
