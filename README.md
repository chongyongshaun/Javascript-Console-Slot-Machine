﻿# Javascript-Console-Slot-Machine
This Node.js console application simulates a basic slot machine game. Players deposit money, place bets on multiple lines, and spin the reels. If they align three identical symbols on a line, they win a corresponding amount.

Features:

    Deposit: Players can deposit money into their balance.
    Betting: Players select the number of lines to bet on and the amount to bet per line.
    Spinning: The slot machine spins the reels, randomly selecting symbols.
    Winning: If three identical symbols align on a line, the player wins a predetermined amount based on the symbol's value.
    Balance: The player's balance is updated based on wins and losses.

Technologies:

    Node.js
    prompt-sync library for user input

How to Run:

    Install Node.js: Ensure you have Node.js installed on your system.
    Clone the Repository: Clone the project repository from GitHub.
    Install Dependencies: Run npm install to install the required prompt-sync library.
    Execute the Script: Run node slot_machine.js to start the game.

Game Flow:

    Deposit: The user is prompted to enter a deposit amount.
    Betting: The user selects the number of lines to bet on and the bet amount per line.
    Spinning: The slot machine spins the reels, displaying the result.
    Winning: If a winning combination is achieved, the winnings are calculated and added to the balance.
    Continue or Quit: The user is asked if they want to play again. If they choose to continue, the game restarts; otherwise, it exits.

Key Code Components:

    Symbol Generation: The spin() function generates a random arrangement of symbols based on the specified symbol counts.
    Result Display: The displayResultOfSpin() function displays the spin result in a formatted manner.
    Betting and Balance: The deposit(), getNumOfLines(), and getBetPerLine() functions handle user input for deposits, lines, and bets, while getWinnings() calculates the winnings based on the spin result.
    Game Loop: The game() function manages the overall game flow, including deposit, betting, spinning, winning, and balance updates.
