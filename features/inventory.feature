Feature: Inventory interactions on SauceDemo
  As a logged in user
  I want to browse and sort products
  So that I can find what I want to buy

  Background:
    Given I am on the SauceDemo login page
    And I log in with the "standard" user

  @positive @inventory
  Scenario: Products can be sorted by price low to high
    When I sort products by "Price (low to high)"
    Then the products should be listed in ascending price order

  @positive @inventory
  Scenario: Adding an item updates the cart badge count
    When I add the product "Sauce Labs Backpack" to the cart
    Then the cart badge should show "1"

  @positive @inventory
  Scenario: Removing an item from the cart updates the cart contents
    Given I add the product "Sauce Labs Backpack" to the cart
    And I go to the cart page
    When I remove the product "Sauce Labs Backpack" from the cart
    Then the cart should contain 0 items
