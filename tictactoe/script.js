const GameModule = (() => {

  //  winning conditions array to check for winning combos on the board
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

// turn markers and if game is still active boolean
  let turn = "X";
  let gameActive = true;


// checking winner function that takes in cells and checks for winning combinations by destructuring winning combo arrays
// checking if first cell is occupied and them checking with cell b and c
// if true then it calls on displaymodule's update message function to update the display message
// calls on highlight winning cells function to highlight cells
// calls playermodule updatescore function that updates the score based off cell[a] which would be the marker of winning player
// and returns
// else itll check if gameisactive and if every cell has content then it will display draw and update gameactive to false
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


// function that takes cells and abc and changes their color
  const highlightWinningCells = (cells, a, b, c) => {
    cells[a].style.color = "#007BFF";
    cells[b].style.color = "#007BFF";
    cells[c].style.color = "#007BFF";
  };


// function that handles every click of the gameboard
// takes cells and the event from click
// cell will = the event
// if theres content in cell and game isnt active itll return thus preventing anything frmo happening
// if not we set the content to turn which is an X or O
// then we call checkwinner on the cells which will check for a winner and update displays and scores
// then it will change the turn from X to O or vice versa


  const handleCellClick = (event, cells) => {
    const cell = event.target;
    if (cell.textContent || !gameActive) return;
    cell.textContent = turn;
    checkWinner(cells);
    turn = turn === "X" ? "O" : "X";
  };


// function that takes all the cells and sets each cell to be empty resets turn to X gamestate to active and display module blanks
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



// player module that handles the score
const PlayerModule = (() => {
  let scoreX = 0;
  let scoreO = 0;


// function that updates score based on a winner 
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

// display module that takes care of update the message displayers
const DisplayModule = (() => {
  const messageDisplay = document.getElementById("message");

  const updateMessage = (message) => {
    messageDisplay.textContent = message;
  };

  return {
    updateMessage,
  };
})();

// only globals will be targeting the board cells and buttons
const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const restartButton = document.getElementById("restart");


// adding onClick events to all the cells which is the gamemodules.handleClick event passing in the events and the cells
cells.forEach((cell) =>
  cell.addEventListener("click", (event) =>
    GameModule.handleCellClick(event, cells)
  )
);

restartButton.addEventListener("click", () => GameModule.restartGame(cells));

