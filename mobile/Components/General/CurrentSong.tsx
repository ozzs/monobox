/* React / React-Native imports */
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import React, { FC, useContext } from 'react'

/* Navigation imports */
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../App'

/* Icons imports */
import { Feather, AntDesign } from '@expo/vector-icons'

/* Components imports */
import Slider from '@react-native-community/slider'

/* utils imports */
import themeContext from '../../../assets/styles/themeContext'
import { BASE_API_URL, BASE_API_PORT } from '../../utils/BaseAPI'

/* Music Player imports */
import { useOnTogglePlayback } from '../../MusicPlayerServices/MusicPlayerHooks'
import TrackPlayer, {
  State,
  Track,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player'

interface TrackInfoProps {
  track: Track
  currentPlaylist: Track[]
}

type CurrentSongProps = NativeStackNavigationProp<
  RootStackParamList,
  'Homescreen'
>

const CurrentSong: FC<TrackInfoProps> = ({ track, currentPlaylist }) => {
  const theme = useContext(themeContext)
  const navigation = useNavigation<CurrentSongProps>()

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
              playlist: currentPlaylist,
              song_id: track.id,
            })
          }
        >
          <Image
            source={{
              uri: `http://${BASE_API_URL}:${BASE_API_PORT}/songs/${
                track?.id
              }/artwork/${new Date().getMilliseconds}`,
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
