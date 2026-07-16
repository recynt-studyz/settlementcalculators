import { generateStateWorkersCompMetadata } from '@/components/StateWorkersCompPage'
import StateWorkersCompPage from '@/components/StateWorkersCompPage'
export const generateMetadata = () => generateStateWorkersCompMetadata('CT')
export default function Page() { return <StateWorkersCompPage stateAbbr="CT" /> }
