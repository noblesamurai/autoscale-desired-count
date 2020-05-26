const expect = require('chai').expect;
const calculateTarget = require('../src/calculate-target');

describe('calculate target', function () {
  it('should calculate a target value', function () {
    const deadline = 60;
    const requiredCompletionPercentile = 99;
    const meanProcessTime = 10;
    const stddev = 10;
    const opts = { deadline, requiredCompletionPercentile, meanProcessTime, stddev };
    expect(calculateTarget(opts)).to.be.closeTo(36.7365, 1e-4);
  });

  it('should calculate a target using a default stddev', function () {
    const deadline = 60;
    const requiredCompletionPercentile = 99;
    const meanProcessTime = 10;
    const opts = { deadline, requiredCompletionPercentile, meanProcessTime };
    expect(calculateTarget(opts)).to.be.closeTo(48.3683, 1e-4);
  });
});
