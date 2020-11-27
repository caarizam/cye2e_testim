Feature: Exploratory testing on Testim page

  I want to check through a simple e2e test the Testim page

  Scenario: Checking the login functionality
    Given The client is on the Home Page
    When The client attempts to login with username "carl@yopmail.com" and "123456"

  Scenario Outline: Customizing a dream journey to the space
    Given The client is on the Home Page
    When The client selects the dates and the travelers
      | <departing> | <returning> | <adults> | <children> |
    And The client selects "<launch>" and the "<color>"
    And The client completes the checkout information
      | <name> | <email> | <socialNumber> | <phone> |


    Examples: Data to customize the journey
      | departing        | returning       | adults | children | launch    | color | name   | email              | socialNumber | phone         |
      | 15 January 2021  | 2 April 2021    | 3      | 1        | Madan     | Green | Carlos | carl@yopmail.com   | 123-22-4444  | 1(844)6182852 |
      | 12 December 2020 | 30 January 2021 | 2      | 2        | Shenji    | Red   | Camila | camila@yopmail.com | 123-22-4445  | 1(844)6182853 |
      | 1 March 2021     | 23 March 2021   | 4      | 1        | Tongli    | Blue  | Mike   | mike@yopmail.com   | 123-22-4446  | 1(844)6182854 |
      | 19 March 2021    | 12 April 2021   | 1      | 4        | Flagstaff | Brown | John   | john@yopmail.com   | 123-22-4447  | 1(844)6182855 |
