/*
  1. Add a constructor with a storage structure; there are multiple options you could use for this
  2. Add a size getter that returns the number of items the stack is storing
  3. Add a `push` method that accepts an item as input and adds it to the storage structure
  4. Add a `pop` method that removes the most recently-added item to the stack
*/
class Stack {
  constructor(dataStore, top) {
    this.dataStore = [];
    this.top = 0;
  }
  get size() {
    return this.dataStore.length;
  }
  push(element) {
    this.dataStore[this.top++] = element;
    // this.dataStore.push(element);
    // this.top += 1;
  }
  pop() {
    return this.dataStore[--this.top];
  }
  peek() {
    return this.dataStore[this.top - 1];
  }
  clear() {
    this.top = 0;
  }
}

module.exports = Stack;
