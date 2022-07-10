import TrackPlayer, { State } from 'react-native-track-player'

export const togglePlayBack = async (playBackState: State) => {
  const currentTrack = await TrackPlayer.getCurrentTrack()
  if (currentTrack != null) {
    if (playBackState === State.Paused) {
      await TrackPlayer.play()
    } else {
      await TrackPlayer.pause()
    }
  }
}
