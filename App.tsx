/* eslint-disable camelcase */
import 'react-native-gesture-handler'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import {
  Roboto_400Regular,
  Roboto_700Bold,
  Roboto_500Medium,
} from '@expo-google-fonts/roboto'
import { useFonts } from 'expo-font'
import LikedSongs from './mobile/Screens/LikedSongs/LikedSongs'
import Homescreen from './mobile/Screens/Homescreen/Homescreen'
import CustomDrawerContent from './mobile/Screens/Homescreen/CustomDrawerContent'
import SongsCarousel from './mobile/Screens/SongsCarousel/SongsCarousel'

export type RootStackParamList = {
  Homescreen: undefined
  LikedSongs: undefined
  SongsCarousel: undefined
  Profile: undefined
}

const Drawer = createDrawerNavigator<RootStackParamList>()

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Roboto_500Medium,
  })

  if (!fontsLoaded) {
    return null
  }

  return (
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
  )
}
