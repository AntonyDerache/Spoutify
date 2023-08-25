import axios from 'axios';
import { BASE_URL, GET_ALBUM } from '../../constant';

export default async (id: string) => {
  if (!id) {
    return null;
  }
  const URL = `${BASE_URL + GET_ALBUM}/${id}`;
  const result = await axios.get(URL);
  return result.data;
};
