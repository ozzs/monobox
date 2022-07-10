import registerRootComponent from 'expo/build/launch/registerRootComponent'
import { PlaybackService } from './mobile/MusicPlayerServices/PlaybackService'

import App from './App'
import TrackPlayer from 'react-native-track-player'

registerRootComponent(App)
TrackPlayer.registerPlaybackService(() => PlaybackService)
