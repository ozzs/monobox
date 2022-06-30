import {
  StyleSheet,
  View,
  Text,
  Platform,
  StatusBar,
  TouchableOpacity,
} from 'react-native'
import React, { FC } from 'react'
import Carousel from 'react-native-snap-carousel'
import SongsDetails from '../../Components/LikedSongs/SongDetails'
import { Song } from '../../utils/Song'
import colors from '../../../assets/colors/colors'
import { windowWidth } from '../../utils/Dimensions'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../App'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign, Feather } from '@expo/vector-icons'
import Slider from '@react-native-community/slider'

type SongsCarouselProps = NativeStackScreenProps<
  RootStackParamList,
  'SongsCarousel'
>

const SongsCarousel: FC<SongsCarouselProps> = ({ navigation }) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const customData = require('../../../assets/data/songs.json')

  const renderSong = ({ item }: { item: Song }) => {
    return (
      <View>
        <SongsDetails
          song={new Song(item.name, item.author, item.imageURL)}
          imageSize={{ height: 260, width: 260 }}
          fontSize={{ songNameFontSize: 24, authorFontSize: 16 }}
        />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerWrapper}>
        <View style={styles.headerLeftContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name='arrowleft' size={24} color={colors.secondary} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.playingNowTitle}>Playing Now</Text>
        </View>
        <View style={styles.headerRightContainer} />
      </View>

      {/* Songs Carousel */}
      <Carousel
        data={customData['songs']}
        renderItem={renderSong}
        sliderWidth={windowWidth}
        itemWidth={280}
        inactiveSlideShift={-24}
      />

      {/* Options */}
      <View style={styles.optionsWrapper}>
        <View style={styles.optionsLeftContainer}>
          <Feather name='volume-1' size={20} color={colors.drawerIcon} />
        </View>
        <View style={styles.optionsCenterContainer}>
          <AntDesign name='hearto' size={20} color={colors.drawerIcon} />
        </View>
        <View style={styles.optionsRightContainer}>
          <Feather name='repeat' size={20} color={colors.drawerIcon} />
          <Feather
            name='shuffle'
            size={20}
            color={colors.drawerIcon}
            style={styles.shuffleIcon}
          />
        </View>
      </View>

      {/* Slider Times */}
      <View style={styles.sliderTimesWrapper}>
        <Text style={styles.sliderTime}>00:50</Text>
        <Text style={styles.sliderTime}>04:00</Text>
      </View>

      {/* Slider */}
      <Slider
        style={styles.slider}
        value={0.5}
        minimumValue={0}
        maximumValue={1}
        thumbTintColor={colors.white}
        minimumTrackTintColor={colors.white}
        maximumTrackTintColor={colors.white}
      />

      {/* Controllers */}
      <View style={styles.controllersWrapper}>
        <Feather name='skip-back' size={30} color={colors.secondary} />
        <AntDesign
          name='pause'
          style={{ marginLeft: 40 }}
          size={35}
          color={colors.secondary}
        />
        <Feather
          name='skip-forward'
          style={{ marginLeft: 40 }}
          size={30}
          color={colors.secondary}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
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
    color: colors.playingNow,
  },
  headerRightContainer: {
    flex: 1,
    paddingRight: 30,
  },
  optionsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: colors.bandName,
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
    color: colors.bandName,
  },
  slider: {
    marginHorizontal: 15,
  },
  controllersWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 60,
  },
})

export default SongsCarousel
