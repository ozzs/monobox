import React, { FC, useContext } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import themeContext from '../../../assets/styles/themeContext'
import { Song } from '../../utils/Song'

interface DetailsProps {
  song: Song
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
    <View style={styles.detailsWrapper}>
      <Image
        source={{ uri: song.artwork }}
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
  },
  detailsAuthor: {
    paddingTop: 5,
    fontFamily: 'Roboto_400Regular',
    textTransform: 'uppercase',
    fontSize: 10,
  },
})

export default SongsDetails
