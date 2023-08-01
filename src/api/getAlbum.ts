import axios from 'axios'
import { BASE_URL, ALBUMS } from '../../constant'

export const getAlbum = async (id: string) => {
  if (!id) {
    return
  }
  const URL = BASE_URL + ALBUMS + `/${id}`
  const result = await axios.get(URL)
  return result.data
}
