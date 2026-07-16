import { generateStateCarAccidentMetadata } from '@/components/StateCarAccidentPage'
import StateCarAccidentPage from '@/components/StateCarAccidentPage'
export const generateMetadata = () => generateStateCarAccidentMetadata('WV')
export default function Page() { return <StateCarAccidentPage stateAbbr="WV" /> }
