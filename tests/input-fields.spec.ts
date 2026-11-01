import { test, expect } from "@playwright/test";

test("should update and reset pet type", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Pet Types" }).click();

  await expect(page.getByRole("heading")).toHaveText("Pet Types");
  await page
    .getByRole("row", { name: "cat" })
    .getByRole("button", { name: "Edit" })
    .click();

  await expect(page.getByRole("heading")).toHaveText("Edit Pet Type");
  const nameInput = page.getByRole("textbox");
  await expect(nameInput).toHaveValue("cat");
  await nameInput.fill("rabbit");
  await page.getByRole("button", { name: "Update" }).click();

  await expect(page.getByRole("heading")).toHaveText("Pet Types");
  await page
    .getByRole("row", { name: "rabbit" })
    .getByRole("button", { name: "Edit" })
    .click();
  await expect(page.getByRole("textbox")).toHaveValue("rabbit");
  await page.getByRole("textbox").fill("cat");
  await page.getByRole("button", { name: "Update" }).click();
  await expect(page.getByRole("row", { name: "cat" })).toBeVisible();
});
