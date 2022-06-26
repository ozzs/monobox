import React, { FC } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import colors from '../../assets/colors/colors'

type DetailsType = {
  name: string
  author: string
  image: string
}
interface DetailsProps {
  details: DetailsType
}

const SongsDetails: FC<DetailsProps> = ({ details }) => {
  return (
    <View style={styles.detailsWrapper}>
      <Image source={{ uri: details.image }} style={styles.detailsImage} />
      <Text style={styles.detailsSongName}>{details.name}</Text>
      <Text style={styles.detailsBand}>{details.author}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  detailsWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 25,
  },
  detailsImage: {
    width: 150,
    height: 150,
  },
  detailsSongName: {
    paddingTop: 10,
    fontFamily: 'Roboto_500Medium',
    color: colors.secondary,
  },
  detailsBand: {
    paddingTop: 5,
    fontFamily: 'Roboto_400Regular',
    color: colors.bandName,
    textTransform: 'uppercase',
  },
})

export default SongsDetails
