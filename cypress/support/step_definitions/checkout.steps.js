import { And } from "cypress-cucumber-preprocessor/steps";
import CheckoutPage from "../pages/CheckoutPage";

const checkoutPage = new CheckoutPage();

And("The client completes the checkout information",
    async(dataTable) => {
    let name = dataTable.rawTable[0][0]
    let email = dataTable.rawTable[0][1]
    let socialNumber = dataTable.rawTable[0][2]
    let phone = dataTable.rawTable[0][3]

    await cy.get(checkoutPage.nameTextField).type(name, { delay: 150 });
    await cy.get(checkoutPage.emailTextField).type(email, { delay: 150 });
    await cy.get(checkoutPage.socialNumberTextField).type(socialNumber, { delay: 150 });
    await cy.get(checkoutPage.phoneTextField).type(phone, { delay: 50 });

    await cy.get(checkoutPage.termsConditionsCheckbox).click( { force: true } );
    await cy.get(checkoutPage.payNowButton).click({ force: true });
});
