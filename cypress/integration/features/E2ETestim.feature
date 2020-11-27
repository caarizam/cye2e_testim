Feature: Exploratory testing on Testim page

  I want to check through a simple e2e test the Testim page

  Scenario Outline: Customizing a dream journey to the space
    Given The client is on the Home Page
    When The client selects the dates and the travelers
      | <departing> | <returning> | <adults> | <children> |

    Examples: Data to customize the journey
      | departing        | returning       | adults | children |
      | 15 January 2021  | 2 April 2021    | 3      | 1        |
      | 12 December 2020 | 30 January 2021 | 2      | 2        |
      | 1 March 2021     | 23 March 2021   | 4      | 1        |
      | 19 March 2021    | 12 April 2021   | 1      | 4        |
