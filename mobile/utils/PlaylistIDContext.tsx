import { createContext } from 'react'

interface playlistIDContextInterface {
  playlistId: number | undefined
  setPlaylistId: (playlistId: number) => void
}

const playlistIDContext = createContext({} as playlistIDContextInterface)

export default playlistIDContext
