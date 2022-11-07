/* React / React-Native imports */
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { FC, useContext } from 'react'

/* Theme imports*/
import themeContext from '../../../assets/styles/themeContext'

/* Navigation imports */
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../App'

/* Music Player imports */
import { Track } from 'react-native-track-player'

/* utils imports */
import { BASE_API_PORT, BASE_API_URL } from '../../utils/BaseAPI'

/* Icons imports */
import { MaterialIcons } from '@expo/vector-icons'

interface SongDisplayProps {
  song: Track
  songs: Track[]
  setModalOpen: (bool: boolean) => void
  setChosenSongID: (song_id: number) => void
}

const SongDisplay: FC<SongDisplayProps> = ({
  song,
  songs,
  setModalOpen,
  setChosenSongID,
}) => {
  const theme = useContext(themeContext)
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  return (
    <View style={styles.songDisplayContainer}>
      <View style={styles.songDetails}>
        <TouchableOpacity
          style={styles.songButton}
          onPress={() => {
            navigation.navigate('SongsCarousel', {
              playlist: songs,
              song_id: song.id,
            })
          }}
        >
          <Image
            source={{
              uri: `http://${BASE_API_URL}:${BASE_API_PORT}/songs/${song.id}/artwork`,
            }}
            style={styles.songArtwork}
          />
          <View style={styles.songText}>
            <Text
              style={[styles.songTitle, { color: theme.primary }]}
              numberOfLines={1}
            >
              {song.title}
            </Text>
            <Text
              style={[styles.authorTitle, { color: theme.author }]}
              numberOfLines={1}
            >
              {song.artist}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          setModalOpen(true)
          setChosenSongID(song.id)
        }}
      >
        <MaterialIcons
          style={styles.addToPlaylistButton}
          name='playlist-add'
          size={22}
          color='white'
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  songDisplayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 30,
    marginBottom: 15,
  },
  songDetails: {
    flex: 1,
  },
  songButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  songArtwork: {
    width: 45,
    height: 45,
    borderRadius: 3,
  },
  songText: {
    flex: 1,
    paddingHorizontal: 15,
  },
  songTitle: {
    fontSize: 16,
  },
  authorTitle: {
    fontSize: 12,
  },
  addToPlaylistButton: {
    marginLeft: 15,
  },
})

export default SongDisplay
