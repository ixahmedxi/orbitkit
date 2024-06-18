import { expect, test } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByText(/astro website/i)).toBeVisible()
})
