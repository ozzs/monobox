from typing import List, Optional

from sqlmodel import Field, Relationship, SQLModel


class SongPlaylistLink(SQLModel, table=True):
    song_id: Optional[int] = Field(
        default=None, foreign_key="song.id", primary_key=True
    )
    playlist_id: Optional[int] = Field(
        default=None, foreign_key="playlist.id", primary_key=True
    )


class SongBase(SQLModel):
    url: str
    title: str
    artist: str
    album: Optional[str] = None
    artwork: str = Field(default=None)
    duration: float = Field(default=None)
    last_modify: Optional[str] = None


class Song(SongBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True, nullable=False)
    liked_bool: Optional["Liked"] = Relationship(
        sa_relationship_kwargs={"uselist": False}, back_populates="song_liked"
    )
    playlists: List["Playlist"] = Relationship(
        back_populates="songs", link_model=SongPlaylistLink
    )


class PlaylistBase(SQLModel):
    name: str = Field(default=None)


class Playlist(PlaylistBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True, nullable=False)
    songs: List["Song"] = Relationship(
        back_populates="playlists", link_model=SongPlaylistLink
    )


class PlaylistRead(PlaylistBase):
    id: int


class LikedBase(SQLModel):
    song_id: int = Field(default=None, foreign_key="song.id")


class Liked(LikedBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True, nullable=False)
    song_liked: Song = Relationship(back_populates="liked_bool")


class LikedRead(LikedBase):
    id: int


class SongRead(SongBase):
    id: int


class SongReadWithLike(SongRead):
    liked_bool: Optional[LikedRead] = None


class SongReadWithPlaylists(SongRead):
    playlists: List[PlaylistRead] = []


class PlaylistReadWithSongs(PlaylistRead):
    songs: List[SongRead] = []


class SongUpdate(SQLModel):
    url: Optional[str] = None
    title: Optional[str] = None
    artist: Optional[str] = None
    album: Optional[str] = None
    artwork: Optional[str] = None
    duration: Optional[int] = None
