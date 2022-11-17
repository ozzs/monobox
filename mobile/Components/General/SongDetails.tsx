// React / React-Native imports
import { StyleSheet, View, Text, Image } from 'react-native'
import React, { FC, useContext } from 'react'

// utils imports
import themeContext from '../../../assets/styles/themeContext'
import { BASE_API_URL, BASE_API_PORT } from '../../utils/BaseAPI'

// Music Player imports
import { Track } from 'react-native-track-player'

interface DetailsProps {
  song: Track
  imageSize: {
    height: number
    width: number
  }
  fontSize: {
    songNameFontSize: number
    authorFontSize: number
  }
}

const SongsDetails: FC<DetailsProps> = ({ song, imageSize, fontSize }) => {
  const theme = useContext(themeContext)
  return (
    <View style={{ ...styles.detailsWrapper, width: imageSize.width }}>
      <Image
        source={{
          uri: `http://${BASE_API_URL}:${BASE_API_PORT}/songs/${
            song.id
          }/artwork/${new Date().getMilliseconds}`,
        }}
        style={{
          width: imageSize.width,
          height: imageSize.height,
          borderRadius: 5,
        }}
      />
      <Text
        style={{
          ...styles.detailsSongName,
          fontSize: fontSize.songNameFontSize,
          color: theme.primary,
        }}
        numberOfLines={1}
      >
        {song.title}
      </Text>
      <Text
        style={{
          ...styles.detailsAuthor,
          fontSize: fontSize.authorFontSize,
          color: theme.author,
        }}
      >
        {song.artist}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  detailsWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 25,
  },
  detailsSongName: {
    paddingTop: 12,
    fontFamily: 'Roboto_500Medium',
    textAlign: 'center',
    width: 150,
  },
  detailsAuthor: {
    paddingTop: 5,
    fontFamily: 'Roboto_400Regular',
    textTransform: 'uppercase',
    fontSize: 10,
    textAlign: 'center',
  },
})

export default SongsDetails
