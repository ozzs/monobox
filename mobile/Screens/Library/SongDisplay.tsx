/* React / React-Native imports */
import { View, Text, Image, StyleSheet } from 'react-native'
import React, { FC, useContext } from 'react'

/* Theme imports*/
import themeContext from '../../../assets/styles/themeContext'

/* Music Player imports */
import { Track } from 'react-native-track-player'

/* utils imports */
import { BASE_API_PORT, BASE_API_URL } from '../../utils/BaseAPI'

interface SongDisplayProps {
  song: Track
  setPlaylistId: (num: number) => void
}

const SongDisplay: FC<SongDisplayProps> = ({ song }) => {
  const theme = useContext(themeContext)

  return (
    <>
      <Image
        source={{
          uri: `http://${BASE_API_URL}:${BASE_API_PORT}/songs/${song.id}/artwork`,
        }}
        style={{
          width: 45,
          height: 45,
          borderRadius: 3,
        }}
      />
      <View style={styles.songDetails}>
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
    </>
  )
}

const styles = StyleSheet.create({
  songDetails: {
    flexDirection: 'column',
    paddingRight: 30,
    borderWidth: 1,
  },
  songTitle: {
    paddingHorizontal: 15,
    fontSize: 16,
  },
  authorTitle: {
    paddingHorizontal: 15,
    fontSize: 12,
  },
})

export default SongDisplay
