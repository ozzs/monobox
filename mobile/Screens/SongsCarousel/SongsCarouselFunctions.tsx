// Music Player imports
import TrackPlayer, { RepeatMode, Track } from 'react-native-track-player'

// Function: Gets current track's duration
export const getCurrentTrackDuration = (
  currentTrack: Track | undefined,
): number => {
  if (currentTrack !== undefined) {
    const duration = currentTrack.duration as number
    return duration
  }
  return 0
}

// Function: Changes repeat icon according to user's choice
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

// Function: sets repeat mode
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
