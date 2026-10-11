Feature: Login to SauceDemo
  As a user of saucedemo.com
  I want to log in with different credentials
  So that I can access the store or be correctly blocked when invalid

  Background:
    Given I am on the SauceDemo login page

  @positive @login @Test2
  Scenario: Successful login with a valid standard user
    When I log in with the "standard" user
    Then I should be redirected to the inventory page

  @negative @login
  Scenario: Login is rejected for a locked out user
    When I log in with the "lockedOut" user
    Then I should see the error message "Epic sadface: Sorry, this user has been locked out."

  @negative @login
  Scenario: Login is rejected with an incorrect password
    When I log in with the "invalidPassword" user
    Then I should see the error message "Epic sadface: Username and password do not match any user in this service"

  @negative @login
  Scenario: Login is rejected with an unregistered username
    When I log in with the "unregistered" user
    Then I should see the error message "Epic sadface: Username and password do not match any user in this service"
    

  @negative @login
  Scenario: Login is rejected when credentials are left blank
    When I attempt to log in with blank username and password
    Then I should see the error message "Epic sadface: Username is required"
