import TrackPlayer, { Capability } from 'react-native-track-player'

const tracks = [
  {
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    title: 'exampleTitle',
    artist: 'exampleArtist',
    album: 'exampleAlbum',
    artwork: 'exampleArtwork',
  },
]

export async function setupPlayer() {
  try {
    await TrackPlayer.setupPlayer({})
    await TrackPlayer.add(tracks)
    await TrackPlayer.updateOptions({
      stopWithApp: false,
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
      ],
    })
  } catch (e) {
    console.log(e)
  }
}
