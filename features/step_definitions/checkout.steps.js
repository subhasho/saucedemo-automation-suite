const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("playwright/test");
const { CheckoutPage } = require("../pages/CheckoutPage");

Given("I proceed to checkout", async function () {
  await this.cartPage.checkout();
  this.checkoutPage = new CheckoutPage(this.page);
});

When("I fill in checkout information {string} {string} {string}", async function (firstName, lastName, postalCode) {
  await this.checkoutPage.fillInfo(firstName, lastName, postalCode);
});

When("I finish the checkout", async function () {
  await this.checkoutPage.finish();
});

Then("I should see the order complete message {string}", async function (expectedMessage) {
  const headerText = await this.checkoutPage.getCompleteHeaderText();
  expect(headerText).toBe(expectedMessage);
});

Then("I should see the checkout error message {string}", async function (expectedMessage) {
  const errorText = await this.checkoutPage.getErrorText();
  expect(errorText).toContain(expectedMessage);
});
