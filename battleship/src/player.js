export default class Player {
  constructor(name, enemyGameboard, isComputer = false) {
    this.name = name;
    this.enemyGameboard = enemyGameboard;
    this.isComputer = isComputer;
    this.attacksMade = new Set();
  }

  attack(x, y) {
    if (x < 0 || x >= 10 || y < 0 || y >= 10) {
      throw new Error("Attack coordinates out of bounds");
    }

    const attackKey = `${x},${y}`;
    if (this.attacksMade.has(attackKey)) {
      throw new Error("Already attacked this position");
    }

    this.attacksMade.add(attackKey);
    return this.enemyGameboard.receiveAttack(x, y);
  }

  makeRandomAttack() {
    if (!this.isComputer) {
      throw new Error("Only computer players can make random attacks");
    }

    // If all possible attacks have been made
    if (this.attacksMade.size >= 100) {
      return null;
    }

    let x, y, attackKey;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
      attackKey = `${x},${y}`;
    } while (this.attacksMade.has(attackKey));

    this.attack(x, y);
    return { x, y };
  }
}
