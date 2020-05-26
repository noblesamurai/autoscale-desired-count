const expect = require('chai').expect;
const getCount = require('..');

describe('index', function () {
  it('should estimate the number of required processes', function () {
    const concurrency = 5;
    const meanProcessTime = 10;
    const target = 50;
    const opts = { concurrency, meanProcessTime, target };
    const estimate = getCount(300, opts);
    // ((300 / 5) * 10) / (50 - 10) = 15
    expect(estimate).to.equal(15);
  });
});
