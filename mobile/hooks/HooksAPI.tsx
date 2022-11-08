/* React Query imports */
import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'

/* Music Player imports */
import { Track } from 'react-native-track-player'

/* utils imports */
import { BASE_API_PORT, BASE_API_URL } from '../utils/BaseAPI'
import { Playlist } from '../utils/Song'

// Fetches ALL playlists
function fetchPlaylists(): Promise<Playlist[]> {
  return axios
    .get(`http://${BASE_API_URL}:${BASE_API_PORT}/songs/playlists`)
    .then((res) => res.data)
}

export const usePlaylistsData = () => {
  return useQuery('playlists', fetchPlaylists)
}

// Fetches ALL songs
function fetchSongs(url: string): Promise<Track[]> {
  return axios.get(url).then((res) => res.data)
}

export const useSongsData = (url: string) => {
  return useQuery(['songs', url], () => fetchSongs(url))
}

// Creates new playlist
function addPlaylist(playlistName: string) {
  return axios.post(`http://${BASE_API_URL}:${BASE_API_PORT}/songs/playlists`, {
    name: playlistName,
  })
}

export const useAddPlaylist = () => {
  const queryClient = useQueryClient()
  return useMutation(addPlaylist, {
    onSuccess: () => {
      queryClient.invalidateQueries('playlists')
    },
  })
}

// Deletes a playlist
function deletePlaylist(playlist_id: number) {
  return axios.delete(
    `http://${BASE_API_URL}:${BASE_API_PORT}/songs/delete_playlist/${playlist_id}`,
  )
}

export const useDeletePlaylist = () => {
  const queryClient = useQueryClient()
  return useMutation(deletePlaylist, {
    onSuccess: () => {
      queryClient.invalidateQueries('playlists')
    },
  })
}

// Adds new song to playlist
function addSongToPlaylist({
  playlist_id,
  song_id,
}: {
  playlist_id: number
  song_id: number
}) {
  return axios.patch(
    `http://${BASE_API_URL}:${BASE_API_PORT}/songs/add_song/${playlist_id}/${song_id}`,
  )
}

export const useAddSongToPlaylist = () => {
  const queryClient = useQueryClient()
  return useMutation(addSongToPlaylist, {
    onSuccess: () => {
      queryClient.invalidateQueries('playlists')
    },
  })
}

// Removes song from playlist
function removeSongFromPlaylist({
  playlist_id,
  song_id,
}: {
  playlist_id: number
  song_id: number
}) {
  return axios.patch(
    `http://${BASE_API_URL}:${BASE_API_PORT}/songs/remove_song/${playlist_id}/${song_id}`,
  )
}

export const useRemoveSongFromPlaylist = () => {
  const queryClient = useQueryClient()
  return useMutation(removeSongFromPlaylist, {
    onSuccess: () => {
      queryClient.invalidateQueries('playlists')
    },
  })
}

// Likes song
function likeSong(songID: number) {
  return axios.post(
    `http://${BASE_API_URL}:${BASE_API_PORT}/songs/${songID}/like`,
  )
}

// Unlikes song
function unlikeSong(songID: number) {
  return axios.delete(
    `http://${BASE_API_URL}:${BASE_API_PORT}/songs/${songID}/unlike`,
  )
}

export const useRateSong = (
  trackRating: number | boolean | undefined,
  setTrackRating: (value: number | boolean) => void,
) => {
  const queryClient = useQueryClient()
  if (trackRating)
    return useMutation('playlists', unlikeSong, {
      onSuccess: () => {
        queryClient.invalidateQueries('playlists')
        setTrackRating(false)
      },
    })
  else
    return useMutation('playlists', likeSong, {
      onSuccess: () => {
        queryClient.invalidateQueries('playlists')
        setTrackRating(true)
      },
    })
}
