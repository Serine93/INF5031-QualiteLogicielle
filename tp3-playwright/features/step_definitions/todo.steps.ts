import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { chromium, Browser, Page, expect } from '@playwright/test';

let browser: Browser;
let page: Page;

Before(async () => {
    browser = await chromium.launch({
        headless: false, 
        slowMo: 200 
    });
    const context = await browser.newContext();
    page = await context.newPage();
});

After(async () => {
    await browser.close();
});

Given('je suis sur la page TodoMVC', async () => {
    await page.goto('https://demo.playwright.dev/todomvc');
});

When('j’ajoute la tâche {string}', async (task: string) => {
    await page.getByPlaceholder('What needs to be done?').fill(task);
    await page.keyboard.press('Enter');
});

Then('la tâche {string} est visible dans la liste', async (task: string) => {
    await expect(page.getByText(task)).toBeVisible();
});

When('je supprime la tâche {string}', async (task: string) => {
    const todoItem = page.getByText(task).locator('..'); 
    await todoItem.hover();
    await todoItem.locator('.destroy').click();
});

Then('la tâche {string} n’est plus visible dans la liste', async (task: string) => {
    await expect(page.getByText(task)).toHaveCount(0);
});

// Dernier scénario : cocher tâche
When('je coche la tâche {string}', async (task: string) => {
    const todoItem = page.getByText(task).locator('..'); 
    await todoItem.locator('.toggle').check();
});

Then('la tâche {string} apparaît comme terminée', async (task: string) => {
    await expect(page.locator(`.todo-list li >> text="${task}"`)).
        toHaveClass(/completed/); 
});