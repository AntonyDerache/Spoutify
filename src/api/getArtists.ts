import axios from 'axios'
import { BASE_URL, GET_ARTIST, GET_ARTIST_ALBUMS, GET_ARTIST_TOP_TRACKS } from '../../constant'

export const getArtists = async (id: string) => {
  if (!id) {
    return
  }
  const URL = BASE_URL + GET_ARTIST + `/${id}`
  const result = await axios.get(URL)
  return result.data
}

export const getArtistsAlbums = async (id: string) => {
  if (!id) {
    return
  }
  const URL = BASE_URL + GET_ARTIST_ALBUMS(id)
  const result = await axios.get(URL)
  return result.data
}

export const getArtistsTopTracks = async (id: string) => {
  if (!id) {
    return
  }
  const URL = BASE_URL + GET_ARTIST_TOP_TRACKS(id)
  const result = await axios.get(URL)
  return result.data
}
