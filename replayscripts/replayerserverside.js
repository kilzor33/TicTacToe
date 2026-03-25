class TicTacToe {
    constructor () {
        const board = document.getElementById('board')
        this.squaresArr = ['', '', '',
                        '', '', '',
                        '', '', ''];
        this.squares = document.getElementsByClassName('square')
        this.restart = document.getElementById('restartButton')
        this.players = ['X', 'O']
        this.currentPlayer = this.players[0]
        this.endMessage = document.createElement('h2')
        this.endMessage.textContent = `X's turn!`
        this.endMessage.style.marginTop = '30px'
        this.endMessage.style.textAlign='center'
        board.after(this.endMessage)
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

        this.timestep = 0;
    }

    game () {
        restart.addEventListener('click', () => {
            restartGame();
        })

        for(let i = 0; i < this.squares.length; i++){
            this.squares[i].addEventListener('click', () => {
            if(this.someoneWon) return;
                if(this.squares[i].textContent !== ''){
                    return
                }
                fillSquare(i);
                if(checkWin(this.currentPlayer)) {
                this.someoneWon = true;
                    this.endMessage.textContent=`Game over! ${currentPlayer} wins!`
                    return
                }
                if(checkTie()) {
                this.someoneWon = true;
                    this.endMessage.textContent= `Game is tied!` 
                    return
                }
                if(this.currentPlayer == this.players[0]) {
                    this.endMessage.textContent= `X's turn!`
                } else {
                    this.endMessage.textContent= `O's turn!`
                }
                this.timestep++;     
            })   
        }
    }
    
    fillSquare(i) {
        this.squares[i].textContent = this.currentPlayer;
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
                this.timestep++;
                this.endMessage.textContent=`Game over! ${currentPlayer} wins!`
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
        this.timestep++;
        return true
    }

    restartGame() {
        this.someoneWon = false;
        for(let i = 0; i < this.squaresArr.length; i++) {
            this.squares[i].textContent = ""
            this.squaresArr[i] = '';
        }
        this.timestep++;

        this.endMessage.textContent=`X's turn!`
        this.currentPlayer = this.players[0]
    }
}

var valid = false;

let gameInstance = new TicTacToe();

let GAMEDATA =
{"6":{"ID":1,"eventName":"Click","location":"restartButton","eventTime":5,"points":"n/a"},
"7":{"ID":1,"eventName":"Click","location":3,"eventTime":6,"points":"n/a"},
"8":{"ID":1,"eventName":"Click","location":4,"eventTime":7,"points":"n/a"},
"9":{"ID":1,"eventName":"Click","location":1,"eventTime":8,"points":"n/a"},
"10":{"ID":1,"eventName":"Click","location":7,"eventTime":9,"points":"n/a"},
"11":{"ID":1,"eventName":"Click","location":5,"eventTime":10,"points":"n/a"},
"12":{"ID":1,"eventName":"Click","location":0,"eventTime":11,"points":"n/a"},
"13":{"ID":1,"eventName":"Click","location":8,"eventTime":12,"points":"n/a"},
"14":{"ID":1,"eventName":"Click","location":6,"eventTime":13,"points":"n/a"},
"15":{"ID":1,"eventName":"Click","location":2,"eventTime":14,"points":"n/a"},
"16":{"ID":1,"gameEnd":true,"eventName":"`Game over! O wins!","eventTime":14,"points":"n/a","highscore":"n/a"}}


for (const [_, eventObject] of Object.entries(GAMEDATA)) {
    switch (eventObject.eventName) {
        case "Click":
            if (eventObject.location === "restartButton") {
                gameInstance.restartGame();
            } else {
                gameInstance.fillSquare(eventObject.location);
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

console.log("Was game run valid?: " + valid);