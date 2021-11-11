---
title: Javascript
---

## Promises

[documentation - Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Eventual **completion** or **failure** of an asyncronous **operation** and its resulting **value**.

**States**:
- *Pending:* initial state, neither fullfilled nor rejected
- *Fulfilled:* operation completed successfully
- *Rejected:* operation failed

```javascript
let myPromise = new Promise(
    (resolve_callonsuccess,
    reject_callonfailure) => {/*operation*/})

myPromise
    .then(
        (val_passedintoresolve) =>
            {/*after promise resolve, 
            given value passed into resolve*/
    })
```
`then(val_passed_to_resolve)`
`finally(callback_fn)`
`catch(error_thrown)`

### Promises and Async Await

`async function myFn(){}` -> This function returns a promise
`myFn().then(val => //consume value in this scope)`
`async function myFm(){ var val = await fetch()}` -> await blocks a functional scope until an asyncronous functions promise is resolved, it's value is returned to the awaiting scope.

**Re-writing a Promise handler with Async/Await**

``` javascript
fetch("/resource")
    .then(response => {})
    .then(blob => {})
    .catch(error => {})
```

``` javascript
async function wrappingFn(){
    const response = await fetch("resource")
    const blob = await response.blob()
}

wrappingFn().catch(error => {})
```

## Concurrency Model/JS Event Loop

**Stack**: function calls form a stack, as in any other programming language
**Heap**: objects allocated in a heap, large (mostly unstructured) region of memory.
**Queue**: Message Queue in the JS runtime. Queue of messages to be processed. Each message has an associated function that is called as a message handler.
**Event Loop**: Message is processed, adding its function to the stack and processed until completion/stack is empty before moving to the next message. Message queuing may be oldest to newest, but optimizations within each browser exist.
**Adding Messages**: whenever an "event" fires that has an associated "event listener".

Message processing is not "guaranteed" (i.e. setTimeout's second argument indicates a "minimum time" not an exact time for it's message processing). Depends on number of wating tasks on the queue.

## DOM Element Insertion

**Build a DOM 'sub-tree' as a DocumentFragment, then append to the live DOM**

``` js
var fragment = document.createDocumentFragment()
el = document.createElement('p')
el.innerText = 'appended'
fragment.appendChild(el)
div.appendchild(fragment)
```
