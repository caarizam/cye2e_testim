class HomePage{
    headLabel = ".Hero__headline-1___3C6vA";
    datePickerButton = ".theme__label___tqKDt";
    adultsDropDown = "div.theme__dropdown___co-4M:nth-child(3) input";
    adultsDropDownOptions = "div.theme__dropdown___co-4M:nth-child(3) > ul:nth-child(2)"
    childrenDropDown = "div.theme__dropdown___co-4M:nth-child(4) input";
    childrenDropDownOptions = "div.theme__dropdown___co-4M:nth-child(4) > ul:nth-child(2)"

    //Date Picker PopUp
    datePickerDeparting = "Departing";
    datePickerReturning = "Returning";

    departingValueInput = "div.Hero__date-picker-box___RaqVV:nth-child(1) > div:nth-child(2) > div > input"
    returningValueInput = "div.Box__box___2XzJ2:nth-child(2) > div:nth-child(2) > div > input"

    datePickerNextMonth = "div[data-react-toolbox='calendar'] > #right";
    datePickerPrevMonth = "div[data-react-toolbox='calendar'] > #left";
    datePickerDay = "div[data-react-toolbox='day']";
    datePickerOk = "nav[role='navigation'] > button:nth-child(2)";
    datePickerCancel = "nav[role='navigation'] > button:nth-child(1)";

    //Months
    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    //Launch and Color
    launchDropDown = "input[value='Launch']";
    launchDropDownOptions = "div.theme__dropdown___co-4M:nth-child(1) > ul";
    colorDropDown = "input[value='Planet color']";
    colorDropDownOptions = "div.theme__dropdown___co-4M:nth-child(2) > ul";

    //cards item
    cardSingleItem = "div.theme__card___2nWQb"
    bookButton = "button.theme__button___1iKuo:nth-child(2)"

    //Login
    loginLink = ".NavButton__nav-button___34wHC"
    usernameLoginTextField = "div.Login__field___2oefU:nth-child(1) > input"
    passwordLoginTextField = "div.Login__field___2oefU:nth-child(2) > input"
    loginButton = "button.LoginButton__button___1Sd3Q:nth-child(2)"
    afterLoginLink = ".mui-btn"

    /**
     * This method allows getting the index of the month e.g. March = 3
     * @param month
     * @returns {number}
     */
    getMonthIndex(month){
        return this.months.indexOf(month) + 1;
    }

    /**
     * This method allows calculating the number of clicks to get a month and year given
     * @param currentYear
     * @param expectedYear
     * @param currentMonth
     * @param expectedMonth
     * @returns {number}
     */
    getClicksCalendar(currentYear, expectedYear, currentMonth, expectedMonth){

        let years = Math.abs(currentYear - expectedYear) * 12;
        let months = Math.abs( this.getMonthIndex(currentMonth) - this.getMonthIndex(expectedMonth));
        let result = 0;

        if(this.getMonthIndex(currentMonth) > this.getMonthIndex(expectedMonth)){

            result = years - months;

        }else if(this.getMonthIndex(currentMonth) < this.getMonthIndex(expectedMonth)){

            result = years + months;

        }

        console.log("result: " + result);

        return result;

    }

    /**
     * This method opens the date picker Departing or Returning
     * @param datePicker
     * @returns {Promise<void>}
     */
    async openDatePicker(datePicker){
        await cy.get(this.datePickerButton, {timeout: 5 * 1000}).contains(datePicker).prev().prev().click();
    }

    /**
     * This method allows setting up the dates for Departing and Returning parameters
     * @param inputDates
     * @param inputValues
     * @returns {Promise<void>}
     */
    async setDepartingReturningDate(inputDates, inputValues){

        let datesArray = inputDates.split(" ");
        let expectedYear = datesArray[2];
        let expectedMonth = datesArray[1];
        let expectedDay = datesArray[0];

        let tmpDateArray;
        let incrementDecrement = 0;
        let currentDate = "";
        let currentYear = "";
        let currentMonth = "";

        let nextPrev = true; //if false Previous if true Next

        await cy.get(".theme__calendar___1I5OE .theme__title___2Ue3-", {timeout: 5 * 1000})
            .should('be.visible')
            .invoke('text')
            .then((text) => {
                currentDate = text;
                console.log("currentDate: " + currentDate);
                tmpDateArray = currentDate.split(" ");
                currentYear = tmpDateArray[1].trim();
                currentMonth = tmpDateArray[0].trim();
                incrementDecrement = this.getClicksCalendar(currentYear, expectedYear, currentMonth, expectedMonth);

                if(incrementDecrement < 0){
                    nextPrev = false;
                }

                incrementDecrement = Math.abs(incrementDecrement);

                while(incrementDecrement > 0){
                    incrementDecrement--;

                    if(nextPrev === true){
                        cy.get(this.datePickerNextMonth, {timeout: 7 * 1000})
                            .should('be.visible')
                            .click({ force: true });
                    }else{
                        cy.get(this.datePickerPrevMonth, {timeout: 7 * 1000})
                            .should('be.visible')
                            .click({ force: true });
                    }
                }
            });

        await cy.get(this.datePickerDay, { timeout: 5 * 1000 })
            .find("span")
            .contains(expectedDay, { timeout: 5 * 1000 })
            .should('be.visible')
            .click({ force: true });

        await cy.get(this.datePickerOk, { timeout: 5 * 1000 }).click();

        await cy.get(inputValues, { timeout: 5 * 1000 })
            .invoke('val')
            .then((val) => {
                console.log("departingValueInput: " + val);
                expect(expectedDay + " " + expectedMonth + " " + expectedYear).to.be.equal(val);
            });

    }


}

export default HomePage;
