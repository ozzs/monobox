import {
  StyleSheet,
  View,
  Text,
  Image,
  Platform,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native'
import React, { FC, useContext } from 'react'
import themeContext from '../../../assets/styles/themeContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { DrawerActions } from '@react-navigation/native'
import { RootStackParamList } from '../../../App'
import { Feather, FontAwesome } from '@expo/vector-icons'
import SongDetails from '../../Components/General/SongDetails'
import CurrentSong from '../../Components/General/CurrentSong'
import { Song } from '../../utils/Song'
import {
  useApiRequest,
  useCurrentTrack,
} from '../../MusicPlayerServices/MusicPlayerHooks'
import { Track } from 'react-native-track-player'

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Homescreen'>

const Homescreen: FC<HomeScreenProps> = ({ navigation }) => {
  const theme = useContext(themeContext)
  const track = useCurrentTrack()

  // Fetches required songs
  const { data, error } = useApiRequest('http://10.0.0.15:5000/songs')

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView>
        {/* Header */}
        <SafeAreaView>
          <View style={styles.headerIcons}>
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            >
              <FontAwesome name='bars' size={24} color={theme.primary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('LikedSongs')}>
              <Feather name='search' size={24} color={theme.primary} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        {/* Recommended Title */}
        <Text style={[styles.recommendedTitle, { color: theme.primary }]}>
          Recommended for you
        </Text>

        <View style={styles.songsWrapper}>
          <FlatList
            data={data}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <SongDetails
                song={item.Song}
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
        <Text style={[styles.playlistTitle, { color: theme.primary }]}>
          My Playlist
        </Text>

        <View style={styles.songsWrapper}>
          <FlatList
            data={data}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <SongDetails
                song={item.Song}
                imageSize={{ height: 190, width: 190 }}
                fontSize={{ songNameFontSize: 16, authorFontSize: 10 }}
              />
            )}
            ItemSeparatorComponent={() => {
              return <View style={{ width: 20 }} />
            }}
            contentContainerStyle={{
              paddingRight: 30,
              paddingBottom: track === undefined ? 0 : 90,
            }}
          ></FlatList>
        </View>
      </ScrollView>

      {/* Bottom Layer */}
      {track === undefined ? null : (
        <View
          style={[
            styles.bottomLayerWrapper,
            { backgroundColor: theme.background },
          ]}
        >
          <CurrentSong track={track} />
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
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 35,
  },
  recommendedTitle: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 24,
    paddingHorizontal: 30,
    paddingBottom: 25,
  },
  songsWrapper: {
    paddingLeft: 30,
  },
  playlistTitle: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 24,
    paddingHorizontal: 30,
    paddingTop: 15,
    paddingBottom: 25,
  },
  bottomLayerWrapper: {
    width: '100%',
    height: 90,
    bottom: 0,
    position: 'absolute',
  },
})

export default Homescreen
