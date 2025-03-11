function knightMoves(start, target) {
  const directions = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
  ];

  const queue = [[start]]; // Start with the initial position inside a path
  const visited = new Set();
  visited.add(start.toString());

  while (queue.length > 0) {
    const path = queue.shift(); // Get the first path from the queue
    const [x, y] = path[path.length - 1]; // Extract the last position in path

    if (x === target[0] && y === target[1]) {
      console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
      path.forEach((pos) => console.log(pos));
      return path; // Return the shortest path
    }

    for (let [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;

      if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
        // Check within board
        const newPosition = [newX, newY];
        if (!visited.has(newPosition.toString())) {
          // Avoid revisiting
          visited.add(newPosition.toString()); // Mark as visited
          queue.push([...path, newPosition]); // Add new path to the queue
        }
      }
    }
  }
}

// Example usage
knightMoves([0, 0], [3, 3]);
