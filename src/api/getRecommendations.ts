import axios from "axios";
import { BASE_URL, RECOMMENDATIONS } from "../../constant";
import { buildQueryParameters } from "./setupAxios";

export const getRecommendations = async (seedType: string, genres: string) => {
  if (seedType.length == 0, genres.length == 0) {
    return;
  }
  const queryParams = {
    seedType,
    genres,
  };
  let URL = BASE_URL + RECOMMENDATIONS;

  URL = URL.concat(buildQueryParameters(queryParams));
  const result = await axios.get(URL);
  return result.data;
}
