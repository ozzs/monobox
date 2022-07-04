import { AntDesign } from '@expo/vector-icons'
import React, { FC, useContext } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Platform,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import SongDetails from '../../Components/General/SongDetails'
import CurrentSong from '../../Components/General/CurrentSong'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../App'
import { Song } from '../../utils/Song'
import themeContext from '../../../assets/styles/themeContext'

type LikedSongsProps = NativeStackScreenProps<RootStackParamList, 'Homescreen'>

const LikedSongs: FC<LikedSongsProps> = ({ navigation }) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const customData = require('../../../assets/data/songs.json')
  const theme = useContext(themeContext)
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
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
      <Text style={[styles.title, { color: theme.primary }]}>Liked Songs</Text>

      {/* Songs */}
      <View style={styles.songsWrapper}>
        <FlatList
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={customData['songs']}
          renderItem={({ item }) => (
            <SongDetails
              song={new Song(item.title, item.artist, item.artwork, item.url)}
              imageSize={{ height: 150, width: 150 }}
              fontSize={{ songNameFontSize: 14, authorFontSize: 10 }}
            />
          )}
          contentContainerStyle={{ paddingBottom: 90 }}
        ></FlatList>
      </View>

      {/* Bottom Layer */}
      <View
        style={[
          styles.bottomLayerWrapper,
          { backgroundColor: theme.background },
        ]}
      >
        <CurrentSong details={customData['songs'][5]} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
