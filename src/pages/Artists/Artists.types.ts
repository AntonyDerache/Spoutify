import type { SearchTrack, SearchAlbum } from '@/types/search.types';

export type ArtistTracks = {
  tracks: Array<SearchTrack>;
};

export type ArtistAlbums = {
  items: Array<SearchAlbum>;
};
