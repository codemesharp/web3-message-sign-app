import { test, expect } from '@playwright/test';

test('login -> sign -> verify flow (mock)', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page.locator('text=Web3 Message Signer')).toBeVisible();
  await page.click('text=Login');
  await page.fill('textarea', 'Playwright test message');
  await page.click('text=Sign Message');
  await expect(page.locator('text=Message signed & verified')).toBeVisible();
  await expect(page.locator('text=Playwright test message')).toBeVisible();
});
