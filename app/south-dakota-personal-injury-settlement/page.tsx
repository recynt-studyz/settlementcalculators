import { generateStatePersonalInjuryMetadata } from '@/components/StatePersonalInjuryPage'
import StatePersonalInjuryPage from '@/components/StatePersonalInjuryPage'
export const generateMetadata = () => generateStatePersonalInjuryMetadata('SD')
export default function Page() { return <StatePersonalInjuryPage stateAbbr="SD" /> }
