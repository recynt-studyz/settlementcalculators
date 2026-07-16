import { generateStateWorkersCompMetadata } from '@/components/StateWorkersCompPage'
import StateWorkersCompPage from '@/components/StateWorkersCompPage'
export const generateMetadata = () => generateStateWorkersCompMetadata('SC')
export default function Page() { return <StateWorkersCompPage stateAbbr="SC" /> }
