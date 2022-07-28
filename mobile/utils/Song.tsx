import { Track } from 'react-native-track-player'

export class Song {
  constructor(
    public id: number,
    public title: string,
    public artist: string,
    public artwork: string,
    public url: string,
    public rating: boolean,
    public duration: number,
  ) {}
}

export class Playlist {
  constructor(public id: number, public name: string, public songs: Track[]) {}
}
