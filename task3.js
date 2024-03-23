const board = document.getElementById('board');
const status = document.getElementById('status');

let currentPlayer = 'X';
let cells = ['', '', '', '', '', '', '', '', ''];
let gameover = false;

function handleMove(index) {
  if (gameover || cells[index] !== '') return;

  cells[index] = currentPlayer;
  renderBoard();
  checkWinner();

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `Current Player: ${currentPlayer}`;
}

function renderBoard() {
  board.innerHTML = '';
  cells.forEach((cell, index) => {
    const cellDiv = document.createElement('div');
    cellDiv.classList.add('cell');
    cellDiv.textContent = cell;
    cellDiv.addEventListener('click', () => handleMove(index));
    board.appendChild(cellDiv);
  });
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (cells[a] !== '' && cells[a] === cells[b] && cells[a] === cells[c]) {
      gameover = true;
      status.textContent = `Player ${cells[a]} wins!`;
      return;
    }
  }

  if (!cells.includes('')) {
    gameover = true;
    status.textContent = "It's a draw!";
  }
}

function resetGame() {
  currentPlayer = 'X';
  cells = ['', '', '', '', '', '', '', '', ''];
  gameover = false;
  status.textContent = `Current Player: ${currentPlayer}`;
  renderBoard();
}

renderBoard();
status.textContent = `Current Player: ${currentPlayer}`;
