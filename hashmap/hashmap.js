class Hashmap {
  constructor(initialCapacity = 16, loadFactor = 0.75) {
    this.capacity = initialCapacity;
    this.loadFactor = loadFactor;
    this.size = 0;
    this.buckets = new Array(this.capacity).fill(null);
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    let index = this.hash(key);

    if (!this.buckets[index]) {
      this.buckets[index] = [];
    }

    for (let i = 0; i < this.buckets[index].length; i++) {
      if (this.buckets[index][i][0] === key) {
        this.buckets[index][i][1] = value;
        return;
      }
    }

    this.buckets[index].push([key, value]);
    this.size++;

    if (this.size / this.capacity >= this.loadFactor) {
      this.resize();
    }
  }

  get(key) {
    let index = this.hash(key);

    if (!this.buckets[index]) return null;

    for (let pair of this.buckets[index]) {
      if (pair[0] === key) {
        return pair[1];
      }
    }

    return null;
  }

  has(key) {
    return this.get(key) !== null;
  }

  remove(key) {
    let index = this.hash(key);

    if (!this.buckets[index]) return false;

    for (let i = 0; i < this.buckets[index].length; i++) {
      if (this.buckets[index][i][0] === key) {
        this.buckets[index].splice(i, 1);
        this.size--;
        return true;
      }
    }
    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = new Array(this.capacity).fill(null);
    this.size = 0;
  }

  keys() {
    let keyArray = [];

    for (let bucket of this.buckets) {
      if (bucket) {
        for (let pair of bucket) {
          keyArray.push(pair[0]);
        }
      }
    }
    return keyArray;
  }

  keys() {
    let valArray = [];

    for (let bucket of this.buckets) {
      if (bucket) {
        for (let pair of bucket) {
          valArray.push(pair[1]);
        }
      }
    }
    return valArray;
  }

  entries() {
    let entryArray = [];

    for (let bucket of this.buckets) {
      if (bucket) {
        for (let pair of bucket) {
          entryArray.push(pair);
        }
      }
    }
    return entryArray;
  }

  resize() {
    let oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity);
    this.size = 0;

    for (let bucket of oldBuckets) {
      if (bucket) {
        for (let pair of bucket) {
          this.set(pair[0], pair[1]);
        }
      }
    }
  }
}
