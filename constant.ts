export const BASE_URL = "http://localhost:8080";
export const SEARCH = "/search";
export const RECOMMENDATIONS = "/recommendations";
export const GET_ALBUM = "/albums";
export const GET_ARTIST = "/artists";
export const GET_ARTIST_TOP_TRACKS = (id: string) => `/artists/${id}/top-tracks`;
export const GET_ARTIST_ALBUMS = (id: string) => `/artists/${id}/albums`;