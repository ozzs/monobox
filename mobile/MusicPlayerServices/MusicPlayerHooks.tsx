import { useCallback, useEffect, useState } from 'react'
import TrackPlayer, {
  usePlaybackState,
  State,
  Track,
  Event,
  useTrackPlayerEvents,
} from 'react-native-track-player'

import { Playlist } from '../utils/Song'

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

export const useTracksApiRequest = (url: string) => {
  const [playlist, setPlaylist] = useState<Track[]>([])
  const [isLoaded, setIsLoaded] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    const fetchSongs = async () => {
      await fetch(url, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((json) => setPlaylist(json))
        .catch((error) => {
          setError(error)
        })
      setIsLoaded(false)
    }
    fetchSongs()
  }, [url])

  return { isLoaded, playlist, error }
}

export const usePlaylistApiRequest = (url: string) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [isLoaded, setIsLoaded] = useState(true)
  const [error, setError] = useState(null)
  const fetchPlaylists = async () => {
    await fetch(url, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((json) => setPlaylists(json))
      .catch((error) => {
        setError(error)
      })
    setIsLoaded(false)
  }
  useEffect(() => {
    fetchPlaylists()
  }, [url])

  return { playlists, isLoaded, error }
}

export const useSetupTracks = (
  playlist: Track[],
  song_id: number | undefined,
) => {
  const [isLoaded, setIsLoaded] = useState(true)
  const [index, setIndex] = useState(0)
  const setupTracks = async () => {
    await TrackPlayer.reset()
    const tracks: Track[] = []
    playlist.forEach((item) => {
      const track: Track = {
        id: 0,
        url: '',
        title: '',
        artist: '',
        artwork: '',
        duration: 0,
      }
      track['id'] = item.Song.id
      track['url'] =
        'http://192.168.1.131:5000/songs/' + item.Song.id + '/stream'
      track['title'] = item.Song.title
      track['artist'] = item.Song.artist
      track['artwork'] = item.Song.artwork
      track['rating'] = item.song_id ? true : false
      track['duration'] = item.Song.duration
      tracks.push(track)
    })
    const index = tracks.findIndex((track) => track.id === song_id)
    await TrackPlayer.add(tracks)
    if (index !== -1) {
      setIndex(index)
      await TrackPlayer.skip(index)
    }
    setIsLoaded(false)
  }

  useEffect(() => {
    setupTracks()
  }, [playlist])

  return { index, isLoaded }
}
