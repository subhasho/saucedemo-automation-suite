const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("playwright/test");
const { LoginPage } = require("../pages/LoginPage");
const { InventoryPage } = require("../pages/InventoryPage");
const { users } = require("../support/config");

Given("I am on the SauceDemo login page", async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.goto();
});

When("I log in with the {string} user", async function (userKey) {
  const user = users[userKey];
  await this.loginPage.login(user.username, user.password);
  this.inventoryPage = new InventoryPage(this.page);
});

When("I attempt to log in with blank username and password", async function () {
  await this.loginPage.login("", "");
});

Then("I should be redirected to the inventory page", async function () {
  const inventoryPage = new InventoryPage(this.page);
  await expect(this.page).toHaveURL(/inventory\.html/);
  expect(await inventoryPage.isLoaded()).toBeTruthy();
});

Then("I should see the error message {string}", async function (expectedMessage) {
  const errorText = await this.loginPage.getErrorText();
  expect(errorText).toContain(expectedMessage);
});
