import { GameStateLogger } from './lib/gamestatelogger.js';

var gamestatelogger = new GameStateLogger([], 10);
var ID = 0;

const board = document.getElementById('board')
var squaresArr = ['', '', '',
                  '', '', '',
                  '', '', ''];
const squares = document.getElementsByClassName('square')
const restart = document.getElementById('restartButton')
const players = ['X', 'O']
let currentPlayer = players[0]
const endMessage = document.createElement('h2')
endMessage.textContent = `X's turn!`
endMessage.style.marginTop = '30px'
endMessage.style.textAlign='center'
board.after(endMessage)
var someoneWon = false;
const winning_combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

var timestep = 0;
restart.addEventListener('click', () => {
    restartButton();
})

window.addEventListener('beforeunload', () => {
    gamestatelogger.logWindowClose(ID, "Session ended", timestep);
});

for(let i = 0; i < squares.length; i++){
    squares[i].addEventListener('click', () => {
	if(someoneWon) return;
        gamestatelogger.logClickEvent(ID, "Click", i, timestep);
        if(squares[i].textContent !== ''){
            return
        }
        squares[i].textContent = currentPlayer
        squaresArr[i] = currentPlayer;
        if(checkWin(currentPlayer)) {
	    someoneWon = true;
            endMessage.textContent=`Game over! ${currentPlayer} wins!`
            return
        }
        if(checkTie()) {
	    someoneWon = true;
            endMessage.textContent= `Game is tied!` 
            return
        }
        currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0] 
        if(currentPlayer == players[0]) {
            endMessage.textContent= `X's turn!`
        } else {
            endMessage.textContent= `O's turn!`
        }
        timestep++;     
    })   
}

function checkWin(currentPlayer) {
    for(let i = 0; i < winning_combinations.length; i++){
        const [a, b, c] = winning_combinations[i]
        if(squaresArr[a] === currentPlayer && squaresArr[b] === currentPlayer
            && squaresArr[c] === currentPlayer){
            gamestatelogger.logGameResult(ID, `Game over! ${currentPlayer} wins!`, timestep)
            ID++;
            timestep++;
            return true
        }
    }
    return false
}

function checkTie(){
    for(let i = 0; i < squares.length; i++) {
        if(squaresArr[i] === '') {
            return false;
        }
    }
    gamestatelogger.logGameResult(ID, "Tie", timestep);
    ID++;
    timestep++;
    return true
}

function restartButton() {
    someoneWon = false;
    for(let i = 0; i < squares.length; i++) {
        squares[i].textContent = ""
        squaresArr[i] = '';
    }
    gamestatelogger.logClickEvent(ID, "Click", 'restartButton', timestep)
    timestep++;

    endMessage.textContent=`X's turn!`
    currentPlayer = players[0]
}





