import {
  StyleSheet,
  View,
  Text,
  Image,
  Platform,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import React, { createContext, FC, useContext, useState } from 'react'
import themeContext from '../../../assets/styles/themeContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { DrawerActions } from '@react-navigation/native'
import { RootStackParamList } from '../../../App'
import { Feather, FontAwesome } from '@expo/vector-icons'
import SongDetails from '../../Components/General/SongDetails'
import CurrentSong from '../../Components/General/CurrentSong'
import {
  useCurrentTrack,
  usePlaylistApiRequest,
} from '../../MusicPlayerServices/MusicPlayerHooks'
import trackContext from '../../utils/CurrentSongContext'
import playlistIDContext from '../../utils/PlaylistIDContext'

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Homescreen'>

const Homescreen: FC<HomeScreenProps> = ({ navigation }) => {
  const theme = useContext(themeContext)
  const currentTrack = useContext(trackContext)
  // const [playlistId, setPlaylistId] = useState(0)
  const { playlistId, setPlaylistId } = useContext(playlistIDContext)

  // Fetches required songs
  const { playlists, isLoaded, error } = usePlaylistApiRequest(
    'http://192.168.1.131:5000/songs/playlists',
  )

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {isLoaded ? (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size='large' color={theme.primary} />
        </View>
      ) : (
        <View>
          <ScrollView>
            {/* Header */}
            <SafeAreaView>
              <View style={styles.headerIcons}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.dispatch(DrawerActions.openDrawer())
                  }
                >
                  <FontAwesome name='bars' size={24} color={theme.primary} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('LikedSongs')}
                >
                  <Feather name='search' size={24} color={theme.primary} />
                </TouchableOpacity>
              </View>
            </SafeAreaView>

            {playlists.map((playlist) => {
              return (
                <View key={playlist.id}>
                  <Text
                    style={[styles.recommendedTitle, { color: theme.primary }]}
                  >
                    {playlist.name}
                  </Text>
                  <View style={styles.songsWrapper}>
                    <FlatList
                      data={playlist.songs}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate('SongsCarousel', {
                              song_id: item.id,
                              playlist_id: playlist.id,
                            })
                            setPlaylistId(playlist.id)
                          }}
                        >
                          <SongDetails
                            song={item}
                            imageSize={{ height: 190, width: 190 }}
                            fontSize={{
                              songNameFontSize: 16,
                              authorFontSize: 10,
                            }}
                          />
                        </TouchableOpacity>
                      )}
                      ItemSeparatorComponent={() => {
                        return <View style={{ width: 20 }} />
                      }}
                    ></FlatList>
                  </View>
                </View>
              )
            })}
          </ScrollView>

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
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 35,
  },
  recommendedTitle: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 24,
    paddingHorizontal: 30,
    paddingBottom: 25,
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
