import Ship from "../ship";

test("create a ship with length", () => {
  const ship = Ship(3);
  expect(Ship.length).toBe(3);
});

test("registers a hit", () => {
  const ship = Ship(3);
  ship.hit();
  expect(shit.hit).toBe(1);
});

test("knows when ship is sunk", () => {
  const ship = Ship(2);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
