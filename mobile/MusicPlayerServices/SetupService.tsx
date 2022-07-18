import { useEffect, useState } from 'react'
import TrackPlayer, { Capability } from 'react-native-track-player'
import { Song } from '../utils/Song'

export async function setupPlayer() {
  try {
    await TrackPlayer.setupPlayer({})
    // await TrackPlayer.add(tracks)
    await TrackPlayer.updateOptions({
      stopWithApp: false,
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
