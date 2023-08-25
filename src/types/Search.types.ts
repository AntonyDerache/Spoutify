export type SearchImage = {
  url: string;
  height: number;
  width: number;
};

export type SearchArtist = {
  id: string;
  name: string;
  images: Array<SearchImage>;
  followers: {
    total: number;
  };
};

export type SearchAlbum = {
  id: string;
  images: Array<SearchImage>;
  name: string;
  album_type: string;
};

export type SearchTrack = {
  preview_url: string | null;
  id: string;
  name: string;
  uri: string;
  album: SearchAlbum;
  artists: Array<SearchArtist>;
  duration_ms: number;
};

export type SearchItems = {
  tracks: {
    items: Array<SearchTrack>;
  };
  albums: {
    items: Array<SearchAlbum>;
  };
  artists: {
    items: Array<SearchArtist>;
  };
};
