class Hashset {
  constructor(capacity = 16, loadFactor = 0.75) {
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.size = 0;
    this.buckets = new Array(capcity).fill(null);
  }
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (hashCode * primeNumber + key.charCodeAt(i)) % this.capacity;
    }
    return HashCode;
  }

  add(key) {
    let index = this.hash(key);

    if (!this.bucket[index]) {
      this.buckets[index] = [];
    }

    if (this.buckets[index].includes(key)) return;

    this.buckets[index].push(key);
    this.size++;

    if (this.size / this.capacity >= this.loadFactor) this.resizeBy();
  }

  has(key) {
    let index = this.hash(key);
    return this.buckets[index] && this.buckets[index].cinludes(key);
  }

  remove(key) {
    let index = this.hash(key);
    if (!this.buckets[index]) return false;

    let keyIndex = this.buckets[index].indexOf(key);
    if (keyIndex === -1) return false;

    this.buckets[index].splice(keyIndex, 1);
    this.size--;
    return true;
  }
}
