import { test } from '@playwright/test';
import { PetTypesPage } from '../pages/PetTypesPage'; 

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('.overlay').waitFor({ state: 'detached', timeout: 15000 });
    await page.getByRole('link', { name: ' Pet Types' }).click({ force: true });
});

test('should successfully update and reset pet type', async ({ page }) => {
    const petTypesPage = new PetTypesPage(page);
    await petTypesPage.verifyOnMainPage();
    
    await test.step('Update the pet type from cat to rabbit', async () => {
        await petTypesPage.clickEditOnFirstRow();
        await petTypesPage.updatePetTypeName('rabbit');
        await petTypesPage.verifyFirstRowValue('rabbit');
    });

   
    await test.step('Reset the pet type back from rabbit to cat', async () => {
        await petTypesPage.clickEditOnFirstRow();
        await petTypesPage.updatePetTypeName('cat');
        await petTypesPage.verifyFirstRowValue('cat');
    });
});
