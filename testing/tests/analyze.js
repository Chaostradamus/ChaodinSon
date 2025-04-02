function analyzeArray(arr) {
  return {
    average: arr.reduce((sum, num) => sum + num, 0) / arr.length,
    min: Math.min(...arr),
    max: Math.max(...arr),
    length: arr.length,
  };
}

module.exports = analyzeArray