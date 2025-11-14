import { test, expect } from '@playwright/test';

test('Mock de la liste des utilisateurs récupérée avec GET', async ({ page }) => {
    await page.route('**/api/users?page=2', async route => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                data: [
                    { id: 1, first_name: 'Jean', last_name: 'Dupont', email: 'jean.dupont@example.com' },
                    { id: 2, first_name: 'Claire', last_name: 'Martin', email: 'claire.martin@example.com' }
                ]
            })
        });
    });

    await page.goto('https://reqres.in/');
    await page.click('text=List Users');
    await expect(page.getByText('Jean')).toBeVisible();
    await expect(page.getByText('Claire')).toBeVisible();
    //await page.pause();

    await page.unroute('**/api/users?page=2');

    //await page.pause();
});

test('Mock de la création d\'un utilisateur avec POST', async ({ page }) => {
    await page.route('**/api/users', async route => {
        if (route.request().method() === 'POST') {
            const postData = route.request().postDataJSON();

            await route.fulfill({
                status: 201,
                contentType: 'application/json',
                body: JSON.stringify({
                    name: postData.name,
                    job: postData.job,
                    id: '526',
                    createdAt: '2025-11-14T14:05:22.219Z'
                })
            });

        } else {
            route.continue();
        }
    });

    await page.goto('https://reqres.in/');

    const response = await page.evaluate(async () => {
        const res = await fetch("https://reqres.in/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: "morpheus",
                job: "leader"
            })
        });
        return res.json();
    });

    expect(response.name).toBe("morpheus");
    expect(response.job).toBe("leader");
    expect(response.id).toBe("526");
    expect(response.createdAt).toBe("2025-11-14T14:05:22.219Z");

    await page.unroute('**/api/users');

    //await page.pause();
});

test('Mock de la suppression d\'un utilisateur avec DELETE', async ({ page }) => {

    await page.route('**/api/users/2', async route => {
        if (route.request().method() === 'DELETE') {

            await route.fulfill({
                status: 204,           
                contentType: 'application/json',
                body: ''            
            });

        } else {
            route.continue();
        }
    });

    await page.goto('https://reqres.in/');

    const responseStatus = await page.evaluate(async () => {
        const res = await fetch("https://reqres.in/api/users/2", {
            method: "DELETE"
        });
        return res.status;  // ➜ 204
    });

    expect(responseStatus).toBe(204);

    await page.unroute('**/api/users/2');

    //await page.pause();
});

test('Mock de la mise à jour d\'un utilisateur avec PUT', async ({ page }) => {
    await page.route('**/api/users/2', async route => {
        if (route.request().method() === 'PUT') {

            const putData = route.request().postDataJSON();

            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    name: putData.name,
                    job: putData.job,
                    updatedAt: '2025-11-14T14:05:22.219Z'
                })
            });

        } else {
            route.continue();
        }
    });

    await page.goto('https://reqres.in/');

    const response = await page.evaluate(async () => {
        const res = await fetch("https://reqres.in/api/users/2", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: "morpheus",
                job: "zion resident"
            })
        });
        return res.json();
    });

    expect(response.name).toBe("morpheus");
    expect(response.job).toBe("zion resident");
    expect(response.updatedAt).toBe("2025-11-14T14:05:22.219Z");

    await page.unroute('**/api/users/2');

    //await page.pause();
});

test('Mock de la modification partielle d\'un utilisateur avec PATCH', async ({ page }) => {
    await page.route('**/api/users/2', async route => {
        if (route.request().method() === 'PATCH') {

            const patchData = route.request().postDataJSON();

            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    ...patchData, 
                    updatedAt: '2025-11-14T14:05:22.219Z'
                })
            });

        } else {
            route.continue();
        }
    });

    await page.goto('https://reqres.in/');

    const response = await page.evaluate(async () => {
        const res = await fetch("https://reqres.in/api/users/2", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                job: "zion resident"
            })
        });
        return res.json();
    });

    expect(response.job).toBe("zion resident");
    expect(response.updatedAt).toBe("2025-11-14T14:05:22.219Z");

    await page.unroute('**/api/users/2');

    //await page.pause();
});

//npx playwright test tests/reqres.users.spec.ts --headed --project=chromium 
//npx playwright test tests/reqres.users.spec.ts --headed
//npx playwright show-report