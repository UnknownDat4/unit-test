const test = require('node:test');
const assert = require('node:assert');
const {tiMonth} = require("../calculators/environment")
const {calculateCircleArea} = require('/workspaces/unit-test/calculators/circle.js')


test('should calculate circle area', () => {
  const result = calculateCircleArea(5)  
  assert.strictEqual(result, 78.539816339744830961566084581988.toFixed(3) , 'Did not pass the test')
})