class TicTacToe {
    constructor () {
        this.squaresArr = ['', '', '',
                        '', '', '',
                        '', '', ''];
        this.players = ['X', 'O']
        this.currentPlayer = this.players[0]
        this.someoneWon = false;
        this.winning_combinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
    }
    
    fillSquare(i) {
        this.squaresArr[i] = this.currentPlayer;
        if (!this.checkWin(this.currentPlayer) && !this.checkTie()) {
            this.currentPlayer = (this.currentPlayer === this.players[0]) ? this.players[1] : this.players[0];
        }
    }

    checkWin(currentPlayer) {
        for(let i = 0; i < this.winning_combinations.length; i++){
            const [a, b, c] = this.winning_combinations[i]
            if(this.squaresArr[a] === currentPlayer
                && this.squaresArr[b] === currentPlayer
                && this.squaresArr[c] === currentPlayer){
                return true
            }
        }
        return false
    }

    checkTie(){
        for(let i = 0; i < this.squaresArr.length; i++) {
            if(this.squaresArr[i] === '') {
                return false;
            }
        }
        return true
    }

    restartButton() {
        this.someoneWon = false;
        for(let i = 0; i < this.squaresArr.length; i++) {
            this.squaresArr[i] = '';
        }
        this.currentPlayer = this.players[0]
    }
}

var valid = false;

let gameInstance = new TicTacToe();

const ordered = Object.keys(GAMEDATA).sort().reduce(
  (obj, key) => { 
    obj[key] = GAMEDATA[key]; 
    return obj;
  }, 
  {}
);

console.log(JSON.stringify(ordered));

for (const [_, eventObject] of Object.entries(ordered)) {
    switch (eventObject.eventName) {
        case "Click":
            if (eventObject.location === "restartButton") {
                gameInstance.restartButton();
            } else {
                gameInstance.fillSquare(eventObject.location)
            }
            break;
        default:
            if (eventObject.gameEnd === true) {
                if (eventObject.eventName === "Game is tied!") {
                    valid = gameInstance.checkTie();
                } else {
                    if (eventObject.eventName.includes("X wins!")) {
                        valid = gameInstance.checkWin('X');
                    } else if (eventObject.eventName.includes("O wins!")) {
                        valid = gameInstance.checkWin('O');
                    }
                }
            }
            break;
    }
}

return valid;