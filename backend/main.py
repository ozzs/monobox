from typing import List

from fastapi import FastAPI, status
from sqlmodel import Session, select

from databaseSetup import Song, engine

app = FastAPI()
session = Session(bind=engine)


@app.get("/songs", response_model=List)
async def get_all_songs():
    statement = select(Song)
    result = session.exec(statement).all()
    return result


@app.get("/get_a_song/{song_id}", response_model=Song)
async def get_a_song(song_id: int):
    statement = select(Song).where(Song.id == song_id)
    result = session.exec(statement).one()
    return result


@app.post("/create_a_song", response_model=Song, status_code=status.HTTP_201_CREATED)
async def create_a_song(song: Song):
    new_song = Song(url=song.url, title=song.title, artist=song.artist)
    session.add(new_song)
    session.commit()
    return new_song


@app.put("/update_a_song/{song_id}", response_model=Song)
async def update_a_song(song_id: int, song: Song):
    statement = select(Song).where(Song.id == song_id)
    result = session.exec(statement).one()
    result.url, result.title, result.artist = song.url, song.title, song.artist
    session.commit()
    return result


@app.delete("/delete_a_song/{song_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_a_song(song_id: int):
    statement = select(Song).where(Song.id == song_id)
    result = session.exec(statement).one_or_none()
    session.delete(result)
    return result
