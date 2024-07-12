import {
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from 'vitest';
import axios from 'axios';
import getRecommendations from '../../../src/api/getRecommendations';
import { BASE_URL, RECOMMENDATIONS } from '../../../constant';

vi.mock('axios');

describe('GetRecommandations', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('get recommandations', async () => {
    // GIVEN
    const seedType = 'genres';
    const genres = 'classical';
    const URL = BASE_URL + RECOMMENDATIONS.concat(`?seedType=${seedType}&genres=${genres}`);

    // WHEN
    vi.mocked(axios, true).get.mockResolvedValueOnce({
      data: true,
    });
    const result = await getRecommendations(seedType, genres);

    // THEN
    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(URL);
    expect(result).toStrictEqual(true);
  });

  test('get recommandations with no seedType', async () => {
    // GIVEN
    const seedType = '';
    const genres = 'classical';

    // WHEN
    const result = await getRecommendations(seedType, genres);

    // THEN
    expect(axios.get).not.toHaveBeenCalled();
    expect(result).toStrictEqual(null);
  });

  test('get recommandations with no genres', async () => {
    // GIVEN
    const seedType = 'genres';
    const genres = '';

    // WHEN
    const result = await getRecommendations(seedType, genres);

    // THEN
    expect(axios.get).not.toHaveBeenCalled();
    expect(result).toStrictEqual(null);
  });
});
