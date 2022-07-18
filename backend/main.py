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
from models import Song, SongBase, SongUpdate

app = FastAPI()
session = Session(bind=engine)

music_folder_url = "D:\Music\musicPlayer\Songs"
cover_folder_url = "D:\Music\musicPlayer\Covers"

# def get_artwork(path: str) -> Optional[str]:
#     audio_file = eyed3.load(path)
#     for image in audio_file.tag.images:
#         if image.picture_type == 3:
#             print("picture type:", image.picture_type)
#             print("mime type: ", image.mime_type)
#             print(type(image.image_data))
#         return image.image_data
#     return "No Image Found"


def get_last_modify(path: str) -> str:
    path_str = str(datetime.datetime.fromtimestamp(os.path.getctime(path)))
    return path_str


@app.get("/get_mock_song")
async def get_mock_song():
    def iterfile():
        with open(
            "D:\Music\musicPlayer\Songs\[Lyrics] Tears In Heaven - Eric Clapton.mp3",
            mode="rb",
        ) as file_like:
            yield from file_like

    return StreamingResponse(iterfile(), media_type="audio/mp3")


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
    pass


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
async def get_all_songs() -> List:
    statement = select(Song)
    return session.exec(statement).all()


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
