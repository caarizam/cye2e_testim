import {Given, When} from "cypress-cucumber-preprocessor/steps";
import HomePage from "../pages/HomePage";

const homePage = new HomePage();

Given("The client is on the Home Page", () => {

    cy.visit(Cypress.env('basePage'));
    cy.get(homePage.headLabel, {timeout: 8 * 1000});
});

When("The client selects the dates and the travelers", (dataTable) => {
    var departing = dataTable.rawTable[0][0]
    var returning = dataTable.rawTable[0][1]
    var adultsQty = dataTable.rawTable[0][2]
    var childrenQty = dataTable.rawTable[0][3]

    var departArray = departing.split(" ");
    var departExpectedYear = departArray[2];
    var departExpectedMonth = departArray[1];
    var departExpectedDay = departArray[0];

    var returningArray = returning.split(" ");
    var retExpectedYear = returningArray[2];
    var retExpectedMonth = returningArray[1];
    var retExpectedDay = returningArray[0];

    var nextPrev = true; //if false Previous if true Next

    var tmpDateArray;
    var incrementDecrement = 0;
    var currentDate = "";
    var currentYear = "";
    var currentMonth = "";

    expect(homePage.months.includes(departArray[1])).to.be.true;
    expect(homePage.months.includes(returningArray[1])).to.be.true;

    //Selecting departing date
    cy.get(homePage.departingButton, {timeout: 5 * 1000}).contains("Departing").prev().prev().click();


    cy.get(homePage.datePickerMonth, {timeout: 5 * 1000})
        .invoke('text')
        .then((text) => {
            currentDate = text;
            console.log("currentDate: " + currentDate);
            tmpDateArray = currentDate.split(" ");
            currentYear = tmpDateArray[1].trim();
            currentMonth = tmpDateArray[0].trim();

            incrementDecrement = homePage.getClicksCalendar(currentYear, departExpectedYear, currentMonth, departExpectedMonth);

            if(incrementDecrement < 0){
                nextPrev = false;
            }

            incrementDecrement = Math.abs(incrementDecrement);

            while(incrementDecrement > 0){
                incrementDecrement--;

                if(nextPrev === true){
                    cy.get(homePage.datePickerNextMonth, {timeout: 7 * 1000}).click({delay:2});
                }else{
                    cy.get(homePage.datePickerPrevMonth, {timeout: 7 * 1000}).click({delay:2});
                }
            }

            cy.get(homePage.datePickerDay, { timeout: 5 * 1000 }).contains(departExpectedDay).click();
            cy.get(homePage.datePickerOk, { timeout: 5 * 1000 }).click();

        });

    homePage.setDepartingReturningDate();
    //Selecting returning date
    /*cy.get(homePage.departingButton, {timeout: 5 * 1000}).contains("Returning").prev().prev().click();


    cy.get(homePage.datePickerMonth, {timeout: 5 * 1000})
        .invoke('text')
        .then((text) => {
            currentDate = text;
            console.log("currentDate: " + currentDate);
            tmpDateArray = currentDate.split(" ");
            currentYear = tmpDateArray[1].trim();
            currentMonth = tmpDateArray[0].trim();

            incrementDecrement = homePage.getClicksCalendar(currentYear, departExpectedYear, currentMonth, departExpectedMonth);

            if(incrementDecrement < 0){
                nextPrev = false;
            }

            incrementDecrement = Math.abs(incrementDecrement);

            while(incrementDecrement > 0){
                incrementDecrement--;

                if(nextPrev === true){
                    cy.get(homePage.datePickerNextMonth, {timeout: 7 * 1000}).click({delay:2});
                }else{
                    cy.get(homePage.datePickerPrevMonth, {timeout: 7 * 1000}).click({delay:2});
                }
            }

            cy.get(homePage.datePickerDay, { timeout: 5 * 1000 }).contains(departExpectedDay).click();
            cy.get(homePage.datePickerOk, { timeout: 5 * 1000 }).click();

        });*/


});

