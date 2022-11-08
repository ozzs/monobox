import { createContext } from 'react'
import { Track } from 'react-native-track-player'

interface playlistContextInterface {
  currentPlaylist: Track[]
  setCurrentPlaylist: (playlist: Track[]) => void
}

const playlistContext = createContext({} as playlistContextInterface)

export default playlistContext
