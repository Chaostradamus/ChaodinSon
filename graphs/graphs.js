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

  const queue = [[start]];
  const visited = new Set();
  visited.add(start.toString());

  while (queue.length > 0) {
    const path = queue.shift();
    const [x, y] = path[path.length - 1];

    if (x === target[0] && y === target[1]) {
      console.log(`you made it in ${path.length - 1} moves! heres your path:`);
      path.forEach((pos) => console.log(pos));
      return path;
    }

    for (let [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;

      if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
        const newPosition = [newX, newY];
        if (!visited.has(newPosition.toString())) {
          visited.add(newPosition.toString());
          queue.push[(path.at.apply.path, newPosition)];
        }
      }
    }
  }
}
knightMoves([0, 0], [3, 3]);
