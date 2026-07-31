Feature: Checkout on SauceDemo
  As a logged in user
  I want to purchase products
  So that I can complete an order

  Background:
    Given I am on the SauceDemo login page
    And I log in with the "standard" user
    And I add the product "Sauce Labs Backpack" to the cart
    And I go to the cart page
    And I proceed to checkout

  @positive @checkout
  Scenario: Completing checkout with valid information succeeds
    When I fill in checkout information "John" "Doe" "12345"
    And I finish the checkout
    Then I should see the order complete message "Thank you for your order!"

  @negative @checkout
  Scenario: Checkout is rejected when postal code is missing
    When I fill in checkout information "John" "Doe" ""
    Then I should see the checkout error message "Error: Postal Code is required"
