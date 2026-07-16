import { generateStateCarAccidentMetadata } from '@/components/StateCarAccidentPage'
import StateCarAccidentPage from '@/components/StateCarAccidentPage'
export const generateMetadata = () => generateStateCarAccidentMetadata('NM')
export default function Page() { return <StateCarAccidentPage stateAbbr="NM" /> }
