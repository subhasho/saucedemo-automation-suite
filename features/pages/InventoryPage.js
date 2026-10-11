class InventoryPage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator(".title");
    this.inventoryItems = page.locator(".inventory_item");
    this.cartBadge = page.locator(".shopping_cart_badge");
    this.cartLink = page.locator(".shopping_cart_link");
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.itemPrices = page.locator(".inventory_item_price");
    this.itemNames = page.locator(".inventory_item_name");
    this.menuButton = page.locator("#react-burger-menu-btn");
    this.logoutLink = page.locator("#logout_sidebar_link");
  }

  async isLoaded() {
    return this.pageTitle.isVisible();
  }

  async addItemToCartByName(name) {
    const item = this.page.locator(".inventory_item", { hasText: name });
    await item.locator("button", { hasText: "Add to cart" }).click();
  }

  async getCartCount() {
    if (await this.cartBadge.isVisible()) {
      return Number(await this.cartBadge.textContent());
    }
    return 0;
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async sortBy(optionValue) {
    await this.sortDropdown.selectOption(optionValue);
  }

  async getAllPrices() {
    const texts = await this.itemPrices.allTextContents();
    return texts.map((t) => parseFloat(t.replace("$", "")));
  }

  async getAllNames() {
    return this.itemNames.allTextContents();
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
   getPageTitle() {
    return this.pageTitle;
}
}

module.exports = { InventoryPage };
