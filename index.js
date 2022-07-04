import registerRootComponent from 'expo/build/launch/registerRootComponent'

import App from './App'
import TrackPlayer from 'react-native-track-player'

registerRootComponent(App)
TrackPlayer.registerPlaybackService(() => require('./service'))
