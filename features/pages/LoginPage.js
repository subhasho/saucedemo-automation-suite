const { baseUrl } = require("../support/config");

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator("#user-name");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator("#login-button");
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto(baseUrl);
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorText() {
    return (await this.errorMessage.textContent())?.trim();
  }

  async isErrorVisible() {
    return this.errorMessage.isVisible();
  }
}

module.exports = { LoginPage };
