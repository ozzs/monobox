/* React / React-Native imports */
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native'
import React, { FC, useContext } from 'react'

/* Theme imports */
import themeContext from '../../../assets/styles/themeContext'

/* utils imports */
import { windowHeight, windowWidth } from '../../utils/Dimensions'
import { BASE_API_PORT, BASE_API_URL } from '../../utils/BaseAPI'

/* Music Player imports */
import { usePlaylistApiRequest } from '../../MusicPlayerServices/MusicPlayerHooks'

interface PlaylistsListProps {
  chosenSongID: number
  setModalOpen: (bool: boolean) => void
}

const PlaylistsList: FC<PlaylistsListProps> = ({
  chosenSongID,
  setModalOpen,
}) => {
  const theme = useContext(themeContext)

  const { playlists, isLoaded, error } = usePlaylistApiRequest(
    `http://${BASE_API_URL}:${BASE_API_PORT}/songs/playlists`,
  )
  if (error) console.error(error)

  const addToPlaylist = async (playlist_id: number, song_id: number) => {
    await fetch(
      `http://${BASE_API_URL}:${BASE_API_PORT}/songs/add_song/${playlist_id}/${song_id}`,
      {
        method: 'PATCH',
        body: JSON.stringify({ playlist_id: playlist_id, song_id: song_id }),
      },
    )
      .then((res) => res.json)
      .then((json) => console.log(json))
      .catch((error) => console.error(error))
  }

  return (
    <View style={styles.container}>
      {isLoaded ? (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size='large' color={theme.primary} />
        </View>
      ) : (
        <View style={{ ...styles.modal, backgroundColor: theme.background }}>
          <Text style={[styles.addToPlaylistTitle, { color: theme.primary }]}>
            Add to playlist
          </Text>
          {playlists.length > 1 ? (
            playlists.slice(1).map((playlist) => (
              <TouchableOpacity
                key={playlist.id}
                onPress={() => {
                  addToPlaylist(playlist.id, chosenSongID)
                  setModalOpen(false)
                }}
              >
                <View style={styles.playlistTitleContainer}>
                  <Text style={styles.playlistTitle}> {playlist.name} </Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={{ color: theme.author, textAlign: 'center' }}>
              There are currently no existing playlists
            </Text>
          )}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.7)',
  },
  activityIndicatorContainer: {
    minHeight: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  modal: {
    height: windowHeight - 200,
    width: windowWidth - 80,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  addToPlaylistTitle: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 22,
    textAlign: 'center',
    paddingTop: 15,
    paddingBottom: 25,
  },
  playlistTitleContainer: {
    marginBottom: 20,
  },
  playlistTitle: {
    color: 'white',
    fontSize: 16,
  },
})

export default PlaylistsList
