import { test, expect } from '@playwright/test';
import { SEARCH_DATA_MOCK } from '../fixtures/searchMock';
import { TRAVIS_SCOTT_MOCK_DATA } from '../fixtures/artistMock';

const url = 'http://localhost:3000/';

test('access page of searched artist', async ({ page }) => {
  // GIVEN
  await page.goto(url);
  const expectedArtistName = 'Travis Scott';
  await page.route('http://localhost:8080/search?q=Travis%20Scott&type=artist,track,album', async (route) => {
    await route.fulfill({ json: SEARCH_DATA_MOCK });
  });
  await page.route('http://localhost:8080/artists/travis-scott-id', async (route) => {
    await route.fulfill({ json: TRAVIS_SCOTT_MOCK_DATA.artist });
  });
  await page.route('http://localhost:8080/artists/travis-scott-id/top-tracks', async (route) => {
    await route.fulfill({ json: TRAVIS_SCOTT_MOCK_DATA.tracks });
  });
  await page.route('http://localhost:8080/artists/travis-scott-id/albums', async (route) => {
    await route.fulfill({ json: TRAVIS_SCOTT_MOCK_DATA.albums });
  });
  const searchInput = page.getByTestId('search-input');

  // WHEN
  await searchInput.fill(expectedArtistName);

  // GIVEN
  await page.getByTestId(`${expectedArtistName}-search-artist-item`).click();

  // THEN
  await expect(page.getByTestId(`${expectedArtistName}-artist-name`)).toBeVisible();
  await expect(page.getByTestId('artist-top-tracks')).toBeVisible();
  await expect(page.getByTestId('artist-albums')).toBeVisible();
  await expect(page.getByTestId('artist-singles')).not.toBeVisible();
});
