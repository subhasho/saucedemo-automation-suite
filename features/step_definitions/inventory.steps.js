const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("playwright/test");
const { CartPage } = require("../pages/CartPage");

When("I sort products by {string}", async function (label) {
  const map = {
    "Name (A to Z)": "az",
    "Name (Z to A)": "za",
    "Price (low to high)": "lohi",
    "Price (high to low)": "hilo"
  };
  await this.inventoryPage.sortBy(map[label]);
});

Then("the products should be listed in ascending price order", async function () {
  const prices = await this.inventoryPage.getAllPrices();
  const sorted = [...prices].sort((a, b) => a - b);
  expect(prices).toEqual(sorted);
});

When("I add the product {string} to the cart", async function (productName) {
  await this.inventoryPage.addItemToCartByName(productName);
});

Then("the cart badge should show {string}", async function (count) {
  const cartCount = await this.inventoryPage.getCartCount();
  expect(String(cartCount)).toBe(count);
});

Given("I go to the cart page", async function () {
  await this.inventoryPage.goToCart();
  this.cartPage = new CartPage(this.page);
});

When("I remove the product {string} from the cart", async function (productName) {
  await this.cartPage.removeItemByName(productName);
});

Then("the cart should contain {int} items", async function (count) {
  const itemCount = await this.cartPage.getItemCount();
  expect(itemCount).toBe(count);
});
