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
import playlistContext from '../../utils/PlaylistIDContext'

/* Components imports */
import SongDetails from '../../Components/General/SongDetails'
import CurrentSong from '../../Components/General/CurrentSong'

/* Icons imports */
import { AntDesign, FontAwesome } from '@expo/vector-icons'

/* Music Player imports */
import trackContext from '../../utils/CurrentSongContext'
import { DrawerActions } from '@react-navigation/native'
import { useSongsData } from '../../hooks/HooksAPI'
import { BASE_API_PORT, BASE_API_URL } from '../../utils/BaseAPI'

type LikedSongsProps = NativeStackScreenProps<RootStackParamList, 'Homescreen'>

const LikedSongs: FC<LikedSongsProps> = ({ navigation }) => {
  const {
    data: songs,
    isLoading,
    isIdle,
    isError,
    error,
  } = useSongsData(`http://${BASE_API_URL}:${BASE_API_PORT}/songs/1/fetch`)

  if (isError) return <Text>An error has occurred: {error}</Text>

  const theme = useContext(themeContext)
  const { currentPlaylist, setCurrentPlaylist } = useContext(playlistContext)
  const currentTrack = useContext(trackContext)

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {isLoading || isIdle ? (
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
            </View>
          </SafeAreaView>

          {/* Title */}
          <Text style={[styles.title, { color: theme.primary }]}>
            Liked Songs
          </Text>
          {/* Songs */}
          <View style={styles.songsWrapper}>
            {songs.length > 0 ? (
              <FlatList
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                data={songs}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('SongsCarousel', {
                        song_id: item.id,
                        playlist: songs,
                      })
                      setCurrentPlaylist(songs)
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
              <CurrentSong
                track={currentTrack}
                currentPlaylist={currentPlaylist}
              />
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
