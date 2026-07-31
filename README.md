# SauceDemo Automation Suite

Automated test suite for [saucedemo.com](https://www.saucedemo.com) built with
**Playwright** + **Cucumber.js** (JavaScript), using the Page Object Model.

## What's covered

10 scenarios across 3 feature files, using different SauceDemo user credentials
(`standard_user`, `locked_out_user`, an invalid password, an unregistered user,
and blank credentials):

| Feature | Scenarios |
|---|---|
| `login.feature` | 1 positive (successful login), 4 negative (locked out user, wrong password, unknown user, blank fields) |
| `inventory.feature` | 3 positive (sort by price, add to cart, remove from cart) |
| `checkout.feature` | 1 positive (full checkout flow), 1 negative (missing postal code) |

Tags: `@positive` / `@negative`, and `@login` / `@inventory` / `@checkout` for
running subsets.

## Project structure

```
features/
  login.feature
  inventory.feature
  checkout.feature
  pages/                 # Page Object Model classes
    LoginPage.js
    InventoryPage.js
    CartPage.js
    CheckoutPage.js
  step_definitions/       # Cucumber step definitions
    login.steps.js
    inventory.steps.js
    checkout.steps.js
  support/
    world.js              # Custom Cucumber World
    hooks.js               # Before/After hooks, browser lifecycle, screenshots on failure
    config.js               # Base URL and test user credentials
cucumber.js                 # Cucumber.js configuration
package.json
```

## Prerequisites

- Node.js 18+ installed
- Internet access (to install dependencies and the Playwright browser)

## Setup

```bash
npm install
npx playwright install chromium
```

## Running the tests

Run the full suite (headless by default):

```bash
npm test
```

Run with a visible browser (useful for demoing / debugging):

```bash
HEADLESS=false npm test
```

Run only a subset by tag:

```bash
npx cucumber-js --tags "@login"
npx cucumber-js --tags "@negative"
```

Generate an HTML report (also produced automatically by `npm test`, written to
`reports/cucumber-report.html`):

```bash
npm run test:report
```

Screenshots for any failed scenario are automatically saved to
`reports/screenshots/` and attached to the HTML report.

## Notes

- `node_modules/` and the `reports/` folder are intentionally excluded via
  `.gitignore` and are **not** included in this submission — run `npm install`
  to restore dependencies.
- The `.git` folder is included as requested, showing local commit history
  for the project's development.
- Test user credentials are centralized in `features/support/config.js` for
  easy reuse/extension.
