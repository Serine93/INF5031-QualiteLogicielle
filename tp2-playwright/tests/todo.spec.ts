import { test } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';

test('Ajouter et compléter une tâche', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();
    await todoPage.addTask('Acheter du café');
    await todoPage.isTaskVisible('Acheter du café');
    await todoPage.completeTask('Acheter du café');
    await todoPage.isTaskCompleted('Acheter du café');
});