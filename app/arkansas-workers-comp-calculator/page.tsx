import { generateStateWorkersCompMetadata } from '@/components/StateWorkersCompPage'
import StateWorkersCompPage from '@/components/StateWorkersCompPage'
export const generateMetadata = () => generateStateWorkersCompMetadata('AR')
export default function Page() { return <StateWorkersCompPage stateAbbr="AR" /> }
