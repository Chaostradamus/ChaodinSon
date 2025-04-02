



const caesar = require("./caesar");

describe("caesar shifting homie", () => {
  test("shifts upper", () => {
    expect(caesar("ABC", 3)).toBe("DEF");
  });
  test("shifts lower", () => {
    expect(caesar("abc", 3)).toBe("def");
  });

  test("preserve casing", () => {
    expect(caesar("aBC", 3)).toBe('dEF');
  });
  test("leaves non abc", () => {
    expect(caesar("ab c!", 3)).toBe("de f!");
  });
  test("negative", () => {
    expect(caesar("def", -3)).toBe("abc");
  });
});
