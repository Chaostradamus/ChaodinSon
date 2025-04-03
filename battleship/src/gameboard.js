export default class Gameboard {
  constructor() {
    this.ships = [];
    this.missedAttacks = [];
    this.attackedPositions = new Set();
  }

  placeShip(ship, x, y, direction) {
    const positions = [];

    for (let i = 0; i < ship.length; i++) {
      let newX, newY;

      if (direction === "horizontal") {
        newX = x;
        newY = y + i;
      } else if (direction === "vertical") {
        newX = x + i;
        newY = y;
      } else {
        throw new Error('Invalid direction. Use "horizontal" or "vertical"');
      }

      // Check bounds
      if (newX < 0 || newX >= 10 || newY < 0 || newY >= 10) {
        throw new Error("Ship out of bounds");
      }

      // Check overlap with existing ships
      for (const existingShip of this.ships) {
        if (
          existingShip.positions.some(
            (pos) => pos[0] === newX && pos[1] === newY
          )
        ) {
          throw new Error("Position already occupied by another ship");
        }
      }

      positions.push([newX, newY]);
    }

    this.ships.push({ ship, positions });
  }

  receiveAttack(x, y) {
    const positionKey = `${x},${y}`;

    // Check if already attacked
    if (this.attackedPositions.has(positionKey)) {
      throw new Error("Already attacked this position");
    }

    this.attackedPositions.add(positionKey);

    // Check if attack hits any ship
    for (const shipData of this.ships) {
      const hitPosition = shipData.positions.find(
        (pos) => pos[0] === x && pos[1] === y
      );
      if (hitPosition) {
        shipData.ship.hit();
        return true;
      }
    }

    // If no ship was hit
    this.missedAttacks.push([x, y]);
    return false;
  }

  allShipsSunk() {
    return this.ships.every((shipData) => shipData.ship.isSunk());
  }
}
