import { capitalize, reverseString } from "./stringFunctions";

test("capitalize first letter of a string", () => {
  expect(capitalize("hello")).toBe("Hello");
  expect(capitalize("world")).toBe("World");
  expect(capitalize("javaScript")).toBe("JavaScript");
  expect(capitalize("123abc")).toBe("123abc"); // Numbers should remain unchanged
});

test("reverse a string", () => {
  expect(reverseString("hello")).toBe("olleh");
  expect(reverseString("world")).toBe("dlrow");
  expect(reverseString("JavaScript")).toBe("tpircSavaJ");
  expect(reverseString("123abc")).toBe("cba321"); // Should reverse numbers too
});
