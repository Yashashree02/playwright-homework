import { expect, type Locator, type Page } from '@playwright/test';

export class PetTypesPage {
    readonly page: Page;
    readonly mainHeading: Locator;
    readonly editHeading: Locator;
    readonly firstRowEditButton: Locator;
    readonly firstRowInput: Locator;
    readonly nameInputField: Locator;
    readonly updateButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.mainHeading = page.getByRole('heading', { name: 'Pet Types', exact: true });
        this.editHeading = page.getByRole('heading', { name: 'Edit Pet Type', exact: true });
        this.firstRowEditButton = page.locator('tbody tr').first().getByRole('button', { name: 'Edit' });
        this.firstRowInput = page.locator('tbody tr').first().locator('input[name="pettype_name"]');
        this.nameInputField = page.locator('input#name');
        this.updateButton = page.getByRole('button', { name: 'Update' });
    }

    async verifyOnMainPage() {
        await expect(this.mainHeading).toBeVisible();
    }

    async clickEditOnFirstRow() {
        await this.firstRowEditButton.click();
        await expect(this.editHeading).toBeVisible();
    }

    async updatePetTypeName(newName: string) {
        await this.nameInputField.click();
        await this.nameInputField.clear();
        await this.nameInputField.pressSequentially(newName, { delay: 20 });
        await this.updateButton.click();
        await this.verifyOnMainPage();
    }

    async verifyFirstRowValue(expectedValue: string) {
        await expect(this.firstRowInput).toHaveValue(expectedValue);
    }
}
