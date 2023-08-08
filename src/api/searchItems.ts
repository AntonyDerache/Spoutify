import axios from 'axios'
import { BASE_URL, SEARCH } from '../../constant'
import { buildQueryParameters } from './setupAxios'

export const searchItems = async (value: string, type: string[]) => {
  if (value.length == 0 || type.length == 0) {
    return
  }
  const queryParams = {
    q: value,
    type: type
  }
  let URL = BASE_URL + SEARCH

  URL = URL.concat(buildQueryParameters(queryParams))
  const result = await axios.get(URL)
  return result.data
}
