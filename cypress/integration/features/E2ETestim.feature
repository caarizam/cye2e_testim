Feature: Exploratory testing on Testim page

  I want to check through a simple e2e test the Testim page

  Scenario Outline: Customizing a dream journey to the space
    Given The client is on the Home Page
    When The client selects the dates and the travelers
      | <departing> | <returning> | <adults> | <children> |

    Examples: Data to customize the journey
      | departing       | returning    | adults | children |
      | 15 January 2021 | 2 April 2021 | 3      | 1        |
