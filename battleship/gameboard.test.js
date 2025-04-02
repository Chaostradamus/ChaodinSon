import Gameboard from "./gameboard";
import Ship from "./Ship";

test("Places a ship at specific coordinates", () => {
  const board = new Gameboard();
  const ship = new Ship(3);
  board.placeShip(ship, [0, 0], "horizontal");

  expect(board.grid[0][0]).toBe(ship);
  expect(board.grid[0][1]).toBe(ship);
  expect(board.grid[0][2]).toBe(ship);
});

test("Records a hit when a ship is attacked", () => {
  const board = new Gameboard();
  const ship = new Ship(3);
  board.placeShip(ship, [0, 0], "horizontal");

  board.receiveAttack([0, 1]);

  expect(ship.hits).toBe(1);
});

test("Records a miss when an attack does not hit a ship", () => {
  const board = new Gameboard();
  board.receiveAttack([2, 2]);

  expect(board.missedShots).toContainEqual([2, 2]);
});

test("Reports when all ships are sunk", () => {
  const board = new Gameboard();
  const ship1 = new Ship(2);
  const ship2 = new Ship(3);

  board.placeShip(ship1, [0, 0], "horizontal");
  board.placeShip(ship2, [1, 0], "horizontal");

  board.receiveAttack([0, 0]);
  board.receiveAttack([0, 1]); // Sinks ship1
  board.receiveAttack([1, 0]);
  board.receiveAttack([1, 1]);
  board.receiveAttack([1, 2]); // Sinks ship2

  expect(board.allShipsSunk()).toBe(true);
});
