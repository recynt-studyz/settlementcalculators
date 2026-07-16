import { generateStateWorkersCompMetadata } from '@/components/StateWorkersCompPage'
import StateWorkersCompPage from '@/components/StateWorkersCompPage'
export const generateMetadata = () => generateStateWorkersCompMetadata('KS')
export default function Page() { return <StateWorkersCompPage stateAbbr="KS" /> }
