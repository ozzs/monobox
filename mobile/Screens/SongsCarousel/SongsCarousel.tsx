import {
  StyleSheet,
  View,
  Text,
  Platform,
  StatusBar,
  TouchableOpacity,
} from 'react-native'
import React, { FC, useContext, useEffect } from 'react'
import Carousel from 'react-native-snap-carousel'
import SongsDetails from '../../Components/General/SongDetails'
import musicPlayer from '../../../musicPlayer'
import { Song } from '../../utils/Song'
import { windowWidth } from '../../utils/Dimensions'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../App'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign, Feather } from '@expo/vector-icons'
import Slider from '@react-native-community/slider'
import themeContext from '../../../assets/styles/themeContext'
import TrackPlayer, {
  Capability,
  State,
  usePlaybackState,
} from 'react-native-track-player'

type SongsCarouselProps = NativeStackScreenProps<
  RootStackParamList,
  'SongsCarousel'
>

const tracks = [
  {
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    title: 'Avaritia',
    artist: 'deadmau5',
    album: 'while(1<2)',
    genre: 'Progressive House, Electro House',
    date: '2014-05-20T07:00:00+00:00', // RFC 3339
    artwork: 'http://example.com/cover.png', // Load artwork from the network
    duration: 402, // Duration in seconds
  },
]

TrackPlayer.updateOptions({
  stopWithApp: false,
  capabilities: [
    Capability.Play,
    Capability.Pause,
    Capability.SkipToNext,
    Capability.SkipToPrevious,
    Capability.Stop,
  ],
  compactCapabilities: [
    Capability.Play,
    Capability.Pause,
    Capability.SkipToNext,
  ],
})

async function setupPlayer() {
  try {
    await TrackPlayer.setupPlayer({})
    await TrackPlayer.add(tracks)
  } catch (e) {
    console.log(e)
  }
}

const togglePlayBack = async (playBackState: State) => {
  const currentTrack = await TrackPlayer.getCurrentTrack()
  if (currentTrack != null) {
    if (playBackState === State.Paused) {
      await TrackPlayer.play()
    } else {
      await TrackPlayer.pause()
    }
  }
}

const SongsCarousel: FC<SongsCarouselProps> = ({ route, navigation }) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const customData = require('../../../assets/data/songs.json')
  const theme = useContext(themeContext)
  useEffect(() => {
    setupPlayer()
  }, [])
  const playBackState = usePlaybackState()
  const renderSong = ({ item }: { item: Song }) => {
    return (
      <View>
        <SongsDetails
          song={new Song(item.title, item.artist, item.artwork, item.url)}
          imageSize={{ height: 260, width: 260 }}
          fontSize={{ songNameFontSize: 24, authorFontSize: 16 }}
        />
      </View>
    )
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      {/* Header */}
      <View style={styles.headerWrapper}>
        <View style={styles.headerLeftContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name='arrowleft' size={24} color={theme.primary} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={[styles.playingNowTitle, { color: theme.primary }]}>
            Playing Now
          </Text>
        </View>
        <View style={styles.headerRightContainer} />
      </View>

      {/* Songs Carousel */}
      <View style={styles.carouselContainer}>
        <Carousel
          data={customData['songs']}
          renderItem={renderSong}
          sliderWidth={windowWidth}
          itemWidth={280}
        />
      </View>

      {/* Options */}
      <View style={styles.optionsWrapper}>
        <View style={styles.optionsLeftContainer}>
          <Feather name='volume-1' size={20} color={theme.icon} />
        </View>
        <View style={styles.optionsCenterContainer}>
          <AntDesign name='hearto' size={20} color={theme.icon} />
        </View>
        <View style={styles.optionsRightContainer}>
          <Feather name='repeat' size={20} color={theme.icon} />
          <Feather
            name='shuffle'
            size={20}
            color={theme.icon}
            style={styles.shuffleIcon}
          />
        </View>
      </View>

      {/* Slider Times */}
      <View style={styles.sliderTimesWrapper}>
        <Text style={[styles.sliderTime, { color: theme.primary }]}>00:50</Text>
        <Text style={[styles.sliderTime, { color: theme.primary }]}>04:00</Text>
      </View>

      {/* Slider */}
      <Slider
        style={styles.slider}
        value={0.5}
        minimumValue={0}
        maximumValue={1}
        thumbTintColor={theme.primary}
        minimumTrackTintColor={theme.primary}
        maximumTrackTintColor={theme.primary}
      />

      {/* Controllers */}
      <View style={styles.controllersWrapper}>
        <Feather name='skip-back' size={30} color={theme.primary} />
        <TouchableOpacity
          onPress={() => {
            togglePlayBack(playBackState)
            console.log(route.params.playBackState)
          }}
        >
          <AntDesign
            name='pause'
            style={{ marginLeft: 40 }}
            size={35}
            color={theme.primary}
          />
        </TouchableOpacity>
        <Feather
          name='skip-forward'
          style={{ marginLeft: 40 }}
          size={30}
          color={theme.primary}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 42,
    paddingTop: 35,
  },
  headerLeftContainer: {
    flex: 1,
    paddingLeft: 30,
  },
  playingNowTitle: {
    fontFamily: 'Roboto_500Medium',
    fontSize: 20,
    textAlign: 'center',
  },
  headerRightContainer: {
    flex: 1,
    paddingRight: 30,
  },
  carouselContainer: {
    paddingBottom: 10,
  },
  optionsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionsLeftContainer: {
    flex: 1,
    paddingLeft: 30,
  },
  optionsCenterContainer: {
    flex: 1,
    alignItems: 'center',
  },
  optionsRightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 30,
  },
  shuffleIcon: {
    marginLeft: 15,
  },
  sliderTimesWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    paddingTop: 50,
    paddingBottom: 30,
  },
  sliderTime: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 12,
  },
  slider: {
    marginHorizontal: 15,
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
