/* React / React-Native imports */
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import React, { FC, useContext } from 'react'

/* Theme imports */
import themeContext from '../../../assets/styles/themeContext'

/* Navigation imports */
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../App'
import { useNavigation } from '@react-navigation/native'

/* utils imports */
import { Playlist } from '../../utils/Song'

/* Components imports */
import SongDetails from '../../Components/General/SongDetails'

interface PlaylistSongsProps {
  playlist: Playlist
  setPlaylistId: (num: number) => void
}

const PlaylistSongsDisplay: FC<PlaylistSongsProps> = ({
  playlist,
  setPlaylistId,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const theme = useContext(themeContext)

  return (
    <>
      <Text style={[styles.playlistTitle, { color: theme.primary }]}>
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
          <Text style={{ color: theme.author, paddingBottom: 25 }}>
            There are currently no songs on this playlist
          </Text>
        )}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
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
})

export default PlaylistSongsDisplay
