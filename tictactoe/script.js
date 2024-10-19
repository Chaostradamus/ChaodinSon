const GameModule = (() => {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let turn = "X";
  let gameActive = true;

  const checkWinner = (cells) => {
    for (let condition of winningConditions) {
      const [a, b, c] = condition;
      if (
        cells[a].textContent &&
        cells[a].textContent === cells[b].textContent &&
        cells[a].textContent === cells[c].textContent
      ) {
        DisplayModule.updateMessage(`${cells[a].textContent} Wins!`);
        gameActive = false;
        highlightWinningCells(cells, a, b, c);
        PlayerModule.updateScore(cells[a].textContent);
        return;
      }
    }
    if (gameActive && [...cells].every((cell) => cell.textContent)) {
      DisplayModule.updateMessage("It's a Draw!");
      gameActive = false;
    }
  };

  const highlightWinningCells = (cells, a, b, c) => {
    cells[a].style.color = "#007BFF";
    cells[b].style.color = "#007BFF";
    cells[c].style.color = "#007BFF";
  };

  const handleCellClick = (event, cells) => {
    const cell = event.target;
    if (cell.textContent || !gameActive) return;
    cell.textContent = turn;
    checkWinner(cells);
    turn = turn === "X" ? "O" : "X";
  };

  const restartGame = (cells) => {
    cells.forEach((cell) => (cell.textContent = ""));
    turn = "X";
    gameActive = true;
    DisplayModule.updateMessage("");
  };

  return {
    handleCellClick,
    restartGame,
    checkWinner,
  };
})();


const PlayerModule = (() => {
  let scoreX = 0;
  let scoreO = 0;

  const updateScore = (winner) => {
    if (winner === "X") {
      scoreX++;
      document.getElementById("scoreX").textContent = scoreX;
    } else {
      scoreO++;
      document.getElementById("scoreO").textContent = scoreO;
    }
  };

  return {
    updateScore,
  };
})();

const DisplayModule = (() => {
  const messageDisplay = document.getElementById("message");

  const updateMessage = (message) => {
    messageDisplay.textContent = message;
  };

  return {
    updateMessage,
  };
})();


const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const restartButton = document.getElementById("restart");

cells.forEach((cell) =>
  cell.addEventListener("click", (event) =>
    GameModule.handleCellClick(event, cells)
  )
);
restartButton.addEventListener("click", () => GameModule.restartGame(cells));

addcontact =  ()=> {
  
}