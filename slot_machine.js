const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;
const SYMBOL_COUNT = {
    seven: 3,
    apple: 6,
    bombs: 5,
    grape: 5,
    lemon: 6
}
const SYMBOL_POINTS = {
    seven: 10,
    apple: 2,
    bombs: 5,
    grape: 6,
    lemon: 3
}
const columns = [];
for (let i = 0; i < COLS; i++) {
    columns.push([]);
} // generate the amount of collumns in the spinning wheels, each col represented by an array

const spin = () => {
    // Clear the columns array at the start of each spin
    for (let i = 0; i < COLS; i++) {
        columns[i] = [];
    }

    const symbols = [];
    for (const [key, value] of Object.entries(SYMBOL_COUNT)) {
        for (let i = 0; i < value; i++) {
            symbols.push(key);
        }
    }//make an array filled with all the symbols e.g. ['seven', 'seven', etc]

    for (const col of columns) {
        const copyOfSymbolsArray = [...symbols];
        for (let i = 0; i < ROWS; i++) {
            const randomIndex = Math.floor(Math.random() * copyOfSymbolsArray.length)
            const selectedSymbol = copyOfSymbolsArray[randomIndex]
            col.push(selectedSymbol)
            copyOfSymbolsArray.splice(randomIndex, 1);
        }
    }

    return columns;

}


const transpose = (columnOrRow) => {
    //generate the new rows nested array to push in our transposed elements
    const rows = [];
    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
    }

    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            rows[i].push(columns[j][i])
        }
    }
    return rows
}


const displayResultOfSpin = (result) => {
    for (const row of result) {
        let rowString = "";
        for (let i = 0; i < COLS; i++) {
            rowString += row[i]
            if (i < (row.length - 1)) {
                rowString += " | "
            }
        }
        console.log(rowString)
    }
}

const deposit = () => {
    while (true) {
        const depositAmount = prompt("Please enter a deposit into your balance: ")
        const depositFloatForm = parseFloat(depositAmount); //converting the prompt input (String) into float

        if (isNaN(depositFloatForm) || depositFloatForm <= 0) {
            console.log("Please enter a valid number")
        } else {
            return depositFloatForm;
        }

    }
}

const getNumOfLines = () => {
    const inputNumOfLines = prompt("Please enter the number of lines you want to bet on (1-3): ");
    const numOfLinesFloat = parseFloat(inputNumOfLines);
    if (isNaN(numOfLinesFloat) || numOfLinesFloat <= 0 || numOfLinesFloat > 3) {
        console.log("Not a valid number of lines to bet on, please try again")
        return getNumOfLines();
    } else {
        return numOfLinesFloat;
    }
}

const getBetPerLine = (balance, lines) => {
    while (true) {
        const betAmount = prompt("Enter amount of money to withdraw from balance and bet on, per line: ")
        const betFloat = parseFloat(betAmount);

        if (isNaN(betFloat) || betFloat <= 0 || betFloat > (balance / lines)) {
            console.log("Invalid bet amount, please try again")
        } else {
            return betFloat;
        }

    }
}

const getWinnings = (rowArray, betPerLine, numOfLines) => {
    let winnings = 0;
    for (let i = 0; i < numOfLines; i++) {
        let firstSymbol = rowArray[i][0];
        let symbolAllSame = true;
        for (const symbol of rowArray[i]) {
            if (symbol !== firstSymbol) {
                symbolAllSame = false;
                break;
            }
        }
        if (symbolAllSame) {
            winnings += betPerLine * SYMBOL_POINTS[firstSymbol];
        }
    }
    return winnings;
}




const game = () => {
    let balance = deposit();
    while (true) {
        console.log("Your balance is " + balance)
        const numOfLines = getNumOfLines();
        let betPerLine = getBetPerLine(balance, numOfLines);
        let bet = betPerLine * numOfLines;
        console.log("Balance: " + balance + "\nNumber of Lines betted: " + numOfLines + "\nYou've bet a total of $" + bet);
        balance -= bet;
        const resultOfSpin = spin()
        const resultOfSpinRowsFormat = transpose(resultOfSpin);
        displayResultOfSpin(resultOfSpinRowsFormat)
        const winnings = getWinnings(resultOfSpinRowsFormat, betPerLine, numOfLines)
        balance += winnings;
        console.log("You've won: $" + winnings)

        if (balance <= 0) {
            console.log("You've ran out of money")
            break;
        }
        const playAgain = prompt("Do you want to continue playing (y/n)")
        if (playAgain !== 'y') {
            break;
        }
    }
}

game();
