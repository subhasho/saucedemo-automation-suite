class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator(".cart_item");
    this.checkoutButton = page.locator("#checkout");
    this.removeButtons = page.locator("button", { hasText: "Remove" });
  }

  async getItemCount() {
    return this.cartItems.count();
  }

  async removeItemByName(name) {
    const item = this.page.locator(".cart_item", { hasText: name });
    await item.locator("button", { hasText: "Remove" }).click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };
