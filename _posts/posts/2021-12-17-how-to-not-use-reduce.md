---
layout: page
title: How to not use `reduce` in javascript functional programming
comments: true
category: post
---

Reduce is a very useful utility in functional programming often wrong used.
There are two anti-patterns I usually see when reviewing code:

## Anti-pattern 1: Not using a pure function.

Just use a pure function when working with any high order function (map/filter/reduce/etc).

A function is considered pure if:

1. does not read variables from the outer scope, it only uses variables from its own scope.

   ```javascript
   const c = 1;

   function add_pure(a, b, c) {
     return a + b + c; // reads c from OWN scope
   }
   add_pure(1, 2, c); // passes c as a parameter

   function add_not_pure(a, b) {
     return a + b + c; // reads c from the OUTER scope
   }
   add_not_pure(1, 2);
   ```

2. does not modify variables outside of its own scope. Doing so is called a having a **side effect**.

   ```javascript
   let c = 1;

   function add_pure(a, b) {
     let c = a + b; // creates a new variable c in the function scope
     return c;
   }
   add_pure(1, 2); // returns 3

   function add_not_pure(a, b) {
     c = a + b; // modifies the variable c in the outer scope
     return c;
   }
   add_not_pure(1, 2);
   ```

## Anti-pattern 2: Using reduce when there is another more specific utility.

Essentialy any other high order function can be implemented using reduce.

If you are doing a `reduce` and not actually "accumulating" a result, then try to refactor the code to use a more specific function.

Example `reduce` that is not actually accumulating a result / Implementation of the other high order functions as reduce.

```javascript
const map = (arr, fn) =>
  arr.reduce((acc, val) => {
    acc.push(fn(val));
    return acc;
  }, []);

const filter = (arr, fn) =>
  arr.reduce((acc, val) => {
    if (fn(val)) acc.push(val);
    return acc;
  }, []);

const find = (arr, fn) =>
  arr.reduce((acc, val) => {
    if (acc) return acc;
    if (fn(val)) return val;
  }, undefined);

const findIndex = (arr, fn) =>
  arr.reduce((acc, val, index) => {
    if (acc !== -1) return acc;
    if (fn(val)) return index;
    return acc;
  }, -1);

const fill = (arr, fromIndex, newValue) =>
  arr.reduce((acc, val, index) => {
    if (index >= fromIndex) acc.push(newValue);
    else acc.push(val);
    return acc;
  }, []);

const copyWithin = (arr, target, start, end) =>
  arr.reduce((acc, val, index) => {
    if (index >= (start || 0) && index < (end || arr.length))
      acc[target + index - start] = val;
    else acc.push(val);
    return acc;
  }, []);

const some = (arr, fn) =>
  arr.reduce((acc, val) => {
    if (acc) return true;
    if (fn(val)) return true;
    return acc;
  }, false);

const every = (arr, fn) =>
  arr.reduce((acc, val) => {
    if (!acc) return false;
    if (!fn(val)) return false;
    return acc;
  }, true);
```
