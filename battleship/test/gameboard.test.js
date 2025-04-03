import Gameboard from "../src/gameboard";
import Ship from "../src/ship";

describe("Gameboard", () => {
  let gameboard;
  let ship;

  beforeEach(() => {
    gameboard = new Gameboard();
    ship = new Ship(3);
  });

  test("places ship at specific coordinates horizontally", () => {
    gameboard.placeShip(ship, 2, 3, "horizontal");
    expect(gameboard.ships[0]).toEqual({
      ship,
      positions: [
        [2, 3],
        [2, 4],
        [2, 5],
      ],
    });
  });

  test("places ship at specific coordinates vertically", () => {
    gameboard.placeShip(ship, 2, 3, "vertical");
    expect(gameboard.ships[0]).toEqual({
      ship,
      positions: [
        [2, 3],
        [3, 3],
        [4, 3],
      ],
    });
  });

  test("throws error when placing ship out of bounds", () => {
    expect(() => gameboard.placeShip(ship, 8, 8, "horizontal")).toThrow(
      "Ship out of bounds"
    );
  });

  test("records missed attacks", () => {
    gameboard.receiveAttack(0, 0);
    expect(gameboard.missedAttacks).toContainEqual([0, 0]);
  });

  test("records hits on ships", () => {
    gameboard.placeShip(ship, 2, 3, "horizontal");
    gameboard.receiveAttack(2, 3);
    expect(ship.hits).toBe(1);
    expect(gameboard.missedAttacks).not.toContainEqual([2, 3]);
  });

  test("does not allow attacking the same spot twice", () => {
    gameboard.receiveAttack(0, 0);
    expect(() => gameboard.receiveAttack(0, 0)).toThrow(
      "Already attacked this position"
    );
  });

  test("reports when all ships are sunk", () => {
    const smallShip = new Ship(1);
    gameboard.placeShip(smallShip, 0, 0, "horizontal");
    expect(gameboard.allShipsSunk()).toBe(false);
    gameboard.receiveAttack(0, 0);
    expect(gameboard.allShipsSunk()).toBe(true);
  });

  test("does not allow overlapping ship placement", () => {
    gameboard.placeShip(ship, 2, 3, "horizontal");
    const anotherShip = new Ship(2);
    expect(() => gameboard.placeShip(anotherShip, 2, 4, "vertical")).toThrow(
      "Position already occupied by another ship"
    );
  });
});
