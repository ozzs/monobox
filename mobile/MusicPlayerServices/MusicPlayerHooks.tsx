/* React / React-Native imports */
import { useCallback, useEffect, useState } from 'react'

/* Music Player imports */
import TrackPlayer, {
  usePlaybackState,
  State,
  Track,
  Event,
  useTrackPlayerEvents,
} from 'react-native-track-player'

/* utils imports */
import { BASE_API_URL, BASE_API_PORT } from '../utils/BaseAPI'

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

export const useCurrentQueue = () => {
  const [queueList, setQueueList] = useState<Track[]>()
  const [isLoading, setIsLoading] = useState(true)

  const getCurrentQueue = async () => {
    const queue = await TrackPlayer.getQueue()
    setQueueList(queue)
    setIsLoading(false)
  }

  useEffect(() => {
    getCurrentQueue()
  }, [])

  return queueList
}

export const useSetupTracks = (
  playlist: Track[] | undefined,
  song_id: number | undefined,
) => {
  const [isLoading, setIsLoading] = useState(true)
  const [index, setIndex] = useState(0)

  const setupTracks = async () => {
    await TrackPlayer.reset()
    const tracks: Track[] = []
    playlist !== undefined
      ? playlist.map((item) => {
          const track: Track = {
            id: item.id,
            url: `http://${BASE_API_URL}:${BASE_API_PORT}/songs/${item.id}/stream`,
            title: item.title,
            artist: item.artist,
            artwork: item.artwork,
            rating: item.liked_bool ? true : false,
            duration: item.duration,
          }
          tracks.push(track)
        })
      : null
    await TrackPlayer.add(tracks)

    const index = tracks.findIndex((track) => track.id === song_id)
    if (index !== -1) {
      setIndex(index)
      await TrackPlayer.skip(index)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    setupTracks()
  }, [playlist])

  return { index, isLoading }
}
