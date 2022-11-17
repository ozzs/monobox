// React / React-Native imports
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native'
import React, { FC, useContext } from 'react'

// utils imports
import themeContext from '../../../assets/styles/themeContext'
import { windowHeight, windowWidth } from '../../utils/Dimensions'

// Music Player imports
import { useAddSongToPlaylist, usePlaylistsData } from '../../hooks/HooksAPI'

interface PlaylistsListProps {
  chosenSongID: number
  setModalOpen: (bool: boolean) => void
}

const PlaylistsList: FC<PlaylistsListProps> = ({
  chosenSongID,
  setModalOpen,
}) => {
  const theme = useContext(themeContext)

  const {
    data: playlists,
    isLoading,
    isIdle,
    isError,
    error,
  } = usePlaylistsData()

  if (isError) return <Text>{error}</Text>

  const { mutate: addSongToPlaylist } = useAddSongToPlaylist()

  return (
    <View style={styles.container}>
      {isLoading || isIdle ? (
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
                  addSongToPlaylist({
                    playlist_id: playlist.id,
                    songId: chosenSongID,
                  })
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
