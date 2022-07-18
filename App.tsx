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

/* Track Player imports */
import { setupPlayer } from './mobile/MusicPlayerServices/SetupService'
import { Song } from './mobile/utils/Song'

/* Design setup imports */
import {
  Roboto_400Regular,
  Roboto_700Bold,
  Roboto_500Medium,
} from '@expo-google-fonts/roboto'
import { useFonts } from 'expo-font'

/* Screens imports */
import LikedSongs from './mobile/Screens/LikedSongs/LikedSongs'
import Homescreen from './mobile/Screens/Homescreen/Homescreen'
import CustomDrawerContent from './mobile/Screens/Homescreen/CustomDrawerContent'
import SongsCarousel from './mobile/Screens/SongsCarousel/SongsCarousel'

export type RootStackParamList = {
  Homescreen: undefined
  LikedSongs: undefined
  SongsCarousel: undefined
  Profile: undefined
  CustomDrawerContent: undefined
}

const Drawer = createDrawerNavigator<RootStackParamList>()

export default function App() {
  const [mode, setMode] = useState(true)
  useEffect(() => {
    setupPlayer()
    EventRegister.addEventListener('changeTheme', (data) => {
      setMode(data)
      console.log(data)
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
    <themeContext.Provider value={mode === true ? theme.dark : theme.light}>
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
            name='LikedSongs'
            component={LikedSongs}
            options={{ headerShown: false }}
          />
          <Drawer.Screen
            name='SongsCarousel'
            component={SongsCarousel}
            options={{ headerShown: false }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </themeContext.Provider>
  )
}
