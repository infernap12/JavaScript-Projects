// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input')

const list = ["python", "java", "swift", "javascript"];
let win = 0;
let loss = 0;


console.log("H A N G M A N\n")

let choice;

while (choice !== "exit") {
    choice = input("Type \"play\" to play the game, \"results\" to show the scoreboard, and \"exit\" to quit:");
    switch (choice) {
        case "play":
            play();
            break;
        case "results":
            results(win, loss);
            break;
        case "exit":
            break;
        default:
    }
}


function results(win, loss) {
    console.log(`You won: ${win} times.`)
    console.log(`You lost: ${loss} times.`)
}

function play() {
    let tries = 8;
    const rando = Math.round(Math.random() * 3);
    const correctWord = list[rando];
    let displayArr = Array.from("-".repeat(correctWord.length));
    let displayWord = charArrToString(displayArr);
    let pastGuess = [""]

    while (tries > 0) {
        console.log(displayWord);
        let guess = input("Input a letter: ");
        let isValidGuess = validateGuess(guess, pastGuess);
        if (!isValidGuess) {
            continue;
        }
        pastGuess.push(guess);

        if (correctWord.includes(guess)) {
            for (let i = 0; i < correctWord.length; i++) {
                const ch = correctWord[i];
                if (ch === guess) {
                    displayArr[i] = ch;
                }
            }
        } else {
            console.log("That letter doesn't appear in the word.");
            tries--;
        }
        console.log()
        displayWord = charArrToString(displayArr);
        if (correctWord === displayWord) {
            console.log(`You guessed the word ${correctWord}!`);
            console.log("You survived!")
            win++;
            break;
        } else if (tries === 0) {
            console.log("You lost!");
            loss++;
        }
    }
}

function validateGuess(guess, pastGuess) {
    if (guess.length !== 1) {
        console.log("Please, input a single letter.");
        return false;
    } else if (!/[a-z]/.test(guess)) {
        console.log("Please, enter a lowercase letter from the English alphabet.");
        return false;
    } else if (pastGuess.toString().includes(guess)) {
        console.log("You've already guessed this letter.");
        return false;
    } else {
        return true;
    }
}

function charArrToString(arr) {
    return arr.toString().replaceAll(",", "");
}
