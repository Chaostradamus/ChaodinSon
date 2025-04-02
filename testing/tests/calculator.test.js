const Calculator = require("./calculator");

describe("calculator class testing", () => {
  let calc;
  beforeEach(() => {
    calc = new Calculator();
  });
  test("adds to digits", () => {
    expect(calc.add(6, 6)).toBe(12);
    expect(calc.add(24, 0)).toBe(24);
  });
  test("subtraction", () => {
    expect(calc.sub(6, 6)).toBe(0);
    expect(calc.sub(24, 0)).toBe(24);
  });
  test("multi", () => {
    expect(calc.multiplication(6, 6)).toBe(36);
    expect(calc.multiplication(24, 0)).toBe(0);
  });
  test("division", () => {
    expect(calc.divide(6, 6)).toBe(1);
    expect(calc.divide(24, 0)).toBe("come on bro");
  });
});
