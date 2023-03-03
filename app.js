document.addEventListener('DOMContentLoaded',() =>{

const squares = Array.from(document.querySelectorAll('.board div'));
const messageDisplay = document.querySelector('#message-board')
const width = 4;
const colors = ['rgb(255, 0, 255)', 'rgb(200, 0, 255)', 'rgb(150, 0, 255)', 'rgb(100, 0, 255)','rgb(0, 0, 255)', 'rgb(0, 100, 255)', 'rgb(0, 200, 255)', 'rgb(0, 255, 200)', 'rgb(0, 255, 150)', 'rgb(0, 255, 80)', 'rgb(0, 255, 0)']
const numbers = ['2', '4', '8', '16', '32', '64', '128', '256', '512', '1024', '2048']

let isGameWon = false

function generateRandomSquare() {
    let randomSquare = squares[Math.floor(Math.random()*squares.length)]
    while (randomSquare.classList.contains('taken')) {
        randomSquare = squares[Math.floor(Math.random()*squares.length)]
    }
    randomSquare.innerHTML = numbers[0];
    randomSquare.style.backgroundColor = colors[0];
    randomSquare.classList.add('taken');
}

function switchSquare(newSquare, square) {
    newSquare.classList.add('taken');
    newSquare.innerHTML = square.innerHTML
    newSquare.style.backgroundColor = square.style.backgroundColor
    square.innerHTML = null 
    square.style.backgroundColor = null
    square.classList.remove('taken')
}

function mergeSquare(lastSquare, square) {
    lastSquare.innerHTML = numbers[numbers.indexOf(square.innerHTML) + 1]
    lastSquare.style.backgroundColor = colors[colors.indexOf(square.style.backgroundColor) + 1]
    square.innerHTML = null
    square.style.backgroundColor = null
    square.classList.remove('taken')
}

function moveLeft() {
    for (let i = 0; i < squares.length; i += width) {
        let emptySquares = [];
        let takenSquares = [];
        for (let j = 0; j < width; j++) {
            if (squares[i+j].classList.contains('taken') == false) {
                emptySquares.push(squares[i+j]);
            } else {
                if (takenSquares.length > 0 && takenSquares[takenSquares.length-1].innerHTML == squares[i+j].innerHTML) {
                    let lastSquare = takenSquares[takenSquares.length-1];
                    mergeSquare(lastSquare, squares[i+j]);
                    emptySquares.push(squares[i+j]);
                }else if (emptySquares.length > 0) {
                    let newSquare = emptySquares.shift();
                    switchSquare(newSquare, squares[i+j]);
                    emptySquares.push(squares[i+j]);
                    takenSquares.push(newSquare);
                } else {
                    takenSquares.push(squares[i+j]);
                }
            }
        }            
    }
}

function moveRight() {
    for (let i = 0; i < squares.length; i += width) {
        let emptySquares = [];
        let takenSquares = [];
        for (let j = width-1; j >= 0; j--) {
            if (squares[i+j].classList.contains('taken') == false) {
                emptySquares.push(squares[i+j]);
            } else {
                if (takenSquares.length > 0 && takenSquares[takenSquares.length-1].innerHTML == squares[i+j].innerHTML) {
                    let lastSquare = takenSquares[takenSquares.length-1];
                    mergeSquare(lastSquare, squares[i+j]);
                    emptySquares.push(squares[i+j]);
                    squares[i+j].classList.remove('taken')
                } else if (emptySquares.length > 0) {
                    let newSquare = emptySquares.shift();
                    switchSquare(newSquare, squares[i+j]);
                    emptySquares.push(squares[i+j]);
                    takenSquares.push(newSquare);
                } else {
                    takenSquares.push(squares[i+j]);
                }
            }
        }            
    }
}


function moveUp() {
    for (let i = 0; i < width; i++) {
        let emptySquares = [];
        let takenSquares = [];
        for (let j = 0; j < squares.length; j += width) {
            if (squares[i+j].classList.contains('taken') == false) {
                emptySquares.push(squares[i+j]);
            } else {
                if (takenSquares.length > 0 && takenSquares[takenSquares.length-1].innerHTML == squares[i+j].innerHTML) {
                    let lastSquare = takenSquares[takenSquares.length-1];
                    mergeSquare(lastSquare, squares[i+j]);
                    emptySquares.push(squares[i+j]);
                }else if (emptySquares.length > 0) {
                    let newSquare = emptySquares.shift();
                    switchSquare(newSquare, squares[i+j]);
                    emptySquares.push(squares[i+j]);
                    takenSquares.push(newSquare);
                } else {
                    takenSquares.push(squares[i+j]);
                }
            }
        }            
    }
}

function moveDown() {
    for (let i = 0; i < width ; i++) {
        let emptySquares = [];
        let takenSquares = [];
        for (let j = squares.length -1; j >= 0; j -= width) {
            if (squares[j-i].classList.contains('taken') == false) {
                emptySquares.push(squares[j-i]);
            } else {
                if (takenSquares.length > 0 && takenSquares[takenSquares.length-1].innerHTML == squares[j-i].innerHTML) {
                    let lastSquare = takenSquares[takenSquares.length-1];
                    mergeSquare(lastSquare, squares[j-i]);
                    emptySquares.push(squares[j-i]);
                }else if (emptySquares.length > 0) {
                    let newSquare = emptySquares.shift();
                    switchSquare(newSquare, squares[j-i]);
                    emptySquares.push(squares[j-i]);
                    takenSquares.push(newSquare);
                } else {
                    takenSquares.push(squares[j-i]);
                }
            }
        }            
    }
}

//change display method
function gameOver() {
    document.removeEventListener('keyup', control)
    if (isGameWon)  {
        messageDisplay.innerHTML = "CONGRATULATION!"
    } else {
        messageDisplay.innerHTML = "GAME OVER"
    }
}

function control(e) {
    if (e.keyCode === 37) {
        moveLeft();
    } else if (e.keyCode === 38){
        moveUp();
    } else if (e.keyCode === 39) {
        moveRight();
    } else if (e.keyCode === 40) {
        moveDown();
   }

   if (squares.some(square => square.innerHTML === '2048')) {
        isGameWon = true
        gameOver()
   } else if (squares.every(square => square.classList.contains('taken'))) {
        gameOver()
   } else {
        generateRandomSquare();
        console.log('not over')
   }
}

generateRandomSquare()

document.addEventListener('keyup', control);

})