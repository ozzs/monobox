import TrackPlayer, { Capability, RatingType } from 'react-native-track-player'

export async function setupPlayer() {
  try {
    await TrackPlayer.setupPlayer({ autoUpdateMetadata: true })
    await TrackPlayer.updateOptions({
      stopWithApp: false,
      ratingType: RatingType.Heart,
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
      ],
    })
  } catch (e) {
    console.log(e)
  }
}
