class Gameboard {
  constructor() {
    this.ships = [];
    this.missedAttacks = [];
    this.attackedPositions = new Set();
  }

  placeShip(ship, x, y, direction) {
    const positions = [];

    // Adjust for edge placement
    if (direction === "horizontal" && x + ship.length > 10)
      x = 10 - ship.length;
    if (direction === "vertical" && y + ship.length > 10) y = 10 - ship.length;

    x = Math.max(0, x);
    y = Math.max(0, y);

    for (let i = 0; i < ship.length; i++) {
      const newX = direction === "horizontal" ? x + i : x;
      const newY = direction === "horizontal" ? y : y + i;

      if (newX < 0 || newX >= 10 || newY < 0 || newY >= 10) {
        throw new Error("Ship out of bounds");
      }

      for (const existingShip of this.ships) {
        if (
          existingShip.positions.some(
            (pos) => pos[0] === newX && pos[1] === newY
          )
        ) {
          throw new Error("Position already occupied");
        }
      }

      positions.push([newX, newY]);
    }

    this.ships.push({ ship, positions });
  }

  receiveAttack(x, y) {
    const positionKey = `${x},${y}`;

    if (this.attackedPositions.has(positionKey)) {
      throw new Error("Already attacked this position");
    }

    this.attackedPositions.add(positionKey);

    for (const shipData of this.ships) {
      const hitPosition = shipData.positions.find(
        (pos) => pos[0] === x && pos[1] === y
      );
      if (hitPosition) {
        shipData.ship.hit();
        return true;
      }
    }

    this.missedAttacks.push([x, y]);
    return false;
  }

  allShipsSunk() {
    return this.ships.every((shipData) => shipData.ship.isSunk());
  }
}
