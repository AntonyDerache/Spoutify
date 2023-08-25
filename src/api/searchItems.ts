import axios from 'axios';
import { BASE_URL, SEARCH } from '../../constant';
import buildQueryParameters from './setupAxios';

export default async (value: string, type: string[]) => {
  if (value.length === 0 || type.length === 0) {
    return null;
  }
  const queryParams = {
    q: value,
    type,
  };
  let URL = BASE_URL + SEARCH;

  URL = URL.concat(buildQueryParameters(queryParams));
  const result = await axios.get(URL);
  return result.data;
};
