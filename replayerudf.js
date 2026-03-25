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
            if(this.squaresArr[a] === this.currentPlayer
                && this.squaresArr[b] === this.currentPlayer
                && this.squaresArr[c] === this.currentPlayer){
                return true
            }
        }
        return false
    }

    checkTie(){
        for(let i = 0; i < this.squares.length; i++) {
            if(this.squaresArr[i] === '') {
                return false;
            }
        }
        return true
    }

    restartButton() {
        this.someoneWon = false;
        for(let i = 0; i < this.squares.length; i++) {
            this.squaresArr[i] = '';
        }
        this.currentPlayer = this.players[0]
    }
}

var valid = false;

let gameInstance = new TicTacToe();

let GAMEDATA =
{
"6":{"ID":1,"eventName":"Click","location":"restartButton","eventTime":5,"points":"n/a"},
"7":{"ID":1,"eventName":"Click","location":3,"eventTime":6,"points":"n/a"},
"8":{"ID":1,"eventName":"Click","location":4,"eventTime":7,"points":"n/a"},
"9":{"ID":1,"eventName":"Click","location":1,"eventTime":8,"points":"n/a"},
"10":{"ID":1,"eventName":"Click","location":7,"eventTime":9,"points":"n/a"},
"11":{"ID":1,"eventName":"Click","location":5,"eventTime":10,"points":"n/a"},
"12":{"ID":1,"eventName":"Click","location":0,"eventTime":11,"points":"n/a"},
"13":{"ID":1,"eventName":"Click","location":8,"eventTime":12,"points":"n/a"},
"14":{"ID":1,"eventName":"Click","location":6,"eventTime":13,"points":"n/a"},
"15":{"ID":1,"eventName":"Click","location":2,"eventTime":14,"points":"n/a"},
"16":{"ID":1,"gameEnd":true,"eventName":"Game over! X wins!","eventTime":14,"points":"n/a","highscore":"n/a"}
} 


for (const [_, eventObject] of Object.entries(GAMEDATA)) {
    switch (eventObject.eventName) {
        case "Click":
            var clickEvent = new MouseEvent("click");
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
                    console.log("checking for win")
                    if (eventObject.eventName.includes("X wins!")) {
                        console.log("checking for x win");
                        valid = gameInstance.checkWin('X');
                    } else if (eventObject.eventName.includes("O wins!")) {
                        valid = gameInstance.checkWin('O');
                    }
                }
            }
            break;
    }
}

console.log(valid);