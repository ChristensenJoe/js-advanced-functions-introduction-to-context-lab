// Your code here
function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(arr) {
    let objArr = [];
    arr.forEach(element => objArr.push(createEmployeeRecord(element)));
    return objArr;
}

function createTimeInEvent(record, dateStamp) {
    const dateStampArr = dateStamp.split(" ");
    record.timeInEvents.push({
        type: "TimeIn",
        hour: Number.parseInt(dateStampArr[1], 10),
        date: dateStampArr[0]
    });
    return record;
}

function createTimeOutEvent(record, dateStamp) {
    const dateStampArr = dateStamp.split(" ");
    record.timeOutEvents.push({
        type: "TimeOut",
        hour: Number.parseInt(dateStampArr[1], 10),
        date: dateStampArr[0]
    });
    return record;
}

function hoursWorkedOnDate(record, date) {
    let timeIn = 0;
    let timeOut = 0;
    record.timeInEvents.forEach(element => {
        if (element.date === date) {
            timeIn = element.hour;
        }
    });
    record.timeOutEvents.forEach(element => {
        if (element.date === date) {
            timeOut = element.hour;
        }
    });

    timeIn = Math.floor(timeIn * 0.01);
    timeOut = Math.floor(timeOut * 0.01);

    return timeOut - timeIn;
}

function wagesEarnedOnDate(record, date) {
    return hoursWorkedOnDate(record, date) * record.payPerHour;
}

function allWagesFor(record) {
    let dates = [];
    record.timeInEvents.forEach((element) => {
        record.timeOutEvents.forEach((element2) => {
            if(element.date === element2.date) {
                dates.push(element.date);
            }
        })
    })
    return record.timeInEvents.reduce((accumulator, element) => {
        if(dates.includes(element.date)) {
            return wagesEarnedOnDate(record, element.date) + accumulator;
        }
        else {
            return accumulator;
        }
    }, 0);
}

function findEmployeeByFirstName(srcArray, firstName) {
    let obj = {};
    srcArray.forEach((element) => {
        if(element.firstName === firstName) {
            obj = element;
        }
    });

    return obj;
}

function calculatePayroll(arr) {
    return arr.reduce((accumulator, element) => {
        return allWagesFor(element) + accumulator;
    }, 0);
}