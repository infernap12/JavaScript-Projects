const input = require('sync-input')

function intput() {
    return parseInt(input())
}

function Coffee(water, milk, coffee_beans, price) {
    this.water = water;
    this.milk = milk;
    this.coffee_beans = coffee_beans;
    this.price = price;
}

let espresso = new Coffee(250, 0, 16, 4);
let latte = new Coffee(350, 75, 20, 7);
let cappuccino = new Coffee(200, 100, 12, 6);
let drinks = [espresso,latte,cappuccino]

let machine = {water: 400, milk: 540, coffee_beans: 120, cups: 9, cash: 550};


while (true) {
    menu();
}


function buy() {
    console.log("What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, back - to main menu: ")
    let choice = input();
    if (choice.includes("back")) {
        return;
    }
    let drink = drinks[choice-1];
    for (let drinkKey in drink) {
        if (machine[drinkKey] < drink[drinkKey]) {
            console.log(`Sorry, not enough ${drinkKey.toString()}!\n`)
            return
        }
        machine[drinkKey] -= drink[drinkKey];
    }
    machine.cash += drink.price;
    machine.cups--;
    console.log("I have enough resources, making you a coffee!")
    console.log();
}

function fill() {
    console.log("Write how many ml of water you want to add:");
    machine.water += intput();
    console.log("Write how many ml of milk you want to add:");
    machine.milk += intput();
    console.log("Write how many grams of coffee beans you want to add:");
    machine.coffee_beans += intput();
    console.log("Write how many disposable cups you want to add: ");
    machine.cups += intput();
    console.log();
}

function take() {
    console.log(`I gave you $${machine.cash}`);
    machine.cash = 0;
    console.log();
}

function printStatus() {
    console.log(`The coffee machine has:
${machine.water} ml of water
${machine.milk} ml of milk
${machine.coffee_beans} g of coffee beans
${machine.cups} disposable cups
$${machine.cash} of money`)
    console.log();
}

function exit() {
    process.exit(0)
}

function menu() {
    console.log("Write action (buy, fill, take, remaining, exit): ");
    let choice = input();
    console.log();
    switch (choice) {
        case "buy":
            buy();
            break;
        case "fill":
            fill();
            break;
        case "take":
            take();
            break;
        case "remaining":
            printStatus();
            break;
        case "exit":
            exit();
            break;
        default:
            console.log("Umm, no");
            console.log();
            break;
    }
}
