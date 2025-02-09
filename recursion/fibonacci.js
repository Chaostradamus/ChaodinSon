function fib(n) {
  if (n <= 0) return [];
  if (n == 1) return [0];

  let sequence = [0, 1];
  for (let i = 2; i < n; i++) {
    sequence.push(sequence[i - 1] + sequence[i - 2]);
  }
  return sequence;
}

function fibsRec(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];
  if (n === 2) return [0, 1];

  let sequence = fibsRec(n - 1); // Get the sequence up to (n-1)
  sequence.push(sequence[sequence.length - 1] + sequence[sequence.length - 2]); // Add next Fibonacci number

  console.log(`Returning from fibsRec(${n}):`, sequence); // Log the current sequence

  return sequence;
}

// Test case
console.log(fibsRec(5));


console.log(fib(6))
