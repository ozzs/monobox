import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Platform,
  StatusBar,
  FlatList,
  ScrollView,
} from 'react-native'
import colors from '../../assets/colors/colors'
import SongDetails from './SongDetails'
import CurrentSong from '../CurrentSongBottom/CurrentSong'

export default function LikedSongs() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const customData = require('../../assets/data/songs.json')
  console.log(customData)
  return (
    <View style={styles.container}>
      {/* Header */}
      <SafeAreaView>
        <View style={styles.headerIcons}>
          <AntDesign name='arrowleft' size={24} color={colors.secondary} />
          <AntDesign name='bars' size={24} color={colors.secondary} />
        </View>
      </SafeAreaView>

      {/* Title */}
      <Text style={styles.title}>Liked Songs</Text>

      {/* Songs */}
      <View style={styles.songsWrapper}>
        <FlatList
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          numColumns={2}
          data={customData['songs']}
          renderItem={({ item }) => <SongDetails details={item} />}
        ></FlatList>
      </View>

      {/* Bottom Layer */}
      <View style={styles.bottomLayerWrapper}>
        <CurrentSong details={customData['songs'][5]} />
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
  bottomLayerWrapper: {
    width: '100%',
    height: 90,
    bottom: 0,
    position: 'absolute',
    backgroundColor: colors.primary,
  },
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 35,
  },
  title: {
    paddingHorizontal: 30,
    fontFamily: 'Roboto_700Bold',
    fontSize: 24,
    color: colors.secondary,
  },
  songsWrapper: {
    flex: 1,
    paddingHorizontal: 30,
    marginBottom: 90,
  },
})
