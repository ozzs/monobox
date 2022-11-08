/* React / React-Native imports */
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native'
import React, { useContext, useState } from 'react'

/* Navigation imports */
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../App'

/* utils imports */
import themeContext from '../../../assets/styles/themeContext'
import playlistContext from '../../utils/PlaylistIDContext'
import trackContext from '../../utils/CurrentSongContext'
import { BASE_API_PORT, BASE_API_URL } from '../../utils/BaseAPI'

/* Icons imports */
import { FontAwesome } from '@expo/vector-icons'

/* Components imports */
import CurrentSong from '../../Components/General/CurrentSong'
import SongDisplay from './SongDisplay'
import PlaylistsList from '../../Components/Modals/PlaylistsList'

/* Music Player imports */
import { useSongsData } from '../../hooks/HooksAPI'

const Library = () => {
  const theme = useContext(themeContext)
  const currentTrack = useContext(trackContext)
  const { currentPlaylist, setCurrentPlaylist } = useContext(playlistContext)
  const [modalOpen, setModalOpen] = useState(false)
  const [chosenSongID, setChosenSongID] = useState(0)

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const {
    data: songs,
    isLoading,
    isIdle,
    isError,
    error,
  } = useSongsData(`http://${BASE_API_URL}:${BASE_API_PORT}/songs`)

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
            <PlaylistsList
              chosenSongID={chosenSongID}
              setModalOpen={setModalOpen}
            />
          </Modal>

          {/* Header */}
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            >
              <FontAwesome name='bars' size={24} color={theme.primary} />
            </TouchableOpacity>
          </View>
          <Text style={[styles.libraryTitle, { color: theme.primary }]}>
            Your Library
          </Text>
          <View
            style={{
              paddingBottom: currentTrack === undefined ? 0 : 90,
              flex: 1,
            }}
          >
            <FlatList
              data={songs}
              renderItem={({ item }) => (
                <SongDisplay
                  key={item.id}
                  song={item}
                  songs={songs}
                  setModalOpen={setModalOpen}
                  setChosenSongID={setChosenSongID}
                  setCurrentPlaylist={setCurrentPlaylist}
                />
              )}
            />
          </View>
        </View>
      )}
      {/* Bottom Layer */}
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
  headerContainer: {
    paddingVertical: 35,
    paddingLeft: 30,
  },
  libraryTitle: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 24,
    paddingHorizontal: 30,
    paddingTop: 15,
    paddingBottom: 25,
  },
  songdisplayWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  bottomLayerWrapper: {
    width: '100%',
    height: 90,
    bottom: 0,
    position: 'absolute',
  },
})

export default Library
