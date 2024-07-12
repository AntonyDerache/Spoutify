import {
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from 'vitest';
import axios from 'axios';
import searchItems from '../../../src/api/searchItems';
import { BASE_URL, SEARCH } from '../../../constant';

vi.mock('axios');

describe('SearchItems', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('search item successfuly', async () => {
    // GIVEN
    const q = 'Travis';
    const type = ['album', 'tracks'];
    const URL = BASE_URL + SEARCH.concat(`?q=${q}&type=album,tracks`);

    // WHEN
    vi.mocked(axios, true).get.mockResolvedValueOnce({
      data: true,
    });
    const result = await searchItems(q, type);

    // THEN
    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(URL);
    expect(result).toStrictEqual(true);
  });

  test('search item without value', async () => {
    // GIVEN
    const q = '';
    const type = ['album', 'tracks'];

    // WHEN
    const result = await searchItems(q, type);

    // THEN
    expect(axios.get).not.toHaveBeenCalled();
    expect(result).toStrictEqual(null);
  });

  test('search item without type', async () => {
    // GIVEN
    const q = 'Travis';
    const type = [];

    // WHEN
    const result = await searchItems(q, type);

    // THEN
    expect(axios.get).not.toHaveBeenCalled();
    expect(result).toStrictEqual(null);
  });
});
