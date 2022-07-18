import { useCallback, useEffect, useState } from 'react'
import TrackPlayer, {
  usePlaybackState,
  State,
  Track,
  Event,
  useTrackPlayerEvents,
} from 'react-native-track-player'

export const useOnTogglePlayback = () => {
  const state = usePlaybackState()
  const isPlaying = state === State.Playing

  return useCallback(() => {
    if (isPlaying) {
      TrackPlayer.pause()
    } else {
      TrackPlayer.play()
    }
  }, [isPlaying])
}

export const useCurrentTrack = (): Track | undefined => {
  const [index, setIndex] = useState<number | undefined>()
  const [track, setTrack] = useState<Track | undefined>()

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async ({ nextTrack }) => {
    setIndex(nextTrack)
  })

  useEffect(() => {
    if (index === undefined) return
    ;(async () => {
      const track = await TrackPlayer.getTrack(index)
      setTrack(track || undefined)
    })()
  }, [index])

  return track
}
