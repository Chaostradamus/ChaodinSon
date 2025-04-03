import Game from "../src/game";
import Player from "../src/player";
import Gameboard from "../src/gameboard";
import Ship from "../src/ship";

describe("Game", () => {
  let game;
  let player1;
  let player2;
  let player1Gameboard;
  let player2Gameboard;

  beforeEach(() => {
    player1Gameboard = new Gameboard();
    player2Gameboard = new Gameboard();

    // Place some ships for testing
    const ship1 = new Ship(3);
    const ship2 = new Ship(3);
    player1Gameboard.placeShip(ship1, 0, 0, "horizontal");
    player2Gameboard.placeShip(ship2, 0, 0, "horizontal");

    player1 = new Player("Player 1", player2Gameboard);
    player2 = new Player("Computer", player1Gameboard, true);
    game = new Game(player1, player2);
  });

  test("creates a game with two players", () => {
    expect(game.player1).toBe(player1);
    expect(game.player2).toBe(player2);
    expect(game.currentPlayer).toBe(player1);
  });

  test("switches turns after a player attacks", () => {
    game.playTurn(0, 0);
    expect(game.currentPlayer).toBe(player2);
  });

  test("computer makes a random attack when it's their turn", () => {
    game.playTurn(0, 0); // Player 1's turn
    const computerAttack = game.playTurn(); // Computer's turn
    expect(computerAttack).toHaveProperty("x");
    expect(computerAttack).toHaveProperty("y");
    expect(game.currentPlayer).toBe(player1);
  });

  test("game ends when all ships of a player are sunk", () => {
    // Create new game with single-square ships for this specific test
    const testGameboard1 = new Gameboard();
    const testGameboard2 = new Gameboard();
    const testPlayer1 = new Player("Test Player 1", testGameboard2);
    const testPlayer2 = new Player("Test Computer", testGameboard1, true);
    const testGame = new Game(testPlayer1, testPlayer2);

    const ship1 = new Ship(1);
    const ship2 = new Ship(1);
    testGameboard1.placeShip(ship1, 0, 0, "horizontal");
    testGameboard2.placeShip(ship2, 0, 0, "horizontal");

    // Player 1 sinks computer's ship
    testGame.playTurn(0, 0);
    expect(testGame.isGameOver()).toBe(true);
    expect(testGame.getWinner()).toBe(testPlayer1);
  });

  test("game continues when not all ships are sunk", () => {
    // Using the ships already placed in beforeEach
    game.playTurn(0, 0); // Player 1 hits
    expect(game.isGameOver()).toBe(false);

    game.playTurn(); // Computer's turn (random)
    expect(game.isGameOver()).toBe(false);
  });
});
