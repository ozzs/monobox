import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, SafeAreaView, View, Text, Platform, StatusBar, FlatList } from 'react-native'
import colors from '../../assets/colors/colors'
import SongDetails from './SongDetails'

export default function LikedSongs() {
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
          style={styles.songsList}
          numColumns={2}
          data={customData['songs']}
          renderItem={({ item }) => <SongDetails details={item} />}
        ></FlatList>
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
  title: {
    paddingHorizontal: 30,
    fontFamily: 'Roboto_700Bold',
    fontSize: 24,
    color: colors.secondary,
  },
  songsWrapper: { paddingHorizontal: 30 },
  songsList: {},
})
