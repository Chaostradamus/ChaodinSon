import Ship from "./ship";

test("create a ship with length", () => {
  const ship =  new Ship(3);
  expect(ship.length).toBe(3);
});

test("registers a hit", () => {
  const ship = new Ship(3);
  ship.hit();
  expect(ship.hits).toBe(1);
});

test("knows when ship is sunk", () => {
  const ship = new Ship(2);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
