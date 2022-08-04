import { createContext } from 'react'
import { Track } from 'react-native-track-player'

const trackContext = createContext({} as Track | undefined)

export default trackContext
