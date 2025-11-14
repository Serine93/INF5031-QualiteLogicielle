import { test, expect } from '@playwright/test';

test('manipulation de la page', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('faire à manger');  // ajout d'une tâche
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');          // ajout d'une tâche
  await page.getByRole('link', { name: 'Completed' }).click();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();                       // ajout d'une tâche
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('passer l\'aspirateur');  // ajout d'une tâche
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');                // ajout d'une tâche
  await page.getByRole('link', { name: 'All' }).click();
  await page.getByRole('listitem').filter({ hasText: 'faire à manger' }).getByLabel('Toggle Todo').check();        // tâche validée
  await page.getByRole('listitem').filter({ hasText: 'passer l\'aspirateur' }).getByLabel('Toggle Todo').check();  // tâche validée
  await page.getByRole('link', { name: 'Active' }).click();
  await page.getByRole('link', { name: 'All' }).click();
  await page.getByRole('button', { name: 'Clear completed' }).click();
});