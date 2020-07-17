---
title: How to toggle an item in a javascript array
date: "2020-07-01T22:12:03.284Z"
description: "Quickly add/remove an item depending on wether it's already in the array or not."
---

## TL;DR

### The function

```jsx
const removeAtIndex = (arr, index) => {
  const copy = [...arr];
  copy.splice(index, 1);
  return copy;
};

const toggle = (arr, item, compare = (a, b) => a === b) => {
  const index = arr.findIndex(i => compare(i, item));
  if (index === -1) return [...arr, item];
  return removeAtIndex(arr, index);
};
```

### Usage

```jsx
let arr = [1, 2, 3];

arr = toggle(arr, 2);
console.log(arr); // [1, 3];

arr = toggle(arr, 4);
console.log(arr); // [1, 3, 4];
```

Read below for explanations or just for some pointless (or not) brain-picking.

## Let's get toggling

Let's go through the basic idea of the function by sketching it out.

So the idea here is having a function called `toggle` that we can call to redefine our array variable.

![Schema](./schema.png)

The caller would be whatever piece of code holds your array to begin with. In this piece of code, you want a certain item matching a condition toggled in your array. Basically, if the item is found in the array, it is removed; if it's not found, it's added instead.

We would call it like this:

```jsx
let arr = [1, 2, 3];

arr = toggle(arr, 3); // [1, 2];
arr = toggle(arr, 2); // [1, 2, 3];
```

Basic right? Let's go through a primary version of the `toggle` function in javascript.

```jsx
const toggle = (arr, item) => {
  if (arr.includes(item)) return remove(arr, item);
  else return add(arr, item);
};
```

Pretty simple. What about the `add` and `remove` functions though?

## Adding an item

Adding an item to an array is a piece of cake. Since we use functional programming here and don't want the original array to be altered, let's just return the deconstructed array with the item added to the end of it.

```jsx
return [...arr, item];
```

## Removing an item

Removing an item is a little more complex, but let's keep it simple here using filter.

```jsx
const toggle = (arr, item) => {
  if (arr.includes(item)) return arr.filter(i => i !== item);
  else return [...arr, item];
};
```

## When dealing with objects

One problem that might come up using this implementation is when using an array of objects. Sometimes you might only want to remove the object with a certain `id` for example, regardless of the value of its other fields.

To fix this, we'll give an optional `compare` callback function. This callback will return `true` when the objects compared match whatever condition we give it, and `false` otherwise. Since it's optional, we'll give a default value of a simple `===` comparison of the whole value.

```jsx
const toggle = (arr, item, compare = (a, b) => a === b) => {
	if (arr.some(i => compare(i, item)) return arr.filter(i => !compare(i, item));
	else return [...arr, item];
}
```

We could now call it like this to compare only the `id` of objects:

```jsx
const object1 = { id: 2, name: "Hello" };
const object2 = { id: 3, name: "Hi" };
let arr = [object1, object2];

arr = toggle(arr, object1, (a, b) => a.id === b.id);
console.log(arr); // [{ id: 3, name: "Hi" }]
```

For simpler arrays, we could call it without providing the callback:

```jsx
let arr = [1, 2, 3];

arr = toggle(arr, 2);
console.log(arr); // [1, 3];
```

## Improve performance

The above works, although you might have noticed that we call the `compare` function twice. That means we loop throught **all** (or almost all) the values of the array twice. This could get ugly on huge arrays. We could reorder this to only loop through the array once.

```jsx
const toggle = (arr, item, compare = (a, b) => a === b) => {
  const filtered = arr.filter(i => !compare(i, item));
  if (arr.length === filtered.length) {
    // The array was not filtered, so the item was not present
    return [...arr, item];
  } else {
    // The array was filtered, so the item was present
    return filtered;
  }
};
```

Let's clean it up a little.

```jsx
const toggle = (arr, item, compare = (a, b) => a === b) => {
  const filtered = arr.filter(compare);
  return arr.length === filtered.length ? [...arr, item] : filtered;
};
```

## A side effect to note

One side effect of using the `filter` function to remove an item is that it doesn't stop at the first found item that matches the condition given. If the condition given is too permissive, more than one item could be removed.

This could be seen as a benefit. For example, you could have various items with an `id` of `2` in an array, and want to toggle that, so either remove them all or add one.

Most of the time though, you don't want that because it could lead to some unwanted item removals.

To address this, you might want to use the `splice` function instead to remove the item.

```jsx
const removeAtIndex = (arr, index) => {
  const copy = [...arr];
  copy.splice(index, 1);
  return copy;
};

const toggle = (arr, item, compare = (a, b) => a === b) => {
  const index = arr.findIndex(i => compare(i, item));
  if (index === -1) return [...arr, item];
  return removeAtIndex(arr, index);
};
```

The `findIndex` function will stop at the first element matching the condition given, so it had the side benefit of not looping through the whole array unless the item is at the last index, or simply not found.

Then, with the index, we can use the `splice` function to remove the item from the array.

The reason we create a copy on the array is to avoid mutation. In other words, it is to avoid altering the original array given to the `toggle` function.
