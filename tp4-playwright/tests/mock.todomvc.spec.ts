import { test, expect } from '@playwright/test';

test('Mock localStorage avec tâches existantes', async ({ page }) => {
    // Injecter un jeu de données avant que la page ne se charge
    await page.addInitScript(() => {
        const mockedTodos = [
            { title: 'Acheter du pain', completed: false },
            { title: 'Préparer le repas', completed: false },
            { title: 'Lire la documentation Playwright', completed: false },
            { title: 'Aller courir', completed: false }
        ];
        localStorage.setItem('react-todos', JSON.stringify(mockedTodos));  // clé à chercher sur un autre site
    });

    await page.goto('https://demo.playwright.dev/todomvc');
    //await page.pause();

    const thirdTask = page.getByRole('listitem').nth(2); // index 2 = 3rd
    await thirdTask.locator('input.toggle').check();
    //await page.pause();

    const firstTask = page.getByRole('listitem').nth(0); // index 0 = 1st
    await firstTask.hover();
    await firstTask.getByRole('button', { name: 'Delete' }).click();
    //await page.pause();

    // Vérification des tâches visibles dans l’interface
    await expect(page.getByText('Acheter du pain')).not.toBeVisible();
    await expect(page.getByText('Préparer le repas')).toBeVisible();
    await expect(page.getByText('Lire la documentation Playwright')).toBeVisible();
    await expect(page.getByText('Aller courir')).toBeVisible();
    const thirdTaskAfterDeletion = page.getByRole('listitem').nth(1);
    await expect(thirdTaskAfterDeletion).toHaveClass(/completed/);
    //await page.pause();
});

//npx playwright test tests/mock.todomvc.spec.ts --headed --project=chromium
//npx playwright show-report