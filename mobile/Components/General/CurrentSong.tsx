import { StyleSheet, View, Text, Image } from 'react-native'
import React, { FC, useContext } from 'react'
import Slider from '@react-native-community/slider'
import { Feather, AntDesign } from '@expo/vector-icons'
import themeContext from '../../../assets/styles/themeContext'
import { Song } from '../../utils/Song'

interface DetailsProps {
  details: {
    title: string
    artist: string
    artwork: string
    url: string
  }
}

const CurrentSong: FC<DetailsProps> = ({ details }) => {
  const theme = useContext(themeContext)
  return (
    <>
      {/* Slider */}
      <View style={styles.sliderWrapper}>
        <Slider
          style={styles.slider}
          value={0.5}
          minimumValue={0}
          maximumValue={1}
          thumbTintColor={theme.primary}
          minimumTrackTintColor={theme.primary}
          maximumTrackTintColor={theme.primary}
        />
      </View>

      {/* Current Song Details */}
      <View style={styles.currentSongDetails}>
        <Image
          source={{ uri: details.artwork }}
          style={styles.currentSongImage}
        />
        <View style={styles.currentSongTitles}>
          <Text style={[styles.currentSongName, { color: theme.primary }]}>
            {details.title}
          </Text>
          <Text style={[styles.currentSongAuthor, { color: theme.author }]}>
            {' '}
            {details.artist}
          </Text>
        </View>

        {/* Controllers */}
        <View style={styles.controllersWrapper}>
          <Feather name='skip-back' size={20} color={theme.primary} />
          <AntDesign
            name='pause'
            style={{ marginLeft: 16 }}
            size={20}
            color={theme.primary}
          />
          <Feather
            name='skip-forward'
            style={{ marginLeft: 16 }}
            size={20}
            color={theme.primary}
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
    fontSize: 18,
  },
  currentSongAuthor: {
    fontFamily: 'Roboto_400Regular',
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
