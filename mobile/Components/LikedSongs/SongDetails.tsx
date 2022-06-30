import React, { FC } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import colors from '../../../assets/colors/colors'
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
  return (
    <View style={styles.detailsWrapper}>
      <Image
        source={{ uri: song.imageURL }}
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
        }}
      >
        {song.name}
      </Text>
      <Text
        style={{ ...styles.detailsAuthor, fontSize: fontSize.authorFontSize }}
      >
        {song.author}
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
    color: colors.secondary,
  },
  detailsAuthor: {
    paddingTop: 5,
    fontFamily: 'Roboto_400Regular',
    color: colors.bandName,
    textTransform: 'uppercase',
    fontSize: 10,
  },
})

export default SongsDetails
