import { generateStateCarAccidentMetadata } from '@/components/StateCarAccidentPage'
import StateCarAccidentPage from '@/components/StateCarAccidentPage'
export const generateMetadata = () => generateStateCarAccidentMetadata('AZ')
export default function Page() { return <StateCarAccidentPage stateAbbr="AZ" /> }
