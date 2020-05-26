const calculateTarget = require('./calculate-target');

/**
 * Estimate the number of processes required to keep up with the current demand.
 *
 * @param {number} demand
 * @param {number} opts.concurrency the number of concurrent jobs the worker processes.
 * @param {number} opts.deadline the time practically all jobs should be completed within.
 * @param {number} opts.meanProcessTime mean job processing time.
 * @param {number} opts.requiredCompletionPercentile percentile of jobs that should happen within
 *   the deadline.
 * @param {number} opts.stddev standard deviation (1σ) of job processing time: 68% completed
 *   within ± this (defaults to half the meanProcessTime).
 * @param {number} opts.target the number of seconds within which the desired % of tasks will
 *   complete. This will be calculated using other opts if not provided.
 * @return {number}
 */
function getCount (demand, opts = {}) {
  const {
    concurrency = 1,
    meanProcessTime = 10,
    target = calculateTarget(opts)
  } = opts;
  const waitingTime = Math.ceil(demand / concurrency) * meanProcessTime;
  const availableTime = Math.max(meanProcessTime, target - meanProcessTime);
  return Math.ceil(waitingTime / availableTime);
}

module.exports = getCount;
