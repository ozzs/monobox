from typing import Optional

from sqlalchemy import BLOB
from sqlmodel import Field, Relationship, SQLModel


class SongBase(SQLModel):
    url: str
    title: str
    artist: str
    album: Optional[str] = None
    artwork: str = Field(default=None)
    duration: Optional[int] = None


class Song(SongBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True, nullable=False)
    liked_bool: "Liked" = Relationship(back_populates="song_liked")
    last_modify: str


class SongUpdate(SQLModel):
    url: Optional[str] = None
    title: Optional[str] = None
    artist: Optional[str] = None
    album: Optional[str] = None
    artwork: Optional[str] = None
    duration: Optional[int] = None


class Liked(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True, nullable=False)
    song_id: int = Field(default=None, foreign_key="song.id")
    song_liked: Song = Relationship(back_populates="liked_bool")
