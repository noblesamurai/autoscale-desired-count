# autoscale-desired-count

> estimate the number of processes required to keep up with the current demand

## Prerequisites

```
$ pip install pre-commit
```

## Installation

This module is installed via npm:

```bash
$ pre-commit install --install-hooks
$ npm install autoscale-desired-count
```

## API

### getAutoscaleDesiredCount(demand) ⇒ <code>number</code>

Estimate the number of processes required to keep up with the current demand.

| Parameter                           | Type   | Description                                                                                                                          |
| :---------------------------------- | :----- | :----------------------------------------------------------------------------------------------------------------------------------- |
| `demand`                            | number | the number of jobs that need to be run                                                                                               |
| `opts.concurrency`                  | number | the number of concurrent jobs the worker processes.                                                                                  |
| `opts.deadline`                     | number | the time practically all jobs should be completed within.                                                                            |
| `opts.meanProcessTime`              | number | mean job processing time.                                                                                                            |
| `opts.requiredCompletionPercentile` | number | percentile of jobs that should happen within   the deadline.                                                                         |
| `opts.stddev`                       | number | standard deviation (1σ) of job processing time: 68% completed   within ± this (defaults to half the meanProcessTime).                |
| `opts.target`                       | number | the number of seconds within which the desired % of tasks will   complete. This will be calculated using other opts if not provided. |

#### Examples

_Get the number of workers required to process 500 jobs within 1 minute given
each job takes about 10 seconds to run and each worker only runs a single job at a time_

> ```js
> const getAutoscaleDesiredCount = require('autoscale-desired-count');
>
> const opts = {
>   concurrency: 1,
>   deadline: 60,
>   meanProcessTime: 10
> };
>
> const jobs = 500;
> const count = getAutoscaleDesiredCount(jobs, opts);
> ```

## License

The BSD License

Copyright (c) 2020, Andrew Harris

All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

- Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

- Redistributions in binary form must reproduce the above copyright notice, this
  list of conditions and the following disclaimer in the documentation and/or
  other materials provided with the distribution.

- Neither the name of the copyright holder nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
