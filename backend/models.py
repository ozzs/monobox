from typing import List, Optional

from sqlmodel import Field, Relationship, SQLModel


class SongPlaylistLink(SQLModel, table=True):
    song_id: Optional[int] = Field(default=None, foreign_key="song.id", primary_key=True)
    playlist_id: Optional[int] = Field(default=None, foreign_key="playlist.id", primary_key=True)


class SongBase(SQLModel):
    url: str
    title: str
    artist: str
    album: Optional[str] = None
    artwork: str = Field(default=None)
    duration: float = Field(default=None)


class Song(SongBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True, nullable=False)
    liked_bool: "Liked" = Relationship(back_populates="song_liked")
    last_modify: str
    songs: List["Playlist"] = Relationship(back_populates="songs", link_model=SongPlaylistLink)


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


class Playlist(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True, nullable=False)
    name: str = Field(default = None)
    songs: List["Song"] = Relationship(back_populates="playlists", link_model=SongPlaylistLink)