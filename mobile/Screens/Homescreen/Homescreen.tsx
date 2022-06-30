import {
  StyleSheet,
  View,
  Text,
  Platform,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native'
import React, { FC } from 'react'
import colors from '../../../assets/colors/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { DrawerActions } from '@react-navigation/native'
import { RootStackParamList } from '../../../App'
import { Feather, FontAwesome } from '@expo/vector-icons'
import SongDetails from '../../Components/LikedSongs/SongDetails'
import CurrentSong from '../../Components/General/CurrentSong'
import { Song } from '../../utils/Song'

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Homescreen'>

const Homescreen: FC<HomeScreenProps> = ({ navigation }) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const customData = require('../../../assets/data/songs.json')

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header */}
        <SafeAreaView>
          <View style={styles.headerIcons}>
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            >
              <FontAwesome name='bars' size={24} color={colors.secondary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('LikedSongs')}>
              <Feather name='search' size={24} color={colors.secondary} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        {/* Recommended Title */}
        <Text style={styles.recommendedTitle}>Recommended for you</Text>

        <View style={styles.songsWrapper}>
          <FlatList
            data={customData['songs']}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <SongDetails
                song={new Song(item.name, item.author, item.imageURL)}
                imageSize={{ height: 190, width: 190 }}
                fontSize={{ songNameFontSize: 16, authorFontSize: 10 }}
              />
            )}
            ItemSeparatorComponent={() => {
              return <View style={{ width: 20 }} />
            }}
            contentContainerStyle={{ paddingRight: 30 }}
          ></FlatList>
        </View>

        {/* My Playlist Title */}
        <Text style={styles.playlistTitle}>My Playlist</Text>

        <View style={styles.songsWrapper}>
          <FlatList
            data={customData['songs']}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <SongDetails
                song={new Song(item.name, item.author, item.imageURL)}
                imageSize={{ height: 190, width: 190 }}
                fontSize={{ songNameFontSize: 16, authorFontSize: 10 }}
              />
            )}
            ItemSeparatorComponent={() => {
              return <View style={{ width: 20 }} />
            }}
            contentContainerStyle={{ paddingRight: 30, paddingBottom: 90 }}
          ></FlatList>
        </View>
      </ScrollView>

      {/* Bottom Layer */}
      <View style={styles.bottomLayerWrapper}>
        <CurrentSong details={customData['songs'][3]} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 35,
  },
  recommendedTitle: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 24,
    color: colors.secondary,
    paddingHorizontal: 30,
    paddingBottom: 25,
  },
  songsWrapper: {
    paddingLeft: 30,
  },
  playlistTitle: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 24,
    color: colors.secondary,
    paddingHorizontal: 30,
    paddingTop: 15,
    paddingBottom: 25,
  },
  bottomLayerWrapper: {
    width: '100%',
    height: 90,
    bottom: 0,
    position: 'absolute',
    backgroundColor: colors.primary,
  },
  navigator: {
    width: 50,
    height: 50,
    backgroundColor: colors.secondary,
  },
})

export default Homescreen
