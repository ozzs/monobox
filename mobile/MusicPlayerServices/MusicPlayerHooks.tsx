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

export const useApiRequest = (url: string) => {
  const [data, setData] = useState<Track[]>([])
  //   const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSongs = async () => {
      await fetch(url, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => {
          setError(error)
        })
    }
    fetchSongs()
  }, [url])

  return { data, error }
}

export const useSetupTracks = (data: Track[]) => {
  const [isLoaded, setIsLoaded] = useState(true)

  useEffect(() => {
    const setupTracks = async () => {
      const tracks: Track[] = []
      data.forEach((item) => {
        const track: Track = {
          id: 0,
          url: '',
          title: '',
          artist: '',
          artwork: '',
          duration: 0,
        }
        track['id'] = item.Song.id
        track['url'] = 'http://10.0.0.15:5000/songs/' + item.Song.id + '/stream'
        track['title'] = item.Song.title
        track['artist'] = item.Song.artist
        track['artwork'] = item.Song.artwork
        track['rating'] = item.song_id ? true : false
        track['duration'] = item.Song.duration
        tracks.push(track)
      })
      await TrackPlayer.add(tracks)
      console.log('data received: ', data)
      setIsLoaded(false)
    }
    setupTracks()
  }, [data])
  return isLoaded
}
