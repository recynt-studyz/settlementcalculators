import { generateStatePersonalInjuryMetadata } from '@/components/StatePersonalInjuryPage'
import StatePersonalInjuryPage from '@/components/StatePersonalInjuryPage'
export const generateMetadata = () => generateStatePersonalInjuryMetadata('WI')
export default function Page() { return <StatePersonalInjuryPage stateAbbr="WI" /> }
