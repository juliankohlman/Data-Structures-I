/* eslint-disable no-unused-lets */
/* eslint-disable class-methods-use-this */
const { LimitedArray, getIndexBelowMax } = require('./hash-table-helpers');

class HashTable {
  constructor(limit = 8) {
    this.limit = limit;
    this.storage = new LimitedArray(this.limit);
    // Do not modify anything inside of the constructor
  }

  checkCapacity() {
    let fullBuckets = 0;
    this.storage.each((bucket) => {
      if (bucket !== undefined) fullBuckets++;
    });
    return (fullBuckets / this.limit) >= 0.75;
  }

  resize() {
    // increase limit of limited array by factor of 2
    this.limit *= 2;
    // keep ref to old limited array
    const originalArray = this.storage;
    // create new limited array with double the size
    this.storage = new LimitedArray(this.limit);
    // put all the buckets from old array into new array
    originalArray.each((bucket) => {
      if (!bucket) return;
      bucket.forEach((pair) => {
        this.insert(pair[0], pair[1]);
      });
    });
  }

  insert(key, value) {
    // check capacity
    // if its true
    // call resize
    if (this.checkCapacity()) this.resize();
    const index = getIndexBelowMax(key.toString(), this.limit);
    const bucket = this.storage.get(index);

    if (bucket === undefined) {
      this.storage.set(index, [[key, value]]);
      return;
    }
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        this.storage.set(index, bucket);
        return;
      }
    }
    // turns out that the key we're trying to insert is unique
    // we can just add it to our bucket
    bucket.push([key, value]);
    this.storage.set(index, bucket);
  }

  remove(key) {
    const index = getIndexBelowMax(key.toString(), this.limit);
    const bucket = this.storage.get(index);
    // return this.storage.set(removalBucket, undefined);
    if (!bucket) return;
    if (bucket.length === 1) return this.storage.set(index, undefined);
    bucket.forEach((pair, i) => {
      if (pair[0] === key) bucket.splice(i, 1);
      this.storage.set(index, bucket);
    });
  }

  retrieve(key) {
    const index = getIndexBelowMax(key.toString(), this.limit);
    const bucket = this.storage.get(index);
    // if (this.storage.get(index) === undefined) return undefined;
    // return this.storage.get(index)[1];
    if (!bucket) return;
    for (let i = 0; i < bucket.length; i += 1) {
      if (bucket[i][0] === key) return bucket[i][1];
    }
  }
}

module.exports = HashTable;
