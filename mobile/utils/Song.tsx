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
