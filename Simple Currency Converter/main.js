// Welcome to the Currency Converter!
// We have imported the 'sync-input' package for you.
// You will use this in later stages.
// This package allows you to get user input.
// Like so:
// let name = input("Type your name: ");
// let age = Number(input("Type your age: "));
const input = require('sync-input');
// Write your code here

const conversionTable = new Map([
    ["USD", 1.0],
    ["JPY", 113.5],
    ["EUR", 0.89],
    ["RUB", 74.36],
    ["GBP", 0.75]

]);
console.log("Welcome to Currency Converter!");
for (const [key] of conversionTable) {
    console.log(printConversionInit(1, "USD", key));
}

let choice = 0;
while (choice !== 2) {

    console.log("What do you want to do?\n" +
        "1-Convert currencies 2-Exit program");
    let choice = input();

    switch (choice) {
        case "1":
            convert()
            break;
        case "2":
            console.log("Have a nice day!")
            process.exit(0)
            break;
        default:
            console.log("Unknown input")

    }
}

function convert() {

    while (true) {
        console.log("What do you want to convert?");
        let from = input("From: ").toUpperCase();
        if (!currencyValidator(from)) {
            continue;
        }
        let to = input("To: ").toUpperCase();


        if (!currencyValidator(to)) {
            continue;
        }

        let amount = input("Amount: ");


        if (!amountValidator(amount)) {
            continue;
        }
        console.log("Result: " + printConversion(amount, from, to));
        break;
    }
}

function toUSD(amount, from) {
    if (from === "USD") {
        return amount;
    }
    return amount / conversionTable.get(from);
}

function toX(amount, to) {
    if (to === "USD") {
        return amount;
    }
    return amount * conversionTable.get(to);
}

function printConversionInit(amount, from, to) {
    let converted = toX(toUSD(amount, from), to)
    return (`${amount} ${from} equals ${converted} ${to}`)
}

function printConversion(amount, from, to) {
    let converted = Number(toX(toUSD(amount, from), to)).toFixed(4)
    return (`${amount} ${from} equals ${converted} ${to}`)
}

function currencyValidator(input) {
    if (!conversionTable.has(input)) {
        console.log("Unknown currency");
        return false;
    }

    return true;
}

function amountValidator(input) {
    if (input < 1) {
        console.log("The amount cannot be less than 1");
        return false;
    } else if (isNaN(Number(input))) {
        console.log("The amount has to be a number")
        return false;
    }
    return true;
}
