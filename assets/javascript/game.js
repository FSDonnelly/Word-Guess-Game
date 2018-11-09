
// ref dom elements
var $newGameButton = document.getElementById("new-game-button");
var $placeholders = document.getElementById("placeholders");
var $guessedLetters = document.getElementById("guessed-letters");
var $guessesLeft = document.getElementById("guesses-left");
var $wins = document.getElementById("wins");
var $losses = document.getElementById("losses");

// make variables for game (words, wins, losses, picked word, guesses left, game running, picked word placeholder, guessed letter bank, incorrect letter bank )
var wordBank = ["Black", "White", "Orange", "Blue", "Green"];
var wins = 0;
var losses = 0;
var guessesLeft = 0;
var gameRunning = false;
var pickedWord = '';
var pickedWordPlaceholdrArr = [];
var guessedLetterBank = [];
var incorrectLetterBank = [];

// new game function to reset all stats, pick new word and creat placeholders
function newGame() {
    // reset all game info
    gameRunning = true;
    guessesLeft = 8;
    guessedLetterBank = [];
    incorrectLetterBank = [];
    pickedWordPlaceholdrArr = [];

    // pick new word
    pickedWord = wordBank[Math.floor(Math.random() * wordBank.length)];

    // crate placeholders out of new picked word
    for (var i = 0; i < pickedWord.length; i++) {
        if (pickedWord[i] === " ") {
            pickedWordPlaceholdrArr.push(" ")
        } else {
            pickedWordPlaceholdrArr.push("_")
        }
    }

    // write all new game info to DOM
    $guessesLeft.textContent = guessesLeft;
    $placeholders.textContent = pickedWordPlaceholdrArr.join("");
    $guessedLetters.textContent = incorrectLetterBank;
}
// letterGuess function takes in new letter pressed in the selected word
function letterGuess(letter) {
    console.log(letter);

    if (gameRunning === true && guessedLetterBank.indexOf(letter) === -1) {
        // run game logic

        guessedLetterBank.push(letter);

        // check if guessed letter is in my picked word
        for (var i = 0; i < pickedWord.length; i++) {
            // convert both values to lower case so it will compare correctly
            if (pickedWord[i].toLowerCase() === letter.toLowerCase()) {
                // if match replace blank with letter 
                pickedWordPlaceholdrArr[i] = pickedWord[i];
            }
        }
        $placeholders.textContent = pickedWordPlaceholdrArr.join("");
        checkIncorrect(letter);
    }
    else {
        if (!gameRunning) {
            alert("GAME OVER! click Start A New Game button to start over.");
        } else {
            alert("You've already guessed this letter!");
        }
    }

}


// check for incorrect(letter)
function checkIncorrect(letter) {
    // check if picked letter didn't make it into picked word (incorrect guess)
    if (pickedWordPlaceholdrArr.indexOf(letter.toLowerCase()) === -1 && pickedWordPlaceholdrArr.indexOf(letter.toUpperCase()) === -1) {
        // incorrect guess
        guessesLeft--;
        // add incorrect letter to incorrectLetterBank
        incorrectLetterBank.push(letter);
        // write new bank of incorrect letters guessed
        $guessedLetters.textContent = incorrectLetterBank.join(' ');
        // new amount of guess left
        $guessesLeft.textContent = guessesLeft;
    }
    checkLoss();
}
// checkLose
    function checkLoss() {
        if (guessesLeft === 0){
            losses++;
            gameRunning = false;
            $losses.textContent = losses         
        }
       checkWin(); 
    }
// checkWin
    function checkWin() {
        if (pickedWord.toLowerCase() === pickedWordPlaceholdrArr.join("").toLowerCase())
    {
        wins++;
        gameRunning = false;
        $wins.textContent = wins;
    }
}
// add event listener for new game button
$newGameButton.addEventListener("click", newGame);
// add onkeyup to trigger letterGuess
document.onkeyup = function (event) {
    console.dir(event);
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        letterGuess(event.key);
    }
}