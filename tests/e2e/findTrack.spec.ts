import { test, expect } from '@playwright/test';
import TRACK_DATA from '../fixtures/tracksMocks';

const url = 'http://localhost:3000/';

test('track searched is found', async ({ page }) => {
  // GIVEN
  await page.goto(url);
  const trackNavigatorButton = page.getByTestId('track-navigator-button');
  const expectedTrackToBeFound = 'Les corons';
  await page.route('http://localhost:8080/search?q=Les%20corons&type=track', async (route) => {
    await route.fulfill({ json: TRACK_DATA });
  });

  // WHEN
  await trackNavigatorButton.click();

  // THEN
  await expect(page.getByTestId('tracks-page-input')).toBeVisible();

  // GIVEN
  const searchInput = page.getByTestId('search-input');

  // WHEN
  await searchInput.fill(expectedTrackToBeFound);

  // THEN
  expect(searchInput).toHaveValue('Les corons');
  expect((await page.getByTestId('tracks-list').getByText('Les corons').all()).length).toBeGreaterThan(0);
});
