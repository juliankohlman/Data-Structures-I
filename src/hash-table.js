/* eslint-disable no-unused-lets */
/* eslint-disable class-methods-use-this */
const { LimitedArray, getIndexBelowMax } = require('./hash-table-helpers');

class HashTable {
  constructor(limit = 8) {
    this.limit = limit;
    this.storage = new LimitedArray(this.limit);
    // Do not modify anything inside of the constructor
  }

  insert(key, value) {
    const insertAt = getIndexBelowMax(key, this.limit);
    // console.log(insertAt);
    // this.storage.set(insertAt, [key, value]);
    // console.log(this.storage.get(insertAt));
    const alreadyExists = this.storage.get(insertAt) === undefined;
    console.log(alreadyExists);
    if (alreadyExists) {
      // this.storage.set(insertAt, [key, value]);
      this.storage.set(insertAt, [key, value]);
    }
    // if (this.storage[insertAt] === undefined) {
    if (!alreadyExists) {
      // this.storage[insertAt] = [[key, value]];
      this.storage.set(insertAt, [key, value]);
    }
    // console.log(this.storage.get(insertAt));
  }

  remove(key) {
    // const keyIndex = getIndexBelowMax(key, this.limit);
    // const pairExists = this.storage.set(keyIndex, undefined);
    // console.log(pairExists);
    // if (pairExists === undefined) return pairExists;
    const removalBucket = getIndexBelowMax(key, this.limit);
    console.log(this.storage.get(removalBucket));
    return this.storage.set(removalBucket, undefined);
  }

  retrieve(key) {
    // const findIndex = getIndexBelowMax(key, this.limit);
    // return this.storage.get(findIndex)[1];
    const valueBucket = getIndexBelowMax(key, this.limit);
    // console.log(this.storage.get(valueBucket));
    if (this.storage.get(valueBucket) === undefined) return undefined;
    // console.log(this.storage.get(valueBucket)[1]);
    return this.storage.get(valueBucket)[1];
  }
}

module.exports = HashTable;
