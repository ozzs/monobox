/* React / React-Native imports */
import React, { FC, useContext } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Platform,
  StatusBar,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'

/* Theme imports */
import themeContext from '../../../assets/styles/themeContext'

/* Navigation imports */
import { RootStackParamList } from '../../../App'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

/* utils imports */
import playlistIDContext from '../../utils/PlaylistIDContext'
import { BASE_API_URL, BASE_API_PORT } from '../../utils/BaseAPI'

/* Components imports */
import SongDetails from '../../Components/General/SongDetails'
import CurrentSong from '../../Components/General/CurrentSong'

/* Icons imports */
import { AntDesign, FontAwesome } from '@expo/vector-icons'

/* Music Player imports */
import trackContext from '../../utils/CurrentSongContext'
import { useTracksApiRequest } from '../../MusicPlayerServices/MusicPlayerHooks'
import { DrawerActions } from '@react-navigation/native'

type LikedSongsProps = NativeStackScreenProps<RootStackParamList, 'Homescreen'>

const LikedSongs: FC<LikedSongsProps> = ({ navigation }) => {
  const { playlist, error } = useTracksApiRequest(
    `http://${BASE_API_URL}:${BASE_API_PORT}/songs/1/fetch`,
  )

  if (error) console.error(error)

  const theme = useContext(themeContext)
  const { playlistId, setPlaylistId } = useContext(playlistIDContext)
  const currentTrack = useContext(trackContext)

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {playlist.length < 0 ? (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size='large' color={theme.primary} />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          {/* Header */}
          <SafeAreaView>
            <View style={styles.headerIcons}>
              <TouchableOpacity
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              >
                <FontAwesome name='bars' size={24} color={theme.primary} />
              </TouchableOpacity>
              <AntDesign name='bars' size={24} color={theme.primary} />
            </View>
          </SafeAreaView>

          {/* Title */}
          <Text style={[styles.title, { color: theme.primary }]}>
            Liked Songs
          </Text>
          {/* Songs */}
          <View style={styles.songsWrapper}>
            {playlist.length > 0 ? (
              <FlatList
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                data={playlist}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('SongsCarousel', {
                        song_id: item.id,
                        playlist_id: 1,
                      })
                      setPlaylistId(1)
                    }}
                  >
                    <SongDetails
                      song={item}
                      imageSize={{ height: 150, width: 150 }}
                      fontSize={{ songNameFontSize: 14, authorFontSize: 10 }}
                    />
                  </TouchableOpacity>
                )}
                contentContainerStyle={{ paddingBottom: 90 }}
              ></FlatList>
            ) : (
              <Text style={{ color: theme.author, paddingBottom: 25 }}>
                There are currently no songs on this playlist
              </Text>
            )}
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
  bottomLayerWrapper: {
    width: '100%',
    height: 90,
    bottom: 0,
    position: 'absolute',
  },
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 35,
  },
  title: {
    paddingHorizontal: 30,
    paddingBottom: 25,
    fontFamily: 'Roboto_700Bold',
    fontSize: 24,
  },
  songsWrapper: {
    flex: 1,
    paddingHorizontal: 30,
  },
})

export default LikedSongs
