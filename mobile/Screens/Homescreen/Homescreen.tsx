/* React / React-Native imports */
import {
  StyleSheet,
  View,
  Platform,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Modal,
} from 'react-native'
import React, { useContext, useState } from 'react'

/* Theme imports */
import themeContext from '../../../assets/styles/themeContext'

/* utils imports */
import trackContext from '../../utils/CurrentSongContext'
import playlistIDContext from '../../utils/PlaylistIDContext'
import { BASE_API_URL, BASE_API_PORT } from '../../utils/BaseAPI'

/* Components imports */
import CurrentSong from '../../Components/General/CurrentSong'
import AddPlaylist from '../../Components/Modals/AddPlaylist'
import PlaylistSongsDisplay from './PlaylistSongsDisplay'
import HomescreenHeader from './HomescreenHeader'

/* Music Player imports */
import { usePlaylistApiRequest } from '../../MusicPlayerServices/MusicPlayerHooks'

const Homescreen = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const theme = useContext(themeContext)
  const currentTrack = useContext(trackContext)
  const { playlistId, setPlaylistId } = useContext(playlistIDContext)

  // Fetches required songs
  const { playlists, isLoaded, error } = usePlaylistApiRequest(
    `http://${BASE_API_URL}:${BASE_API_PORT}/songs/playlists`,
  )
  if (error) console.error(error)

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {isLoaded ? (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size='large' color={theme.primary} />
        </View>
      ) : (
        <View>
          <Modal
            transparent={true}
            animationType='fade'
            visible={modalOpen}
            onRequestClose={() => setModalOpen(false)}
          >
            <AddPlaylist setModalOpen={setModalOpen} />
          </Modal>
          <ScrollView>
            {/* Header */}
            <HomescreenHeader setModalOpen={setModalOpen} />

            {/* Playlists */}
            <View
              style={{ paddingBottom: currentTrack === undefined ? 0 : 90 }}
            >
              {playlists.map((playlist) => {
                return (
                  <View key={playlist.id}>
                    <PlaylistSongsDisplay
                      playlist={playlist}
                      setPlaylistId={setPlaylistId}
                    />
                  </View>
                )
              })}
            </View>
          </ScrollView>

          {/* Bottom Layer */}
        </View>
      )}
      {currentTrack === undefined ? null : (
        <View
          style={[
            styles.bottomLayerWrapper,
            { backgroundColor: theme.background },
          ]}
        >
          <CurrentSong track={currentTrack} playlistID={playlistId} />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  activityIndicatorContainer: {
    minHeight: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  songsWrapper: {
    paddingLeft: 30,
  },
  playlistTitle: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 24,
    paddingHorizontal: 30,
    paddingTop: 15,
    paddingBottom: 25,
  },
  bottomLayerWrapper: {
    width: '100%',
    height: 90,
    bottom: 0,
    position: 'absolute',
  },
})

export default Homescreen
