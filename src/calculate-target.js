const gaussian = require('gaussian');

/**
 * Calculate the number of seconds within which the desired % of tasks will complete.
 *
 * @param {number} opts.deadline the time practically all jobs should be completed within.
 * @param {number} opts.meanProcessTime mean job processing time.
 * @param {number} opts.requiredCompletionPercentile percentile of jobs that should happen within
 *   the deadline.
 * @param {number} opts.stddev standard deviation (1σ) of job processing time: 68% completed
 *   within ± this (defaults to half the meanProcessTime).
 * @return {number}
 */
function calculateTarget (opts = {}) {
  const {
    deadline = 60,
    requiredCompletionPercentile = 99,
    meanProcessTime = 10,
    stddev = meanProcessTime / 2
  } = opts;
  const tolerance = (100 - requiredCompletionPercentile) / 100;

  // Default stddev to 50% of the processing time
  const variance = stddev ** 2;
  const distribution = gaussian(meanProcessTime, variance);
  const distance = meanProcessTime - distribution.ppf(tolerance);

  // Adjust the deadline by the amount you need to allow in order
  // for the required % of jobs to complete within that time.
  return deadline - distance;
}

module.exports = calculateTarget;
