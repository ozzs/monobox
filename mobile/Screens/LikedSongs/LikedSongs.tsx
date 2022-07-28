import { AntDesign } from '@expo/vector-icons'
import React, { FC, useContext, useEffect, useState } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Platform,
  StatusBar,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import SongDetails from '../../Components/General/SongDetails'
import CurrentSong from '../../Components/General/CurrentSong'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../App'
import themeContext from '../../../assets/styles/themeContext'
import {
  useCurrentTrack,
  useTracksApiRequest,
} from '../../MusicPlayerServices/MusicPlayerHooks'
import { Track } from 'react-native-track-player'

type LikedSongsProps = NativeStackScreenProps<RootStackParamList, 'Homescreen'>

const LikedSongs: FC<LikedSongsProps> = ({ navigation }) => {
  const { playlist, error } = useTracksApiRequest(
    'http://192.168.1.131:5000/songs/liked',
  )
  const currentTrack = useCurrentTrack()

  console.log('PLAYLIST: ', playlist)
  console.log('TRACK: ', currentTrack)

  const theme = useContext(themeContext)
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {playlist.length < 0 ? (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size='large' color={theme.primary} />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          {/* Header */}
          <SafeAreaView>
            <View style={styles.headerIcons}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <AntDesign name='arrowleft' size={24} color={theme.primary} />
              </TouchableOpacity>
              <AntDesign name='bars' size={24} color={theme.primary} />
            </View>
          </SafeAreaView>

          {/* Title */}
          <Text style={[styles.title, { color: theme.primary }]}>
            Liked Songs
          </Text>

          {/* Songs */}
          <View style={styles.songsWrapper}>
            <FlatList
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              data={playlist}
              renderItem={({ item }) => (
                <SongDetails
                  song={item.Song}
                  imageSize={{ height: 150, width: 150 }}
                  fontSize={{ songNameFontSize: 14, authorFontSize: 10 }}
                />
              )}
              contentContainerStyle={{ paddingBottom: 90 }}
            ></FlatList>
          </View>
          {/* <CurrentSong track={currentTrack} playlistID={2} />
          <Text>BLABLABLA</Text> */}

          {/* Bottom Layer */}
          {currentTrack === undefined ? null : (
            <View
              style={[
                styles.bottomLayerWrapper,
                { backgroundColor: theme.background },
              ]}
            >
              <CurrentSong track={currentTrack} />
            </View>
          )}
        </View>
      )}
    </View>
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
  bottomLayerWrapper: {
    width: '100%',
    height: 90,
    bottom: 0,
    position: 'absolute',
  },
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 35,
  },
  title: {
    paddingHorizontal: 30,
    paddingBottom: 25,
    fontFamily: 'Roboto_700Bold',
    fontSize: 24,
  },
  songsWrapper: {
    flex: 1,
    paddingHorizontal: 30,
  },
})

export default LikedSongs
