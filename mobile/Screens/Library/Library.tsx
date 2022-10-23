/* React / React-Native imports */
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import React, { useContext } from 'react'

/* Theme imports */
import themeContext from '../../../assets/styles/themeContext'

/* Navigation imports */
import { DrawerActions, useNavigation } from '@react-navigation/native'

/* utils imports */
import playlistIDContext from '../../utils/PlaylistIDContext'
import trackContext from '../../utils/CurrentSongContext'
import { BASE_API_PORT, BASE_API_URL } from '../../utils/BaseAPI'

/* Icons imports */
import { FontAwesome } from '@expo/vector-icons'

/* Components imports */
import CurrentSong from '../../Components/General/CurrentSong'
import SongDisplay from './SongDisplay'

/* Music Player imports */
import { useTracksApiRequest } from '../../MusicPlayerServices/MusicPlayerHooks'
import { Inter_100Thin } from '@expo-google-fonts/inter'
import { Roboto_900Black } from '@expo-google-fonts/roboto'

const Library = () => {
  const theme = useContext(themeContext)
  const currentTrack = useContext(trackContext)
  const { playlistId, setPlaylistId } = useContext(playlistIDContext)
  const navigation = useNavigation()

  const { playlist, isLoaded, error } = useTracksApiRequest(
    `http://${BASE_API_URL}:${BASE_API_PORT}/songs`,
  )
  if (error) console.error(error)

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      {isLoaded ? (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size='large' color={theme.primary} />
        </View>
      ) : (
        <View>
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
            style={[
              {
                paddingHorizontal: 30,
                paddingBottom: currentTrack === undefined ? 0 : 90,
              },
            ]}
          >
            {playlist.map((song) => (
              <View style={styles.songdisplayWrapper} key={song.id}>
                <SongDisplay song={song} setPlaylistId={setPlaylistId} />
              </View>
            ))}
          </View>

          {/* Bottom Layer */}
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
    paddingBottom: 15,
  },
  bottomLayerWrapper: {
    width: '100%',
    height: 90,
    bottom: 0,
    position: 'absolute',
  },
})

export default Library
