import { test, expect } from '@playwright/test';
import { SEARCH_DATA_MOCK_2 } from '../fixtures/searchMock';
import { TWENTY_ONE_PILOTS_MOCK_DATA } from '../fixtures/artistMock';
import CLANCY_MOCK from '../fixtures/albumsMock';

const url = 'http://localhost:3000/';

test('search artist to access album', async ({ page }) => {
  // GIVEN
  await page.goto(url);
  await page.route('http://localhost:8080/search?q=Twenty%20One%20Pilots&type=artist,track,album', async (route) => {
    await route.fulfill({ json: SEARCH_DATA_MOCK_2 });
  });
  await page.route('http://localhost:8080/artists/twenty-one-pilots-id/albums', async (route) => {
    await route.fulfill({ json: TWENTY_ONE_PILOTS_MOCK_DATA.albums });
  });
  await page.route('http://localhost:8080/artists/twenty-one-pilots-id/top-tracks', async (route) => {
    await route.fulfill({ json: TWENTY_ONE_PILOTS_MOCK_DATA.tracks });
  });
  await page.route('http://localhost:8080/artists/twenty-one-pilots-id', async (route) => {
    await route.fulfill({ json: TWENTY_ONE_PILOTS_MOCK_DATA.artist });
  });
  await page.route('http://localhost:8080/albums/clancy-id', async (route) => {
    await route.fulfill({ json: CLANCY_MOCK });
  });
  const expectedAlbum = 'Clancy';
  const expectedSearchArtist = 'Twenty One Pilots';
  const searchInput = page.getByTestId('search-input');

  // WHEN
  await searchInput.fill(expectedSearchArtist);
  await page
    .getByTestId(`${expectedSearchArtist}-search-artist-item`)
    .click();

  // THEN
  await expect(page.getByText(expectedSearchArtist)).toBeVisible();

  // WHEN
  await page
    .getByTestId(`${expectedAlbum}-album`)
    .click();

  // THEN
  await expect(page.getByTestId(`${expectedAlbum}-album-name`)).toBeVisible();
});
