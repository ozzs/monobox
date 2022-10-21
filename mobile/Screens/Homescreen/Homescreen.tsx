import {
  StyleSheet,
  View,
  Text,
  Platform,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Modal,
  SafeAreaView,
} from 'react-native'
import React, { FC, useContext, useState } from 'react'

/* Theme imports */
import themeContext from '../../../assets/styles/themeContext'

/* Navigation imports */
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../App'
import { DrawerActions } from '@react-navigation/native'

/* utils imports */
import trackContext from '../../utils/CurrentSongContext'
import playlistIDContext from '../../utils/PlaylistIDContext'
import { BASE_API_URL, BASE_API_PORT } from '../../utils/BaseAPI'

/* Components imports */
import { Feather, FontAwesome } from '@expo/vector-icons'
import SongDetails from '../../Components/General/SongDetails'
import CurrentSong from '../../Components/General/CurrentSong'
import AddPlaylist from '../../Components/Modals/AddPlaylist'

/* Music Player imports */
import { usePlaylistApiRequest } from '../../MusicPlayerServices/MusicPlayerHooks'
import HomescreenHeader from './HomescreenHeader'

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Homescreen'>

const Homescreen: FC<HomeScreenProps> = ({ navigation }) => {
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
                    <Text
                      style={[styles.playlistTitle, { color: theme.primary }]}
                    >
                      {playlist.name}
                    </Text>
                    <View style={styles.songsWrapper}>
                      {playlist.songs.length > 0 ? (
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
                      ) : (
                        <Text
                          style={{ color: theme.author, paddingBottom: 25 }}
                        >
                          There are currently no songs on this playlist
                        </Text>
                      )}
                    </View>
                  </View>
                )
              })}
            </View>
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
