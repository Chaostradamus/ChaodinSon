export default class Game {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.currentPlayer = player1;
    this.gameOver = false;
    this.winner = null;
  }

  playTurn(x, y) {
    if (this.gameOver) {
      throw new Error("Game is already over");
    }

    let attackResult;

    if (this.currentPlayer.isComputer) {
      attackResult = this.currentPlayer.makeRandomAttack();
    } else {
      if (x === undefined || y === undefined) {
        throw new Error("Coordinates must be provided for human player");
      }
      attackResult = this.currentPlayer.attack(x, y);
    }

    // Check if game is over after this attack
    if (this.player1.enemyGameboard.allShipsSunk()) {
      this.gameOver = true;
      this.winner = this.player1;
    } else if (this.player2.enemyGameboard.allShipsSunk()) {
      this.gameOver = true;
      this.winner = this.player2;
    } else {
      // Only switch players if game isn't over
      this.currentPlayer =
        this.currentPlayer === this.player1 ? this.player2 : this.player1;
    }

    return attackResult;
  }

  isGameOver() {
    return this.gameOver;
  }

  getWinner() {
    return this.winner;
  }
}
