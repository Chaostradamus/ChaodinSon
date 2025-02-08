function fib(n) {
  if (n <= 0) return [];
  if (n == 1) return [0];

  let sequence = [0, 1];
  for (let i = 2; i < n; i++) {
    sequence.push(sequence[i - 1] + seuqnce[i - 2]);
  }
  return sequence;
}

function fibRecursion() {}

console.log(fib(6))
