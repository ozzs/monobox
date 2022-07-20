import datetime
import os
from typing import List, Optional, Union

import eyed3  # type: ignore
import uvicorn  # type: ignore
from fastapi import FastAPI, HTTPException, status
from fastapi.responses import FileResponse, StreamingResponse
from fastapi_utils.tasks import repeat_every
from sqlmodel import Session, select

from database_setup import create_db_and_tables, engine
from models import Liked, Song, SongBase, SongUpdate

app = FastAPI()
session = Session(bind=engine)

music_folder_url = "D:\Music\musicPlayer\Songs"
cover_folder_url = "D:\Music\musicPlayer\Covers"


def get_last_modify(path: str) -> str:
    path_str = str(datetime.datetime.fromtimestamp(os.path.getctime(path)))
    return path_str


@app.get("/songs/{song_id}/artwork")
async def download_cover(song_id: int) -> FileResponse:
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


@app.post("/songs/{song_id}/like")
async def like(song_id: int) -> dict:
    new_like = Liked(song_id=song_id)
    session.add(new_like)
    session.commit()
    return {"Liked song with id: ": song_id}


@app.delete("/songs/{song_id}/unlike")
async def unlike(song_id: int) -> dict:
    statement = select(Liked).where(Liked.song_id == song_id)
    liked = session.exec(statement).one_or_none()
    if not liked:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Liked entry for song not found",
        )
    session.delete(liked)
    session.commit()
    return {"Unliked song with id: ": song_id}


@app.on_event("startup")
# @repeat_every(seconds=5)
def scan_songs():
    for song in os.listdir(music_folder_url):
        joined_path = os.path.join(music_folder_url, song)
        audiofile = eyed3.load(joined_path)

        # TODO: Think of a better algorithm
        statement = select(Song).where(
            Song.title == audiofile.tag.title, Song.artist == audiofile.tag.artist
        )
        db_song = session.exec(statement).one_or_none()
        if db_song:
            if get_last_modify(joined_path) != db_song.last_modify:
                # TODO: think of a smart way to implement updating a song
                pass
            continue

        song_title = audiofile.tag.title
        artwork_path = str(os.path.join(cover_folder_url, song_title)) + ".jpg"
        artwork_exists = False
        for image in audiofile.tag.images:
            image_file = open(
                "D:\Music\musicPlayer\Covers\{}.jpg".format(song_title), "wb"
            )
            print("Writing image file: {}).jpg".format(song_title))
            image_file.write(image.image_data)
            image_file.close()
            artwork_exists = True

        new_song = Song(
            url=joined_path,
            title=song_title,
            artist=audiofile.tag.artist,
            artwork=artwork_path if artwork_exists else None,
            last_modify=get_last_modify(joined_path),
        )
        print(new_song.title, " added!")
        session.add(
            Song(
                url=joined_path,
                title=song_title,
                artist=audiofile.tag.artist,
                artwork=artwork_path if artwork_exists else None,
                last_modify=get_last_modify(joined_path),
            )
        )
    session.commit()


@app.get("/songs", response_model=List)
async def get_all_songs():
    statement = select(Song)
    return session.exec(statement).all()


@app.get("/check")
async def check():
    statement = select(Song, Liked.song_id).join(Liked, isouter=True)
    results = session.exec(statement).all()
    return results


@app.get("/songs/{song_id}", response_model=Song)
async def get_song(song_id: int) -> Optional[Song]:
    song = session.get(Song, song_id)
    if not song:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Song not found"
        )
    return song


@app.post("/songs", response_model=Song, status_code=status.HTTP_201_CREATED)
async def create_song(song: SongBase) -> SongBase:
    new_song = Song(url=song.url, title=song.title, artist=song.artist)
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


if __name__ == "__main__":
    create_db_and_tables()
    uvicorn.run("main:app", host="192.168.1.131", port=5000, reload=True)
