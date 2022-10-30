/* React / React-Native imports */
import { View, Text, StyleSheet } from 'react-native'
import React, { FC, useContext } from 'react'

/* Theme imports */
import themeContext from '../../../../assets/styles/themeContext'

/* Music Player imports */
import { getCurrentTrackDuration } from '../SongsCarouselFunctions'
import TrackPlayer, { Track, useProgress } from 'react-native-track-player'

/* Components imports */
import Slider from '@react-native-community/slider'

interface SongsCarouselSliderProps {
  currentTrack: Track | undefined
}

const SongsCarouselSlider: FC<SongsCarouselSliderProps> = ({
  currentTrack,
}) => {
  const theme = useContext(themeContext)
  const progress = useProgress()

  return (
    <>
      <View style={styles.sliderTimesWrapper}>
        <Text style={[styles.sliderTime, { color: theme.primary }]}>
          {new Date(progress.position * 1000).toISOString().slice(14, 19)}
        </Text>
        <Text style={[styles.sliderTime, { color: theme.primary }]}>
          {new Date(
            (getCurrentTrackDuration(currentTrack) - progress.position) * 1000,
          )
            .toISOString()
            .slice(14, 19)}
        </Text>
      </View>
      <Slider
        style={styles.slider}
        value={progress.position}
        minimumValue={0}
        maximumValue={getCurrentTrackDuration(currentTrack)}
        thumbTintColor={theme.primary}
        minimumTrackTintColor={theme.primary}
        maximumTrackTintColor={theme.primary}
        onSlidingComplete={async (value) => {
          await TrackPlayer.seekTo(value)
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  sliderTimesWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 30,
  },
  sliderTime: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 12,
  },
  slider: {
    marginHorizontal: 15,
  },
})

export default SongsCarouselSlider
