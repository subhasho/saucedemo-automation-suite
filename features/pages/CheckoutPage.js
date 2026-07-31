class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator("#first-name");
    this.lastNameInput = page.locator("#last-name");
    this.postalCodeInput = page.locator("#postal-code");
    this.continueButton = page.locator("#continue");
    this.finishButton = page.locator("#finish");
    this.errorMessage = page.locator('[data-test="error"]');
    this.completeHeader = page.locator(".complete-header");
  }

  async fillInfo(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  async finish() {
    await this.finishButton.click();
  }

  async getErrorText() {
    return (await this.errorMessage.textContent())?.trim();
  }

  async getCompleteHeaderText() {
    return (await this.completeHeader.textContent())?.trim();
  }
}

module.exports = { CheckoutPage };
