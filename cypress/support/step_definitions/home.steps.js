import {Given, When} from "cypress-cucumber-preprocessor/steps";
import HomePage from "../pages/HomePage";

const homePage = new HomePage();

Given("The client is on the Home Page", () => {

    cy.visit(Cypress.env('basePage'));
    cy.get(homePage.headLabel, {timeout: 8 * 1000});
});

When("The client selects the dates and the travelers", async (dataTable) => {

    let departing = dataTable.rawTable[0][0]
    let returning = dataTable.rawTable[0][1]
    let adultsQty = dataTable.rawTable[0][2]
    let childrenQty = dataTable.rawTable[0][3]

    let departArray = departing.split(" ");
    let returningArray = returning.split(" ");

    expect(homePage.months.includes(departArray[1])).to.be.true;
    expect(homePage.months.includes(returningArray[1])).to.be.true;

    //Selecting departing date
    await homePage.openDatePicker(homePage.datePickerDeparting);
    await homePage.setDepartingReturningDate(departing, homePage.departingValueInput);

    await cy.wait(2 * 1000);
    //Selecting returning date
    await homePage.openDatePicker(homePage.datePickerReturning);
    await homePage.setDepartingReturningDate(returning, homePage.returningValueInput);

    //selecting adults
    await cy.get(homePage.adultsDropDown, { timeout: 3 * 1000 }).click();

    await cy.get(homePage.adultsDropDownOptions)
        .invoke('attr', 'style', 'visibility: visible')
        .should('have.attr', 'style', 'visibility: visible')
        .find("li:not(:contains(Adults))")
        .contains("" + adultsQty, {timeout: 5 * 1000})
        .click({force: true});

    await cy.get(homePage.adultsDropDown, { timeout: 3 * 1000 })
        .invoke('val')
        .then((val) => {
            expect(adultsQty).to.be.equal(val);
        });

    //selecting children
    await cy.get(homePage.childrenDropDown, { timeout: 3 * 1000 }).click();

    await cy.get(homePage.childrenDropDownOptions)
        .invoke('attr', 'style', 'visibility: visible')
        .should('have.attr', 'style', 'visibility: visible')
        .find("li")
        .contains("" + childrenQty, { timeout: 5 * 1000, matchCase: true })
        .click({force: true});

    await cy.get(homePage.childrenDropDown, { timeout: 3 * 1000 })
        .invoke('val')
        .then((val) => {
            expect(childrenQty).to.be.equal(val);
        });

});

When("The client selects {string} and the {string}", async(launch, planetColor) => {

    await cy.get(homePage.launchDropDown).click();
    await cy.get(homePage.launchDropDownOptions, { timeout: 5 * 1000 })
        .find("li")
        .contains(launch)
        .click({ force: true });

    await cy.get(homePage.colorDropDown).click();
    await cy.get(homePage.colorDropDownOptions)
        .find("li")
        .contains(planetColor)
        .click({ force: true });

    await cy.get(homePage.cardSingleItem)
        .find(".theme__title___35Wsy")
        .contains(launch);

    await cy.get(homePage.bookButton)
        .click()
        .invoke("text")
        .then((text) => {
        expect("Booked").to.be.equal(text);
    });

});

When("The client attempts to login with username {string} and {string}", async(username, password) => {

    await cy.get(homePage.loginLink).click();
    await cy.get(homePage.usernameLoginTextField, { timeout: 5 * 1000 }).clear().type(username, { delay: 100 });
    await cy.get(homePage.passwordLoginTextField).clear().type(password, { delay: 100 });
    await cy.get(homePage.loginButton).click();
    await cy.get(homePage.afterLoginLink, { timeout: 5 * 1000 })
        .contains("Hello");

});

