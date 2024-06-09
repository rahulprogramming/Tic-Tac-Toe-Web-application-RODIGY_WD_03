document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('resetButton');
    let isXTurn = true;
    let board = Array(9).fill(null);

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    resetButton.addEventListener('click', resetGame);

    function handleCellClick(event) {
        const index = event.target.dataset.index;

        if (board[index] || checkWinner()) {
            return;
        }

        board[index] = isXTurn ? 'X' : 'O';
        event.target.textContent = board[index];

        if (checkWinner()) {
            alert(`${board[index]} wins!`);
        } else if (board.every(cell => cell)) {
            alert("It's a draw!");
        }

        isXTurn = !isXTurn;
    }

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return board[a] && board[a] === board[b] && board[a] === board[c];
        });
    }

    function resetGame() {
        board = Array(9).fill(null);
        cells.forEach(cell => cell.textContent = '');
        isXTurn = true;
    }
});
