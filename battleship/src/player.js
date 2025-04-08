class Player {
  constructor(name, enemyGameboard, isComputer = false) {
    this.name = name;
    this.enemyGameboard = enemyGameboard;
    this.isComputer = isComputer;
    this.attacksMade = new Set();
  }

  attack(x, y) {
    const attackKey = `${x},${y}`;
    if (this.attacksMade.has(attackKey)) {
      throw new Error("Already attacked this position");
    }
    this.attacksMade.add(attackKey);
    return this.enemyGameboard.receiveAttack(x, y);
  }
}
