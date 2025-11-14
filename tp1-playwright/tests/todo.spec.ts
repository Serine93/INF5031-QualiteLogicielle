import { test, expect } from '@playwright/test';

test('ajouter une tâche TODO', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    await page.getByPlaceholder('What needs to be done?').fill('Implémenter un test E2E');
    await page.pause();
    await page.keyboard.press('Enter');
    await expect(page.getByText('Implémenter un test E2E')).toBeVisible();
});