import { StyleSheet, View, Text, Image } from 'react-native'
import React, { FC } from 'react'
import colors from '../../../assets/colors/colors'
import Slider from '@react-native-community/slider'
import { Feather, AntDesign } from '@expo/vector-icons'

interface DetailsProps {
  details: {
    name: string
    author: string
    imageURL: string
  }
}

const CurrentSong: FC<DetailsProps> = ({ details }) => {
  return (
    <>
      {/* Slider */}
      <View style={styles.sliderWrapper}>
        <Slider
          style={styles.slider}
          value={0.5}
          minimumValue={0}
          maximumValue={1}
          thumbTintColor={colors.white}
          minimumTrackTintColor={colors.white}
          maximumTrackTintColor={colors.white}
        />
      </View>

      {/* Current Song Details */}
      <View style={styles.currentSongDetails}>
        <Image
          source={{ uri: details.imageURL }}
          style={styles.currentSongImage}
        />
        <View style={styles.currentSongTitles}>
          <Text style={styles.currentSongName}> {details.name} </Text>
          <Text style={styles.currentSongAuthor}> {details.author}</Text>
        </View>

        {/* Controllers */}
        <View style={styles.controllersWrapper}>
          <Feather name='skip-back' size={20} color={colors.secondary} />
          <AntDesign
            name='pause'
            style={{ marginLeft: 16 }}
            size={20}
            color={colors.secondary}
          />
          <Feather
            name='skip-forward'
            style={{ marginLeft: 16 }}
            size={20}
            color={colors.secondary}
          />
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  sliderWrapper: {
    marginHorizontal: -15,
    marginVertical: -20,
    zIndex: 1,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  currentSongDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  currentSongImage: {
    width: 90,
    height: 90,
  },
  currentSongTitles: {
    flexDirection: 'column',
    marginLeft: 13,
    justifyContent: 'center',
    marginRight: 'auto',
  },
  currentSongName: {
    fontFamily: 'Roboto_500Medium',
    color: colors.secondary,
    fontSize: 18,
  },
  currentSongAuthor: {
    fontFamily: 'Roboto_400Regular',
    color: colors.bandName,
    textTransform: 'uppercase',
    marginTop: 5,
    fontSize: 10,
  },
  controllersWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 28,
  },
})

export default CurrentSong
