/* Music Player imports */
import TrackPlayer, { RepeatMode, Track } from 'react-native-track-player'

/* utils imports */
import { BASE_API_PORT, BASE_API_URL } from '../../utils/BaseAPI'

/* Function: Gets current track's duration */
export const getCurrentTrackDuration = (
  currentTrack: Track | undefined,
): number => {
  if (currentTrack !== undefined) {
    const duration = currentTrack.duration as number
    return duration
  }
  return 0
}

/* Function: Changes repeat icon according to user's choice */
export const repeatIcon = (repeatMode: string) => {
  if (repeatMode === 'off') {
    return 'repeat-off'
  }
  if (repeatMode === 'track') {
    return 'repeat-once'
  }
  if (repeatMode === 'repeat') {
    return 'repeat'
  }
}

/* Function: sets repeat mode */
export const changeRepeatMode = (
  repeatMode: string,
  setRepeatMode: (str: string) => void,
) => {
  if (repeatMode === 'off') {
    TrackPlayer.setRepeatMode(RepeatMode.Track)
    setRepeatMode('track')
  }
  if (repeatMode === 'track') {
    TrackPlayer.setRepeatMode(RepeatMode.Queue)
    setRepeatMode('repeat')
  }
  if (repeatMode === 'repeat') {
    TrackPlayer.setRepeatMode(RepeatMode.Off)
    setRepeatMode('off')
  }
}

/* Function: posts like/unlike */
export const likeSong = async (
  songID: number,
  trackRating: number | boolean | undefined,
  setTrackRating: (value: number | boolean) => void,
) => {
  const trackId = await TrackPlayer.getCurrentTrack()
  if (trackRating === false) {
    await fetch(
      `http://${BASE_API_URL}:${BASE_API_PORT}/songs/${songID}/like`,
      {
        method: 'POST',
      },
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        // setPlaylists((playlists) => [...playlists, json])
      })
    TrackPlayer.updateMetadataForTrack(trackId, {
      rating: true,
    })
    setTrackRating(true)
  } else {
    await fetch(
      `http://${BASE_API_URL}:${BASE_API_PORT}/songs/${songID}/unlike`,
      {
        method: 'DELETE',
      },
    )
    TrackPlayer.updateMetadataForTrack(trackId, {
      rating: false,
    })
    setTrackRating(false)
  }
}

export const getIndex = async (songIndex: number) => {
  const index = await TrackPlayer.getCurrentTrack()
  console.log('Song Index:', index)
  console.log('Song Index State: ', songIndex)
  return index
}
