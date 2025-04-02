export class Calculator {
  add(a, b) {
    return a + b;
  }

  sub(a, b) {
    return a - b;
  }

  multiplication(a, b) {
    return a * b;
  }

  divide(a, b) {
    if (b === 0) return "come on bro";
    return a / b;
  }
}

module.exports = Calculator