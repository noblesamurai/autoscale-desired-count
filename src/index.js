const calculateTarget = require('./calculate-target');

/**
 * Estimate the number of processes required to keep up with the current demand.
 *
 * @example <caption>Get the number of workers required to process 500 jobs within 1 minute given
 * each job takes about 10 seconds to run and each worker only runs a single job at a time</caption>
 * ```js
 * const getAutoscaleDesiredCount = require('autoscale-desired-count');
 *
 * const opts = {
 *   concurrency: 1,
 *   deadline: 60,
 *   meanProcessTime: 10
 * };
 *
 * const jobs = 500;
 * const count = getAutoscaleDesiredCount(jobs, opts);
 * ```
 *
 * @kind function
 * @name getAutoscaleDesiredCount
 * @param {number} demand the number of jobs that need to be run
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
