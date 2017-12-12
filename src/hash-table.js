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
    const index = getIndexBelowMax(key.toString(), this.limit);
    const bucket = this.storage.get(index);
  }

  remove(key) {
    const removalBucket = getIndexBelowMax(key.toString(), this.limit);
    return this.storage.set(removalBucket, undefined);
  }

  retrieve(key) {
    const valueBucket = getIndexBelowMax(key.toString(), this.limit);
    if (this.storage.get(valueBucket) === undefined) return undefined;
    return this.storage.get(valueBucket)[1];
  }
}

module.exports = HashTable;
