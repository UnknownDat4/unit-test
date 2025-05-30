const {describe, it} = require('mocha');
const assert = require('node:assert');
const {calculateCircleArea} = require('/workspaces/unit-test/calculators/circle.js');
const {fuelEnergySelector} = require('/workspaces/unit-test/calculators/environment.js')


describe('circle test', () => {
  it('should calculate circle area', () => {
  const result = calculateCircleArea(5)  
  assert.strictEqual(result, 78.539816339744830961566084581988.toFixed(3) , 'Did not pass the test')
})
})


describe('fuel energy selector tests', () => {
  
  it('should return correct values for diesel', () => {
    const expectedDieselInfo = {
      fuel_price: 11795,
      fuel_energy: 40.7,
      emision_factor: 74.01
    };
    assert.deepStrictEqual(fuelEnergySelector('Diesel'), expectedDieselInfo);
  });
  
  it('should return correct values for gasoline', () => {
    const expectedGasolineInfo = {
      fuel_price: 16700,
      fuel_energy: 35.58,
      emision_factor: 69.25
    };
    assert.deepStrictEqual(fuelEnergySelector('Gasoline'), expectedGasolineInfo);
  });
  
  it('should not return an empty object for gasoline', () => {
    assert.notDeepEqual(fuelEnergySelector('Gasoline'), {});
  });
  
  it('should return correct values for LPG', () => {
    const expectedLPGInfo = {
      fuel_price: 9000,
      fuel_energy: 27.1,
      emision_factor: 63.1
    };
    assert.deepStrictEqual(fuelEnergySelector('LPG'), expectedLPGInfo);
  });

  it('should return undefined for unknown fuel type', () => {
    assert.strictEqual(fuelEnergySelector('UnknownFuel'), undefined);
  });
});
