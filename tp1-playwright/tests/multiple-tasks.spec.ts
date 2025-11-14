import { test, expect } from '@playwright/test';

test('Ajouter deux tâches TODO et en supprimer une', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');                                // aller sur la page
    //await page.pause();
    await page.getByPlaceholder('What needs to be done?').fill('Acheter du pain');         // ajouter une tâche
    await page.keyboard.press('Enter');                                                    // valider l'ajout d'une tâche
    //await page.pause();
    await page.getByPlaceholder('What needs to be done?').fill('Aller courir');            // ajouter une tâche
    await page.keyboard.press('Enter');                                                    // valider l'ajout d'une tâche
    //await page.pause();
    const item = page.getByRole('listitem').filter({ hasText: 'Acheter du pain' });
    await item.hover(); 
    await item.getByRole('button', { name: 'Delete' }).click();                            // supprimer une tâche                                          // supprimer une tâche
    //await page.pause();
    await expect(page.getByText('Aller courir')).toBeVisible();                            // vérifier tâche non supprimée toujours visible
    await expect(page.getByText('Acheter du pain')).not.toBeVisible();                     // vérifier tâche supprimée non visible
    //await page.pause();
});

//npx playwright test tests/multiple-tasks.spec.ts --headed  
//npx playwright show-report