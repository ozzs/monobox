import datetime
import os
from typing import Dict, List, Optional

import eyed3  # type: ignore
import uvicorn  # type: ignore
from database_setup import create_db_and_tables, engine
from fastapi import FastAPI, HTTPException, status
from fastapi.responses import FileResponse, StreamingResponse
from fastapi_utils.tasks import repeat_every
from models import (
    Liked,
    Playlist,
    PlaylistBase,
    PlaylistReadWithSongs,
    Song,
    SongBase,
    SongPlaylistLink,
    SongRead,
    SongReadWithLike,
    SongUpdate,
)
from sqlmodel import Session, select

app = FastAPI()
session = Session(bind=engine)

host_ip = "192.168.1.120"
host_port = 5000
music_folder_url = "..\songs"
cover_folder_url = "..\covers"


def get_last_modify(path: str) -> str:
    path_str = str(datetime.datetime.fromtimestamp(os.path.getctime(path)))
    return path_str


@app.get("/songs/{song_id}/artwork")
async def download_artwork(song_id: int) -> FileResponse:
    path = "../assets/defaultArtwork.png"
    song = session.get(Song, song_id)
    if not song:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Song not found"
        )
    if song.artwork == None:
        return FileResponse(path, media_type="image/png")
    return FileResponse(song.artwork)


@app.get("/songs/{song_id}/stream")
async def stream_song(song_id: int) -> StreamingResponse:
    song = session.get(Song, song_id)
    if not song:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Song not found"
        )

    def iterfile():
        with open(
            song.url,
            mode="rb",
        ) as file_like:
            yield from file_like

    return StreamingResponse(iterfile(), media_type="audio/mp3")


@app.post("/songs/{song_id}/like", response_model=Dict)
async def like(song_id: int) -> dict:
    song = session.get(Song, song_id)
    if not song:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Song not found"
        )
    new_like = Liked(song_id=song_id)
    song.liked_bool = new_like
    session.add(new_like)
    session.add(song)
    new_link = SongPlaylistLink(playlist_id=1, song_id=song_id)
    session.add(new_link)
    session.commit()
    return {"Liked song with id: ": song_id}


@app.delete("/songs/{song_id}/unlike")
async def unlike(song_id: int) -> dict:
    likedStmt = select(Liked).where(Liked.song_id == song_id)
    songplaylistlinkStmt = select(SongPlaylistLink).where(
        SongPlaylistLink.song_id == song_id, SongPlaylistLink.playlist_id == 1
    )
    song = session.get(Song, song_id)
    if not song:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Song entry for song not found",
        )
    liked = session.exec(likedStmt).one_or_none()
    if not liked:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Liked entry for song not found",
        )
    link = session.exec(songplaylistlinkStmt).one_or_none()
    if not link:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Link entry for song not found",
        )

    session.delete(liked)
    session.delete(link)
    song.liked_bool = None
    session.commit()
    return {"Unliked song with id: ": song_id}


@app.post(
    "/songs/playlists",
    response_model=PlaylistReadWithSongs,
    status_code=status.HTTP_201_CREATED,
)
async def create_playlist(playlist: PlaylistBase) -> Playlist:
    new_playlist = Playlist.from_orm(playlist)
    session.add(new_playlist)
    session.commit()
    return new_playlist


@app.delete("/songs/delete_playlist/{playlist_id}", response_model=Dict)
async def delete_playlist(playlist_id: int) -> dict:
    playlist = session.get(Playlist, playlist_id)
    if not playlist:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Playlist not found"
        )
    session.delete(playlist)
    session.commit()
    return {"Deleted playlist with ID: ": playlist_id}


@app.get("/songs/{playlist_id}/fetch", response_model=List[SongReadWithLike])
async def get_playlist(playlist_id: int):
    playlist = session.get(Playlist, playlist_id)
    if not playlist:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Playlist not found"
        )
    return playlist.songs


@app.patch("/songs/add_song/{playlist_id}/{song_id}", response_model=SongReadWithLike)
async def add_song_to_playlist(song_id: int, playlist_id: int) -> Song:
    playlist = session.get(Playlist, playlist_id)
    if not playlist:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Playlist not found"
        )
    song = session.get(Song, song_id)
    if not song:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Song not found"
        )
    playlist.songs.append(song)
    session.add(playlist)
    session.commit()
    return song


