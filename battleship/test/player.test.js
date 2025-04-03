import Player from "../src/player";
import Gameboard from "../src/gameboard";

describe("Player", () => {
  let player;
  let enemyGameboard;

  beforeEach(() => {
    enemyGameboard = new Gameboard();
    player = new Player("Player 1", enemyGameboard);
  });

  test("creates a player with a name", () => {
    expect(player.name).toBe("Player 1");
  });

  test("can attack enemy gameboard", () => {
    player.attack(0, 0);
    expect(enemyGameboard.missedAttacks).toContainEqual([0, 0]);
  });

  describe("Computer Player", () => {
    let computer;

    beforeEach(() => {
      computer = new Player("Computer", enemyGameboard, true);
    });

    test("computer can make random attacks", () => {
      const attack = computer.makeRandomAttack();
      expect(attack).toHaveProperty("x");
      expect(attack).toHaveProperty("y");
      expect(attack.x).toBeGreaterThanOrEqual(0);
      expect(attack.x).toBeLessThan(10);
      expect(attack.y).toBeGreaterThanOrEqual(0);
      expect(attack.y).toBeLessThan(10);
    });

    test("computer does not repeat attacks", () => {
      const attacks = new Set();

      // Make all possible attacks (100)
      for (let i = 0; i < 100; i++) {
        const attack = computer.makeRandomAttack();
        const attackKey = `${attack.x},${attack.y}`;
        expect(attacks.has(attackKey)).toBe(false);
        attacks.add(attackKey);
      }

      // After all positions are attacked, should return null
      expect(computer.makeRandomAttack()).toBeNull();
    });
  });
});
