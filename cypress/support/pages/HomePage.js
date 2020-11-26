class HomePage{
    headLabel = ".Hero__headline-1___3C6vA";
    departingButton = ".theme__label___tqKDt";
    returnSButton = "";
    adultsDropDown = "";
    childrenDropDown = "";

    //Date Picker PopUp
    datePickerDeparting = "Departing";
    datePickerReturning = "Returning";
    datePickerMonth = "div[data-react-toolbox='month'] > span";
    datePickerNextMonth = "div[data-react-toolbox='calendar'] > #right";
    datePickerPrevMonth = "div[data-react-toolbox='calendar'] > #left";
    datePickerDay = "div[data-react-toolbox='day']";
    datePickerOk = "nav[role='navigation'] > button:nth-child(2)";
    datePickerCancel = "nav[role='navigation'] > button:nth-child(1)";
    //body > div:nth-child(4) > div > div.theme__dialog___1f3Zg.theme__active___3rz6t.theme__dialog___1RQhu > nav > button:nth-child(2)

    //Months
    months = ["January", "February", "March", "April", "May", "June", "July", "August", "October", "September", "November", "December"];

    getMonthIndex(month){
        return this.months.indexOf(month) + 1;
    }

    getClicksCalendar(currentYear, expectedYear, currentMonth, expectedMonth){
        var years = Math.abs(currentYear - expectedYear) * 12;
        var months = Math.abs( this.getMonthIndex(currentMonth) - this.getMonthIndex(expectedMonth));
        var result = 0;

        console.log("years: " + years);
        console.log("months: " + months);

        console.log("currentMonth Index: " + this.getMonthIndex(currentMonth));
        console.log("expectedMonth Index: " + this.getMonthIndex(expectedMonth));


        if(this.getMonthIndex(currentMonth) > this.getMonthIndex(expectedMonth)){

            result = years - months;

        }else if(this.getMonthIndex(currentMonth) < this.getMonthIndex(expectedMonth)){

            result = years + months;

        }

        console.log("result: " + result);

        return result;

    }

    setDepartingReturningDate(datePicker){
        cy.get(this.departingButton, {timeout: 5 * 1000}).contains(datePicker).prev().prev().click();
    }


}

export default HomePage;
