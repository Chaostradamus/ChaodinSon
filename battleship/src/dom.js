class DOMController {
  constructor() {
    this.humanBoard = new Gameboard();
    this.computerBoard = new Gameboard();

    this.human = new Player("You", this.computerBoard);
    this.computer = new Player("Computer", this.humanBoard, true);

    this.human.gameboard = this.humanBoard;
    this.computer.gameboard = this.computerBoard;

    this.currentPlayer = "human";
    this.gameActive = false;
    this.selectedShipLength = null;
    this.shipsToPlace = [5, 4, 3, 3, 2];
    this.placedShips = [];

    this.draggingShip = null;
    this.dragDirection = "horizontal";
    this.cpuTargetStack = [];
    this.lastHit = null;

    this.handleAttack = this.handleAttack.bind(this);
    this.computerTurn = this.computerTurn.bind(this);
    this.restartGame = this.restartGame.bind(this);

    this.init();
  }

  init() {
    this.setupPlacementControls();
    this.placeComputerShips();
    this.renderBoards();
    this.updateMessage("Place your ships - drag or use controls below");
  }

  setupPlacementControls() {
    // Track Shift key for drag direction
    document.addEventListener("keydown", (e) => {
      if (e.key === "Shift") {
        this.dragDirection = "vertical";
        document.body.classList.add("shift-active");
        document.querySelectorAll(".draggable-ship").forEach((ship) => {
          if (ship.classList.contains("dragging")) {
            ship.classList.add("dragging-vertical");
          }
        });
      }
    });

    document.addEventListener("keyup", (e) => {
      if (e.key === "Shift") {
        this.dragDirection = "horizontal";
        document.body.classList.remove("shift-active");
        document.querySelectorAll(".draggable-ship").forEach((ship) => {
          ship.classList.remove("dragging-vertical");
        });
      }
    });

    // Ship selection for manual placement
    document.querySelectorAll(".draggable-ship").forEach((ship) => {
      // Click to select for manual placement
      ship.addEventListener("click", () => {
        this.selectedShipLength = parseInt(ship.dataset.length);
        document
          .querySelectorAll(".draggable-ship")
          .forEach((s) => (s.style.border = ""));
        ship.style.border = "2px solid #f1c40f";
        this.updateMessage(`Selected ${ship.textContent} - choose coordinates`);
      });

      // Drag and drop
      ship.addEventListener("dragstart", (e) => {
        this.draggingShip = parseInt(e.target.dataset.length);
        e.dataTransfer.setData("text/plain", e.target.dataset.length);
        e.target.classList.add("dragging");
        if (this.dragDirection === "vertical") {
          e.target.classList.add("dragging-vertical");
        }
      });

      ship.addEventListener("dragend", (e) => {
        e.target.classList.remove("dragging", "dragging-vertical");
      });
    });

    const playerBoard = document.getElementById("player-board");
    playerBoard.addEventListener("dragover", (e) => {
      e.preventDefault();
      this.highlightEdgeCells(e);
    });

    playerBoard.addEventListener("dragleave", () => {
      this.clearEdgeHighlight();
    });

    playerBoard.addEventListener("drop", (e) => {
      e.preventDefault();
      this.clearEdgeHighlight();
      if (!this.draggingShip) return;

      const rect = playerBoard.getBoundingClientRect();
      let x = Math.floor((e.clientX - rect.left) / 40);
      let y = Math.floor((e.clientY - rect.top) / 40);

      // Snap to edges
      if (this.dragDirection === "horizontal") {
        if (x + this.draggingShip > 10) x = 10 - this.draggingShip;
      } else {
        if (y + this.draggingShip > 10) y = 10 - this.draggingShip;
      }

      x = Math.max(0, Math.min(x, 9));
      y = Math.max(0, Math.min(y, 9));

      this.placeShip(this.draggingShip, x, y, this.dragDirection);
      this.draggingShip = null;
    });

    // Manual Placement
    document.getElementById("place-btn").addEventListener("click", () => {
      if (!this.selectedShipLength) {
        this.updateMessage("Please select a ship first");
        return;
      }

      const x = parseInt(document.getElementById("x-coord").value);
      const y = parseInt(document.getElementById("y-coord").value);
      const direction = document.getElementById("direction").value;

      if (isNaN(x) || isNaN(y)) {
        this.updateMessage("Please enter valid coordinates");
        return;
      }

      this.placeShip(this.selectedShipLength, x, y, direction);
    });

    // Randomize button
    document.getElementById("randomize-btn").addEventListener("click", () => {
      this.randomizeShips();
    });

    // Start game button
    document.getElementById("start-game-btn").addEventListener("click", () => {
      this.startGame();
    });

    // Restart button
    document.getElementById("restart-btn").addEventListener("click", () => {
      this.restartGame();
    });
  }

  highlightEdgeCells(e) {
    if (!this.draggingShip) return;

    const playerBoard = document.getElementById("player-board");
    const rect = playerBoard.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / 40);
    const y = Math.floor((e.clientY - rect.top) / 40);

    this.clearEdgeHighlight();

    for (let i = 0; i < this.draggingShip; i++) {
      const cellX =
        this.dragDirection === "horizontal" ? Math.min(x + i, 9) : x;
      const cellY =
        this.dragDirection === "horizontal" ? y : Math.min(y + i, 9);
      const cell = document.querySelector(
        `#player-board .cell[data-x="${cellX}"][data-y="${cellY}"]`
      );
      if (cell) cell.classList.add("highlight-edge");
    }
  }

  clearEdgeHighlight() {
    document
      .querySelectorAll("#player-board .highlight-edge")
      .forEach((cell) => {
        cell.classList.remove("highlight-edge");
      });
  }

  placeShip(length, x, y, direction) {
    try {
      // Adjust for edge placement
      if (direction === "horizontal" && x + length > 10) x = 10 - length;
      if (direction === "vertical" && y + length > 10) y = 10 - length;

      x = Math.max(
        0,
        Math.min(x, 10 - (direction === "horizontal" ? length : 1))
      );
      y = Math.max(
        0,
        Math.min(y, 10 - (direction === "vertical" ? length : 1))
      );

      const ship = new Ship(length);
      this.human.gameboard.placeShip(ship, x, y, direction);
      this.placedShips.push(length);
      this.shipsToPlace = this.shipsToPlace.filter((l) => l !== length);

      this.renderBoards();
      this.updateMessage(
        `${length}-length ship placed ${direction}ly at (${x},${y})`
      );

      if (this.placedShips.length === 5) {
        document.getElementById("start-game-btn").disabled = false;
      }
    } catch (error) {
      this.updateMessage(error.message);
    }
  }

  randomizeShips() {
    this.humanBoard = new Gameboard();
    this.human.gameboard = this.humanBoard;
    this.placedShips = [];

    const shipLengths = [5, 4, 3, 3, 2];
    shipLengths.forEach((length) => {
      let placed = false;
      while (!placed) {
        try {
          const x = Math.floor(Math.random() * 10);
          const y = Math.floor(Math.random() * 10);
          const direction = Math.random() > 0.5 ? "horizontal" : "vertical";
          this.human.gameboard.placeShip(new Ship(length), x, y, direction);
          this.placedShips.push(length);
          placed = true;
        } catch (e) {}
      }
    });

    this.renderBoards();
    document.getElementById("start-game-btn").disabled = false;
    this.updateMessage("Ships placed randomly! Ready to start.");
  }

  placeComputerShips() {
    const shipLengths = [5, 4, 3, 3, 2];
    shipLengths.forEach((length) => {
      let placed = false;
      while (!placed) {
        try {
          const x = Math.floor(Math.random() * 10);
          const y = Math.floor(Math.random() * 10);
          const direction = Math.random() > 0.5 ? "horizontal" : "vertical";
          this.computer.gameboard.placeShip(new Ship(length), x, y, direction);
          placed = true;
        } catch (e) {}
      }
    });
  }

  startGame() {
    if (this.placedShips.length < 5) {
      this.updateMessage("Please place all ships first");
      return;
    }

    this.gameActive = true;
    this.currentPlayer = "human";
    document.getElementById("placement-controls").style.display = "none";
    this.updateMessage("Game started! Attack enemy waters!");
    this.renderBoards();
  }

  renderBoards() {
    this.renderBoard(this.human.gameboard, "player-board", false);
    this.renderBoard(this.computer.gameboard, "computer-board", true);
  }

  renderBoard(gameboard, elementId, isClickable) {
    const boardElement = document.getElementById(elementId);
    boardElement.innerHTML = "";

    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.dataset.x = x;
        cell.dataset.y = y;

        // Check if position was attacked
        const positionKey = `${x},${y}`;
        const wasAttacked =
          gameboard.attackedPositions &&
          gameboard.attackedPositions.has(positionKey);

        if (wasAttacked) {
          const isHit = gameboard.ships.some((shipData) =>
            shipData.positions.some((pos) => pos[0] === x && pos[1] === y)
          );
          cell.classList.add(isHit ? "hit" : "miss");
        }

        // Show player's ships
        if (elementId === "player-board") {
          const hasShip = gameboard.ships.some((shipData) =>
            shipData.positions.some((pos) => pos[0] === x && pos[1] === y)
          );
          if (hasShip) cell.classList.add("ship");
        }

        // Make computer board clickable during game
        if (
          isClickable &&
          this.gameActive &&
          this.currentPlayer === "human" &&
          !wasAttacked
        ) {
          cell.addEventListener("click", this.handleAttack);
        }

        boardElement.appendChild(cell);
      }
    }
  }

  async handleAttack(event) {
    if (!this.gameActive || this.currentPlayer !== "human") return;

    const x = parseInt(event.target.dataset.x);
    const y = parseInt(event.target.dataset.y);

    try {
      const hit = this.computer.gameboard.receiveAttack(x, y);
      this.updateMessage(hit ? "Hit!" : "Miss!");
      this.renderBoards();

      if (this.computer.gameboard.allShipsSunk()) {
        this.updateMessage("You won! 🎉");
        this.gameActive = false;
        return;
      }

      this.currentPlayer = "computer";
      await this.computerTurn();
    } catch (error) {
      this.updateMessage(error.message);
    }
  }

  async computerTurn() {
    if (!this.gameActive || this.currentPlayer !== "computer") return;

    this.updateMessage("Computer's turn...");
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const [x, y] = this.makeComputerAttack();
    const hit = this.human.gameboard.receiveAttack(x, y);
    this.computer.attacksMade.add(`${x},${y}`);

    this.lastHit = hit ? [x, y] : null;
    this.updateMessage(
      `Computer attacked (${x},${y}) - ${hit ? "HIT!" : "MISS"}`
    );
    this.renderBoards();

    if (this.human.gameboard.allShipsSunk()) {
      this.updateMessage("Computer won! 💻");
      this.gameActive = false;
      return;
    }

    this.currentPlayer = "human";
    this.updateMessage("Your turn - Attack enemy waters!");
  }

  makeComputerAttack() {
    while (this.cpuTargetStack.length > 0) {
      const [x, y] = this.cpuTargetStack.pop();
      const key = `${x},${y}`;
      if (!this.computer.attacksMade.has(key)) {
        return [x, y];
      }
    }

    if (this.lastHit) {
      const [x, y] = this.lastHit;
      const targets = [
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y - 1],
      ].filter(([nx, ny]) => nx >= 0 && nx < 10 && ny >= 0 && ny < 10);

      targets.forEach((pos) => {
        const key = `${pos[0]},${pos[1]}`;
        if (!this.computer.attacksMade.has(key)) {
          this.cpuTargetStack.push(pos);
        }
      });

      if (this.cpuTargetStack.length > 0) {
        return this.cpuTargetStack.pop();
      }
    }

    let x, y, key;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
      key = `${x},${y}`;
    } while (this.computer.attacksMade.has(key));

    return [x, y];
  }

  updateMessage(text) {
    document.getElementById("game-message").textContent = text;
  }

  restartGame() {
    this.humanBoard = new Gameboard();
    this.computerBoard = new Gameboard();

    this.human = new Player("You", this.computerBoard);
    this.computer = new Player("Computer", this.humanBoard, true);

    this.human.gameboard = this.humanBoard;
    this.computer.gameboard = this.computerBoard;

    this.currentPlayer = "human";
    this.gameActive = false;
    this.selectedShipLength = null;
    this.shipsToPlace = [5, 4, 3, 3, 2];
    this.placedShips = [];
    this.cpuTargetStack = [];
    this.lastHit = null;

    document.getElementById("placement-controls").style.display = "block";
    document.getElementById("start-game-btn").disabled = true;
    document.getElementById("placement-instructions").textContent =
      "Drag ships to your board or use the controls below";
    document.getElementById("x-coord").value = "";
    document.getElementById("y-coord").value = "";

    this.placeComputerShips();
    this.renderBoards();
    this.updateMessage("Place your ships to begin");
  }
}
