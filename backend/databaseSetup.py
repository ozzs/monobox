from typing import Optional

from sqlmodel import Field, SQLModel, create_engine


class Song(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True, nullable=False)
    url: str
    title: str
    artist: str
    album: Optional[str] = None
    artwork: Optional[str] = None
    duration: Optional[int] = None


sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

engine = create_engine(sqlite_url, echo=True)

SQLModel.metadata.create_all(engine)
