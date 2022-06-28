/* eslint-disable camelcase */
import React from 'react'
import { Roboto_400Regular, Roboto_700Bold, Roboto_500Medium } from '@expo-google-fonts/roboto'
import { useFonts } from 'expo-font'
import LikedSongs from './mobile/LikedSongs/LikedSongs'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Roboto_500Medium,
  })

  if (!fontsLoaded) {
    return null
  }

  return <LikedSongs />
}
