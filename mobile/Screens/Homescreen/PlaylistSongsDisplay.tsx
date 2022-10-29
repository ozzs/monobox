/* React / React-Native imports */
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
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
import { BASE_API_PORT, BASE_API_URL } from '../../utils/BaseAPI'

/* Components imports */
import SongDetails from '../../Components/General/SongDetails'
import SongsCarousel from '../SongsCarousel/SongsCarousel'

interface PlaylistSongsProps {
  playlist: Playlist
  playlists: Playlist[]
  setPlaylistId: (num: number) => void
  setPlaylists: (
    playlists: Playlist[] | ((prevPlaylists: Playlist[]) => Playlist[]),
  ) => void
}

const PlaylistSongsDisplay: FC<PlaylistSongsProps> = ({
  playlist,
  playlists,
  setPlaylistId,
  setPlaylists,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const theme = useContext(themeContext)

  const onRemove = (playlist_id: number, song_id: number) => {
    const newPlaylists = playlists.map((playlist) => {
      if (playlist.id === playlist_id) {
        const newSongsList = playlist.songs.filter(
          (song) => song.id !== song_id,
        )
        return { ...playlist, songs: newSongsList }
      }
      return playlist
    })
    setPlaylists(newPlaylists)
  }

  const removeFromPlaylist = async (playlist_id: number, song_id: number) => {
    await fetch(
      `http://${BASE_API_URL}:${BASE_API_PORT}/songs/remove_song/${playlist_id}/${song_id}`,
      {
        method: 'PATCH',
        body: JSON.stringify({ playlist_id: playlist_id, song_id: song_id }),
      },
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        onRemove(playlist_id, song_id)
      })
      .catch((error) => console.error(error))
  }

  const deletePlaylist = async (playlist_id: number) => {
    await fetch(
      `http://${BASE_API_URL}:${BASE_API_PORT}/songs/delete_playlist/${playlist_id}`,
      { method: 'DELETE', body: JSON.stringify({ playlist_id: playlist_id }) },
    )
      .then((res) => res.json)
      .then((json) => {
        console.log(json)
        setPlaylists((prevPlaylists) =>
          prevPlaylists.filter((playlist) => playlist.id !== playlist_id),
        )
      })
      .catch((error) => console.error(error))
  }

  return (
    <>
      <TouchableWithoutFeedback
        onLongPress={() => deletePlaylist(playlist.id)}
        delayLongPress={1500}
      >
        <Text style={[styles.playlistTitle, { color: theme.primary }]}>
          {playlist.name}
        </Text>
      </TouchableWithoutFeedback>
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
                onLongPress={() => removeFromPlaylist(playlist.id, item.id)}
                delayLongPress={1500}
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
