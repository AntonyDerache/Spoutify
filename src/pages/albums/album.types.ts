import type { SearchImage, SearchArtist } from '@/types/search.types';

export type AlbumTrack = {
  preview_url: string | null;
  id: string;
  name: string;
  uri: string;
  artists: Array<SearchArtist>;
  duration_ms: number;
};

export type AlbumTracks = {
  items: Array<AlbumTrack>;
};

export type Album = {
  id: string;
  images: Array<SearchImage>;
  name: string;
  tracks: AlbumTracks;
  artists: Array<SearchArtist>;
  release_date_precision: string;
  release_date: string;
};
