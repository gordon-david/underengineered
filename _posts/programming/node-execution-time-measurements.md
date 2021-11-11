---
title: "Measuring Execution Time of Javascript Functions"
excerpt: "Various usage examples of the Performance APIs available to Node and Browser environments"
author: "David Gordon"
date: "2021-10-18"
tags: ["node", "javascript"]
---

**Resources:**
- [Web Performance API W3C Draft](https://w3c.github.io/perf-timing-primer/)
- [Node Documentation on the 'perf_hooks' package](https://nodejs.org/docs/latest/api/perf_hooks.html)
- [MDN Documentation on the Performance interface](https://developer.mozilla.org/en-US/docs/Web/API/Performance)

Execution time measurement can be done in both Node.js and Web Browser environments. In Node.js it is required that you import the various performance APIs from the `perf_hooks` for use in your process. In browser environments the performance interfaces can be found under the global `window` object (depending on your browser's implementation, check your browser's documentation for details).

### Node ES6 Imports

```javascript
import {performance, PerformanceObserver} from 'perf_hooks'
```

### Browser Example Usage

```javascript
const performance = window.performance
const PerformanceObserver = window.PerformanceObserver
```

### The Performance Package

The Performance package exposes a high level api for interacting with robust performance measurement tools. These tools can range from simple timestamps to a configurable timeline of marked events.

### Performance API Overview

- `performance.now` : returns a Number timestamp in milliseconds of the running time of the current process.
- `performance.mark` : creates a PerformanceMark entry in the Performance Timeline.
- `PerformanceMark` : a subtype of `PerformanceEntry` with the `entryType` set to `mark`, this represents a generic mark on a timeline for measurement purposes and can be referenced by a call to `performance.measure`.
- `performance.measure(name[, startMark[, endMark]])` : emits a measurement event to the Performance Timeline. This is a subclass of PerformanceEntry where the entry is always set to 'measure', and whose duration is the number of milliseconds from `startMark` to `endMark`.
- `PerformanceObserver` : an observer of performance timeline entries, it's callback is invoked when specified entryTypes it is observing are entered into the timeline. It's constructor takes an options argument for specifying the entryType it should observe.
  
### Simple Timestamp Based Measurement

```javascript
import { performance } from 'perf_hooks'

const a = performance.now()
my_long_running_function()
const b = performance.now()

console.log("My function took ", b-a, " milliseconds to complete.")
```

### Using The Performance Timeline, Marks, and PerformanceObserver

```javascript
import { performance, PerformanceObserver } from 'perf_hooks'


const markNames = {
  beginProcess: "BEGIN_PROCESS",
  endProcess: "END_PROCESS",
}

const observer = new PerformanceObserver( items => {
  items.forEach(item => console.log(item.duration))
  performance.clearMarks()
})

observer.observe({ entryTypes: ['measure'] })

// place a mark in the timeline
performance.mark(markNames.beginProcess) 

// perform your process to be measured
my_long_running_function() 

// place another mark in the timeline
performance.mark(markNames.endProcess) 

// perform a measurement, emitting an 
// event to any PerformanceObservers
// that might be observing the 
// 'measure' entryType
performance.measure(
  'begin to end',
  markNames.beginProcess,
  markNames.endProcess
) 

// observers should be disconnected
observer.disconnect() 
```