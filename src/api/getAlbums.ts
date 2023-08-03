import axios from 'axios'
import { BASE_URL, GET_ALBUM } from '../../constant'

export const getAlbums = async (id: string) => {
  if (!id) {
    return
  }
  const URL = BASE_URL + GET_ALBUM + `/${id}`
  const result = await axios.get(URL)
  return result.data
}
