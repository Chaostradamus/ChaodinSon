class Gameboard {
  constructor() {
    this.grid = Array(10)
      .fill(null)
      .map(() => Array(10).fill(null)); // 10x10 board initialized with null
    this.missedShots = [];
    this.ships = [];
  }

  placeShip(ship, [row, col], direction) {
    if (direction === "horizontal") {
      for (let i = 0; i < ship.length; i++) {
        this.grid[row][col + i] = ship;
      }
    } else if (direction === "vertical") {
      for (let i = 0; i < ship.length; i++) {
        this.grid[row + i][col] = ship;
      }
    }
    this.ships.push(ship);
  }

  receiveAttack([row, col]) {
    const target = this.grid[row][col];

    if (target && typeof target.hit === "function") {
      target.hit();
    } else {
      this.missedShots.push([row, col]);
    }
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}

export default Gameboard;
