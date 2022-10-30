/* React / React-Native imports */
import {
  StyleSheet,
  View,
  Text,
  Image,
  Platform,
  StatusBar,
  SafeAreaView,
  Animated as ReactAnimated,
  FlatList,
  ActivityIndicator,
} from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'

/* Theme imports */
import themeContext from '../../../assets/styles/themeContext'

/* Navigation imports */
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../App'

/* utils imports */
import { windowWidth } from '../../utils/Dimensions'
import { BASE_API_URL, BASE_API_PORT } from '../../utils/BaseAPI'

/* Music Player imports */
import {
  useCurrentTrack,
  useSetupTracks,
  useTracksApiRequest,
} from '../../MusicPlayerServices/MusicPlayerHooks'
import TrackPlayer, {
  Event,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player'

/* Components imports */
import SongsCarouselHeader from './Components/SongsCarouselHeader'
import SongsCarouselSlider from './Components/SongsCarouselSlider'
import SongsCarouselOptions from './Components/SongsCarouselOptions'
import SongsCarouselControllers from './Components/SongsCarouselControllers'

type SongsCarouselProps = NativeStackScreenProps<
  RootStackParamList,
  'SongsCarousel'
>

const SongsCarousel = ({ route }: SongsCarouselProps) => {
  const song_id = route.params?.song_id
  const playlist_id = route.params?.playlist_id

  /* General use variables */
  const theme = useContext(themeContext)

  /* TrackPlayer variables initialization */
  const progress = useProgress()
  const currentTrack = useCurrentTrack()

  /* Carousel variables initialization */
  const carouselRef = useRef<FlatList>(null)
  const scrollX = useRef(new ReactAnimated.Value(0)).current
  const [songIndex, setSongIndex] = useState(0)
  const [repeatMode, setRepeatMode] = useState('off')
  const [trackTitle, setTrackTitle] = useState<string>()
  const [trackArtist, setTrackArtist] = useState<string>()
  const [trackArtwork, setTrackArtwork] = useState<number>()
  const [trackRating, setTrackRating] = useState<number | boolean>()

  // Fetches required songs
  const { playlist, error } = useTracksApiRequest(
    playlist_id
      ? `http://${BASE_API_URL}:${BASE_API_PORT}/songs/${playlist_id}/fetch`
      : `http://${BASE_API_URL}:${BASE_API_PORT}/songs`,
  )
  if (error) console.error(error)

  // Sets up tracks for TrackPlayer after data is fetched & set
  const { index, isLoaded } = useSetupTracks(playlist, song_id)

  useEffect(() => {
    setSongIndex(index)
  }, [index])

  /* Trackplayer event listener */
  useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
    if (
      event.type === Event.PlaybackTrackChanged &&
      event.nextTrack !== undefined
    ) {
      const track = await TrackPlayer.getTrack(event.nextTrack)

      if (track !== null) {
        const { title, artist, id, rating } = track
        setTrackTitle(title)
        setTrackArtist(artist)
        setTrackArtwork(id)
        setTrackRating(rating)
      }
    }
  })

  /* Carousel scrolling */
  useEffect(() => {
    scrollX.addListener(({ value }) => {
      const index = Math.round(value / windowWidth)
      skipTo(index)
      setSongIndex(index)
    })
    return () => scrollX.removeAllListeners()
  }, [])

  /* Function: skip to specific track */
  const skipTo = async (trackID: number) => {
    await TrackPlayer.skip(trackID)
    await TrackPlayer.play()
  }

  /* Function: skip to next track */
  const skipToNext = () => {
    if (carouselRef.current != null) {
      carouselRef.current.scrollToOffset({
        offset: (songIndex + 1) * windowWidth,
      })
    }
  }

  /* Function: skip to previous track */
  const skipToPrevious = () => {
    // Returns to beginning of track, according to current position
    if (progress.position > 3) {
      TrackPlayer.seekTo(0)
    } else if (carouselRef.current != null) {
      carouselRef.current.scrollToOffset({
        offset: (songIndex - 1) * windowWidth,
      })
    }
  }

  /* Function (Carousel): renders track's artwork */
  const renderSong = () => {
    return (
      <View style={styles.carouselImageContainer}>
        <Image
          source={{
            uri: `http://${BASE_API_URL}:${BASE_API_PORT}/songs/${trackArtwork}/artwork`,
          }}
          style={styles.carouselImage}
        />
      </View>
    )
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      {isLoaded ? (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size='large' color={theme.primary} />
        </View>
      ) : (
        <View>
          {/* Header */}
          <SongsCarouselHeader />

          {/* Songs Carousel */}
          <ReactAnimated.FlatList
            ref={carouselRef}
            data={playlist}
            renderItem={renderSong}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            initialScrollIndex={index}
            getItemLayout={(data, index) => ({
              length: 260,
              offset: windowWidth * index,
              index,
            })}
            onScroll={ReactAnimated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: { x: scrollX },
                  },
                },
              ],
              { useNativeDriver: true },
            )}
          />

          <View>
            <Text
              style={{
                paddingTop: 20,
                paddingHorizontal: 35,
                fontFamily: 'Roboto_500Medium',
                textAlign: 'center',
                fontSize: 24,
                color: theme.primary,
              }}
              numberOfLines={1}
              ellipsizeMode='tail'
            >
              {trackTitle}
            </Text>
            <Text
              style={{
                paddingTop: 5,
                paddingHorizontal: 30,
                fontFamily: 'Roboto_400Regular',
                textTransform: 'uppercase',
                textAlign: 'center',
                fontSize: 16,
                color: theme.author,
              }}
              numberOfLines={1}
              ellipsizeMode='tail'
            >
              {trackArtist}
            </Text>
          </View>

          {/* Options */}
          <SongsCarouselOptions
            repeatMode={repeatMode}
            setRepeatMode={setRepeatMode}
            trackRating={trackRating}
            setTrackRating={setTrackRating}
            songIndex={songIndex}
          />

          {/* Slider */}
          <SongsCarouselSlider currentTrack={currentTrack} />

          {/* Controllers */}
          <SongsCarouselControllers
            skipToPrevious={skipToPrevious}
            skipToNext={skipToNext}
          />
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  activityIndicatorContainer: {
    minHeight: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  carouselImageContainer: {
    width: windowWidth,
    paddingTop: 40,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselImage: {
    width: 260,
    height: 260,
    borderRadius: 5,
  },
  controllersWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35,
    marginBottom: 50,
  },
})

export default SongsCarousel
