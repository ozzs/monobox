/* eslint-disable camelcase */
import 'react-native-gesture-handler'
import React, { useState, useEffect } from 'react'

/* Navigation imports */
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'

/* Theme imports */
import { EventRegister } from 'react-native-event-listeners'
import theme from './assets/styles/theme'
import themeContext from './assets/styles/themeContext'

/* utils imports */
import trackContext from './mobile/utils/CurrentSongContext'
import playlistContextInterface from './mobile/utils/PlaylistIDContext'

/* Music Player imports */
import { setupPlayer } from './mobile/MusicPlayerServices/SetupService'
import { useCurrentTrack } from './mobile/MusicPlayerServices/MusicPlayerHooks'

/* Design setup imports */
import {
  Roboto_400Regular,
  Roboto_700Bold,
  Roboto_500Medium,
} from '@expo-google-fonts/roboto'
import { useFonts } from 'expo-font'

/* Screens imports */
import Library from './mobile/Screens/Library/Library'
import LikedSongs from './mobile/Screens/LikedSongs/LikedSongs'
import Homescreen from './mobile/Screens/Homescreen/Homescreen'
import FAQ from './mobile/Screens/FAQ/FAQ'
import SongsCarousel from './mobile/Screens/SongsCarousel/SongsCarousel'
import CustomDrawerContent from './mobile/Screens/Homescreen/CustomDrawerContent'

import { QueryClientProvider, QueryClient } from 'react-query'
import { Track } from 'react-native-track-player'

const queryClient = new QueryClient()

export type RootStackParamList = {
  Homescreen: undefined
  Library: undefined
  LikedSongs: undefined
  FAQ: undefined
  SongsCarousel: { playlist: Track[]; song_id: number } | undefined
  CustomDrawerContent: undefined
}

const Drawer = createDrawerNavigator<RootStackParamList>()

export default function App() {
  const [mode, setMode] = useState(true)

  const [currentPlaylist, setCurrentPlaylist] = useState({} as Track[])
  const currentTrack = useCurrentTrack()

  useEffect(() => {
    setupPlayer()
    EventRegister.addEventListener('changeTheme', (data) => {
      setMode(data)
    })
    EventRegister.removeEventListener('changeTheme')
  }, [])

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Roboto_500Medium,
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <QueryClientProvider client={queryClient}>
      <themeContext.Provider value={mode === true ? theme.dark : theme.light}>
        <playlistContextInterface.Provider
          value={{ currentPlaylist, setCurrentPlaylist }}
        >
          <trackContext.Provider value={currentTrack}>
            <NavigationContainer>
              <Drawer.Navigator
                initialRouteName='Homescreen'
                drawerContent={(props) => <CustomDrawerContent {...props} />}
              >
                <Drawer.Screen
                  name='Homescreen'
                  component={Homescreen}
                  options={{ headerShown: false }}
                />
                <Drawer.Screen
                  name='Library'
                  component={Library}
                  options={{ headerShown: false }}
                />
                <Drawer.Screen
                  name='LikedSongs'
                  component={LikedSongs}
                  options={{ headerShown: false }}
                />
                <Drawer.Screen
                  name='FAQ'
                  component={FAQ}
                  options={{ headerShown: false }}
                />
                <Drawer.Screen
                  name='SongsCarousel'
                  component={SongsCarousel}
                  options={{ headerShown: false }}
                />
              </Drawer.Navigator>
            </NavigationContainer>
          </trackContext.Provider>
        </playlistContextInterface.Provider>
      </themeContext.Provider>
    </QueryClientProvider>
  )
}
