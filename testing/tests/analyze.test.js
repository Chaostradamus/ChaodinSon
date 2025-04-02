const analyzeArray = require('./analyze')

describe("analyzeArray!", () => {
  test("returns the correct average", () => {
    expect(analyzeArray([1, 8, 3, 4, 2, 6]).average).toBe(4);
  });
  test('returns max', () =>{
    expect(analyzeArray([1, 8, 3, 4, 2, 6]).max).toBe(8)
  })
  test('returns min', () =>{
    expect(analyzeArray([1, 8, 3, 4, 2, 6]).min).toBe(1)
  })
  test('returns max', () =>{
    expect(analyzeArray([1, 8, 3, 4, 2, 6]).length).toBe(6)
  })


});
