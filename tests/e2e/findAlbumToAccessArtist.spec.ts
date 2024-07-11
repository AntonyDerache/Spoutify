import { test, expect } from '@playwright/test';
import { SEARCH_DATA_MOCK_2 } from '../fixtures/searchMock';
import CLANCY_MOCK from '../fixtures/albumsMock';
import { TWENTY_ONE_PILOTS_MOCK_DATA } from '../fixtures/artistMock';

const url = 'http://localhost:3000/';

test('search album to access artist', async ({ page }) => {
  // GIVEN
  await page.goto(url);
  await page.route('http://localhost:8080/search?q=Clancy&type=artist,track,album', async (route) => {
    await route.fulfill({ json: SEARCH_DATA_MOCK_2 });
  });
  await page.route('http://localhost:8080/albums/clancy-id', async (route) => {
    await route.fulfill({ json: CLANCY_MOCK });
  });
  await page.route('http://localhost:8080/artists/twenty-one-pilots-id', async (route) => {
    await route.fulfill({ json: TWENTY_ONE_PILOTS_MOCK_DATA.artist });
  });
  await page.route('http://localhost:8080/artists/twenty-one-pilots-id/top-tracks', async (route) => {
    await route.fulfill({ json: TWENTY_ONE_PILOTS_MOCK_DATA.tracks });
  });
  await page.route('http://localhost:8080/artists/twenty-one-pilots-id/albums', async (route) => {
    await route.fulfill({ json: TWENTY_ONE_PILOTS_MOCK_DATA.albums });
  });
  const expectedAlbumToBeFound = 'Clancy';
  const expectedArtist = 'Twenty One Pilots';
  const searchInput = page.getByTestId('search-input');

  // WHEN
  await searchInput.fill(expectedAlbumToBeFound);
  await page.getByTestId(`${expectedAlbumToBeFound}-search-album-item`).click();

  // THEN
  await expect(page.getByText(expectedAlbumToBeFound)).toBeVisible();
  const artistNameSelector = page.getByTestId(`${expectedArtist}-album-artist`);

  // WHEN
  artistNameSelector.click();

  // THEN
  await expect(page.getByTestId(`${expectedArtist}-artist-name`)).toBeVisible();
});