@app.patch("/songs/remove_song/{playlist_id}/{song_id}", response_model=Dict)
async def delete_song_from_playlist(song_id: int, playlist_id: int) -> dict:
    playlist = session.get(Playlist, playlist_id)
    if not playlist:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Playlist not found"
        )
    song = session.get(Song, song_id)
    if not song:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Song not found"
        )
    playlist.songs.remove(song)
    session.add(song)
    session.commit()
    return {"Deleted Song with ID: ": song_id, "From Playlist with ID: ": playlist_id}


@app.get("/songs/playlists", response_model=List[PlaylistReadWithSongs])
async def get_all_playlist():
    return session.exec(select(Playlist)).all()


@app.get("/songs", response_model=List[SongReadWithLike])
async def get_all_songs():
    return session.exec(select(Song)).all()


@app.get("/songs/liked", response_model=List[PlaylistReadWithSongs])
async def get_liked_songs():
    return session.exec(select(Playlist).where(Playlist.id == 1)).all()


@app.get("/songs/{song_id}", response_model=SongRead)
async def get_song(song_id: int) -> Optional[Song]:
    song = session.get(Song, song_id)
    if not song:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Song not found"
        )
    return song


@app.post("/songs", response_model=SongRead, status_code=status.HTTP_201_CREATED)
async def create_song(song: SongBase):
    new_song = Song.from_orm(song)
    session.add(new_song)
    session.commit()
    return new_song


@app.patch("/songs/{song_id}", response_model=Song)
async def update_song(song_id: int, song: SongUpdate) -> Optional[Song]:
    db_song = session.get(Song, song_id)
    if not db_song:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Song not found"
        )
    song_data = song.dict(exclude_unset=True)
    for key, value in song_data.items():
        setattr(db_song, key, value)
    session.add(db_song)
    session.commit()
    session.refresh(db_song)
    return db_song


@app.delete("/songs/{song_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_song(song_id: int) -> Optional[Song]:
    song = session.get(Song, song_id)
    if not song:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Song not found"
        )
    session.delete(song)
    session.commit()
    return song


@app.on_event("startup")
def create_initial_playlists():

    # Create Liked Songs Playlist
    stmt = select(Playlist).where(Playlist.id == 1)
    db_liked_playlist = session.exec(stmt).one_or_none()
    if not db_liked_playlist:
        session.add(Playlist(name="Liked Songs"))
    session.commit()


@app.on_event("startup")
# @repeat_every(seconds=30)
def scan_songs():

    all_songs = session.exec(select(Song)).all()
    songs_on_disk = []

    for song in os.listdir(music_folder_url):
        if song.endswith(".mp3"):
            joined_path = os.path.join(music_folder_url, song)
            audiofile = eyed3.load(joined_path)

            db_song = None
            for s in all_songs:
                if s.title == audiofile.tag.title and s.artist == audiofile.tag.artist:
                    db_song = s
                    break

            if db_song:
                songs_on_disk.append(db_song.id)
                continue

            song_title = audiofile.tag.title
            artwork_path = str(os.path.join(cover_folder_url, song_title)) + ".jpg"
            artwork_exists = False
            for image in audiofile.tag.images:
                image_file = open("..\covers\{}.jpg".format(song_title), "wb")
                image_file.write(image.image_data)
                image_file.close()
                artwork_exists = True

            new_song = Song(
                url=joined_path,
                title=song_title,
                artist=audiofile.tag.artist,
                artwork=artwork_path if artwork_exists else None,
                last_modify=get_last_modify(joined_path),
                duration=audiofile.info.time_secs,
            )
            session.add(new_song)
            print(new_song.title + "Added to DB!")
            session.commit()
            songs_on_disk.append(new_song.id)

    songs_to_delete = list(set([s.id for s in all_songs]) - set(songs_on_disk))

    for song_id in songs_to_delete:
        session.delete(session.get(Song, song_id))
    session.commit()


if __name__ == "__main__":
    create_db_and_tables()
    uvicorn.run("main:app", host=host_ip, port=host_port, reload=True)
