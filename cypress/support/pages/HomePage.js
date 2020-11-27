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
    //dateDepartingPickerMonth = "div[data-react-toolbox='calendar'] div[data-react-toolbox='month'] > span";
    //dateReturningPickerMonth = "div[data-react-toolbox='calendar'] div[data-react-toolbox='month'] > span:nth-child(1)";

    departingValueInput = "div.Hero__date-picker-box___RaqVV:nth-child(1) > div:nth-child(2) > div > input"
    returningValueInput = "div.Box__box___2XzJ2:nth-child(2) > div:nth-child(2) > div > input"

    datePickerNextMonth = "div[data-react-toolbox='calendar'] > #right";
    datePickerPrevMonth = "div[data-react-toolbox='calendar'] > #left";
    datePickerDay = "div[data-react-toolbox='day']";
    datePickerOk = "nav[role='navigation'] > button:nth-child(2)";
    datePickerCancel = "nav[role='navigation'] > button:nth-child(1)";

    //Months
    months = ["January", "February", "March", "April", "May", "June", "July", "August", "October", "September", "November", "December"];

    getMonthIndex(month){
        return this.months.indexOf(month) + 1;
    }

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

    async openDatePicker(datePicker){
        await cy.get(this.datePickerButton, {timeout: 5 * 1000}).contains(datePicker).prev().prev().click();
    }

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
                        cy.get(this.datePickerNextMonth, {timeout: 7 * 1000}).click();
                    }else{
                        cy.get(this.datePickerPrevMonth, {timeout: 7 * 1000}).click();
                    }
                }
            });

        await cy.get(this.datePickerDay, { timeout: 5 * 1000 }).contains(expectedDay, { timeout: 5 * 1000 }).click();
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
