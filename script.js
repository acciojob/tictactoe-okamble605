//your JS code here. If required.
let currentPlayer = '';
let board = ['', '', '', '', '', '', '', '', ''];
let players = [];
let gameOver = false;

document.getElementById('submit').addEventListener('click', function() {
  const player1 = document.getElementById('player-1').value;
  const player2 = document.getElementById('player-2').value;

  if (player1 && player2) {
    players = [player1, player2];
    currentPlayer = players[0];
    document.getElementById('currentPlayer').innerText = currentPlayer;
    document.querySelector('.input-section').style.display = 'none';
    document.querySelector('.game-section').style.display = 'block';
  } else {
    alert('Please enter names for both players.');
  }
});

document.querySelectorAll('.cell').forEach(cell => {
  cell.addEventListener('click', function() {
    if (gameOver || board[cell.id - 1]) return;

    board[cell.id - 1] = currentPlayer === players[0] ? 'X' : 'O';
    this.innerText = board[cell.id - 1];

    if (checkWin()) {
      document.querySelector('.message').innerText = `${currentPlayer} congratulations you won!`;
      gameOver = true;
      return;
    }

    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    document.getElementById('currentPlayer').innerText = currentPlayer;
  });
});

function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]            // Diagonals
  ];

  return winPatterns.some(pattern => 
    pattern.every(index => board[index] && board[index] === board[pattern[0]])
  );
}
