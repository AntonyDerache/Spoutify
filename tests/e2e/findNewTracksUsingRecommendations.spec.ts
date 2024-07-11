import { test, expect } from '@playwright/test';
import RECOMMENDATIONS_MOCK from '../fixtures/recommendationsMock';

const url = 'http://localhost:3000/';

test('go to genres recommendations page', async ({ page }) => {
  // GIVEN
  await page.goto(url);
  const trackNavigatorButton = page.getByTestId('recommendations-navigator-button');
  await page.route('http://localhost:8080/recommendations?seedType=genres&genres=afrobeat,hip-hop', async (route) => {
    await route.fulfill({ json: RECOMMENDATIONS_MOCK });
  });

  // WHEN
  await trackNavigatorButton.click();

  // THEN
  await expect(page.getByTestId('recommendations-genres-page')).toBeVisible();

  // GIVEN
  const afrobeatGenreBtn = page.getByTestId('recommendations-genres').getByRole('listitem').filter({ has: page.getByText('Afrobeat') });
  const fitlerInput = page.getByTestId('search-input');

  // WHEN
  await afrobeatGenreBtn.click();
  await fitlerInput.fill('hip');
  await expect(page.getByTestId('recommendations-genres').getByRole('listitem').filter({ has: page.getByText('afrobeat') })).not.toBeVisible();

  const hipHopGenreBtn = page.getByTestId('recommendations-genres').getByRole('listitem').filter({ has: page.getByText('hip-hop') });
  await hipHopGenreBtn.click();

  const continueButton = page.getByTestId('generate-recommendations-btn');
  await continueButton.click();

  // THEN
  await expect(page.getByTestId('recommendation-page')).toBeVisible();
  await expect(page.getByTestId('tracklist-btn')).toBeVisible();
  await expect(page.getByTestId('current-track')).toBeVisible();
});
