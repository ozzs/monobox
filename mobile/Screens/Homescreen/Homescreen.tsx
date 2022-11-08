/* React / React-Native imports */
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Platform,
  StatusBar,
  ActivityIndicator,
  Modal,
} from 'react-native'
import React, { useContext, useState } from 'react'

/* Theme imports */
import themeContext from '../../../assets/styles/themeContext'

/* utils imports */
import trackContext from '../../utils/CurrentSongContext'
import playlistContext from '../../utils/PlaylistIDContext'

/* Components imports */
import CurrentSong from '../../Components/General/CurrentSong'
import AddPlaylist from '../../Components/Modals/AddPlaylist'
import PlaylistSongsDisplay from './PlaylistSongsDisplay'
import HomescreenHeader from './HomescreenHeader'

/* Music Player imports */
import { usePlaylistsData } from '../../hooks/HooksAPI'
import { useCurrentQueue } from '../../MusicPlayerServices/MusicPlayerHooks'

const Homescreen = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const theme = useContext(themeContext)
  const currentTrack = useContext(trackContext)
  const { currentPlaylist, setCurrentPlaylist } = useContext(playlistContext)

  const {
    data: playlists,
    isLoading,
    isIdle,
    isError,
    error,
  } = usePlaylistsData()

  if (isError) return <Text>An error has occurred: {error}</Text>

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {isLoading || isIdle ? (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size='large' color={theme.primary} />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <Modal
            transparent={true}
            animationType='fade'
            visible={modalOpen}
            onRequestClose={() => setModalOpen(false)}
          >
            <AddPlaylist setModalOpen={setModalOpen} playlists={playlists} />
          </Modal>
          {/* Header */}
          <HomescreenHeader setModalOpen={setModalOpen} />

          {/* Playlists */}
          <View
            style={{
              paddingBottom: currentTrack === undefined ? 0 : 90,
              flex: 1,
            }}
          >
            <FlatList
              data={playlists}
              renderItem={({ item }) => (
                <PlaylistSongsDisplay
                  key={item.id}
                  playlist={item}
                  setCurrentPlaylist={setCurrentPlaylist}
                />
              )}
            />
          </View>

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
          <CurrentSong track={currentTrack} currentPlaylist={currentPlaylist} />
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
