const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('resetButton');
const pvpModeButton = document.getElementById('pvpMode');
const pvaModeButton = document.getElementById('pvaMode');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;
let isPvPMode = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (board[cellIndex] !== '' || !isGameActive) return;

    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.style.color = currentPlayer === 'X' ? 'blue' : 'pink';

    if (checkWinner()) {
        statusText.textContent = `${currentPlayer} Wins!`;
        isGameActive = false;
    } else if (board.includes('')) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateStatus();
        if (!isPvPMode && currentPlayer === 'O') {
            setTimeout(aiMove, 500);
        }
    } else {
        statusText.textContent = 'Draw!';
        isGameActive = false;
    }
}

function aiMove() {
    const availableCells = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];

    board[randomIndex] = 'O';
    cells[randomIndex].textContent = 'O';
    cells[randomIndex].style.color = 'pink';

    if (checkWinner()) {
        statusText.textContent = `O Wins!`;
        isGameActive = false;
    } else if (board.includes('')) {
        currentPlayer = 'X';
        updateStatus();
    } else {
        statusText.textContent = 'Draw!';
        isGameActive = false;
    }
}

function checkWinner() {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return board[index] === currentPlayer;
        });
    });
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.color = '';
    });
    updateStatus();
}

function setPvPMode() {
    isPvPMode = true;
    resetGame();
}

function setPvAMode() {
    isPvPMode = false;
    resetGame();
}

function updateStatus() {
    statusText.textContent = `It's ${currentPlayer}'s turn`;
    statusText.style.color = currentPlayer === 'X' ? 'blue' : 'pink';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
pvpModeButton.addEventListener('click', setPvPMode);
pvaModeButton.addEventListener('click', setPvAMode);

resetGame();
