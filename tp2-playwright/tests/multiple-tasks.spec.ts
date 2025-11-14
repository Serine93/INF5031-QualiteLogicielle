import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';

test('Ajouter deux tâches TODO et en supprimer une', async ({ page }) => {
    // aller sur la page
    const todoPage = new TodoPage(page);
    await todoPage.goto(); 
    //page.pause()
    // ajouter deux tâches
    await todoPage.addTask('Acheter du pain');
    await todoPage.addTask('Aller courir');
    //page.pause()
    // supprimer une tâche
    //page.pause()
    await todoPage.deleteTask("Acheter du pain");
    // vérifier tâche non supprimée toujours visible
    await todoPage.isTaskVisible('Aller courir');
    //page.pause()
    // vérifier tâche supprimée non visible
    await todoPage.isTaskNotVisible('Acheter du pain');
    //page.pause()
});

//npx playwright test tests/multiple-tasks.spec.ts --headed --project=chromium
//npx playwright test tests/multiple-tasks.spec.ts --headed  
//npx playwright show-report