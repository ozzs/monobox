import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import React, { FC, useContext, useMemo } from 'react'
import Slider from '@react-native-community/slider'

import { Feather, AntDesign } from '@expo/vector-icons'
import themeContext from '../../../assets/styles/themeContext'
import { useOnTogglePlayback } from '../../MusicPlayerServices/MusicPlayerHooks'
import TrackPlayer, {
  State,
  Track,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player'
import theme from '../../../assets/styles/theme'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../App'

interface TrackInfoProps {
  track?: Track
  playlistID?: number
}

type CurrentSongProps = NativeStackNavigationProp<
  RootStackParamList,
  'Homescreen'
>

const CurrentSong: FC<TrackInfoProps> = ({ track, playlistID }) => {
  const theme = useContext(themeContext)
  const navigation = useNavigation<CurrentSongProps>()

  const check = useMemo(() => playlistID, [playlistID])

  const state = usePlaybackState()
  const isPlaying = state === State.Playing
  const onTogglePlayback = useOnTogglePlayback()
  const progress = useProgress()

  return (
    <>
      {/* Slider */}
      <View style={styles.sliderWrapper}>
        <Slider
          style={styles.slider}
          value={progress.position}
          minimumValue={0}
          maximumValue={progress.duration}
          thumbTintColor={theme.primary}
          minimumTrackTintColor={theme.primary}
          maximumTrackTintColor={theme.primary}
          onSlidingComplete={async (value) => {
            TrackPlayer.seekTo(value)
          }}
        />
      </View>

      {/* Current Song Details */}
      <View style={styles.currentSongDetails}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('SongsCarousel', {
              playlist_id: check,
              song_id: 0,
            })
          }
        >
          <Image
            source={{
              uri: 'http://192.168.1.131:5000/songs/' + track?.id + '/artwork',
            }}
            style={styles.currentSongImage}
          />
        </TouchableOpacity>
        <View style={styles.currentSongTitles}>
          <Text
            style={[styles.currentSongName, { color: theme.primary }]}
            numberOfLines={1}
          >
            {track?.title}
          </Text>
          <Text
            style={[styles.currentSongAuthor, { color: theme.author }]}
            numberOfLines={1}
          >
            {' '}
            {track?.artist}
          </Text>
        </View>

        {/* Controllers */}
        <View style={styles.controllersWrapper}>
          <TouchableOpacity
            onPress={() => {
              TrackPlayer.skipToPrevious()
            }}
          >
            <Feather name='skip-back' size={20} color={theme.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onTogglePlayback}>
            <AntDesign
              name={isPlaying ? 'pause' : 'playcircleo'}
              style={{ marginLeft: 16 }}
              size={22}
              color={theme.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => TrackPlayer.skipToNext()}>
            <Feather
              name='skip-forward'
              style={{ marginLeft: 16 }}
              size={20}
              color={theme.primary}
            />
          </TouchableOpacity>
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
    paddingRight: '60%',
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
