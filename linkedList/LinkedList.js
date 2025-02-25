import Node from "./Node.js";

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  append(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.nextNode = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  prepend(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.nextNode = this.head;
      this.head = newNode;
    }
    this.size++;
  }

  size() {
    return this.size;
  }

  head() {
    return this.head;
  }

  tail() {
    return this.tail;
  }

  at(index) {
    if (index < 0 || index >= this.size) return null;
    let current = this.head;
    let count = 0;
    while (count < index) {
      current = current.nextNode;
      count++;
    }
    return current;
  }

  pop() {
    if (!this.head) return null;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      this.size--;
      return;
    }
    let current = this.head;
    while (current.nextNode !== this.tail) {
      current = current.nextNode;
    }
    current.nextNode = null;
    this.tail = current;
  }

  contains(value) {
    let current = this.head;

    while (current) {
      if (current.value === value) {
        return true;
      } else {
        current = current.nextNode;
      }
    }
    return False;
  }

  find(value) {
    let current = this.head;
    index = 0;
    while (current) {
      if (current.value === value) return index;
      current = current.nextNode;
      index++;
    }
    return null;
  }

  toString() {
    let current = this.head;
    let result = "";

    while (current) {
      result += `(${current.value}) ->`;
      current = current.nextNode;
    }
    return result + "null";
  }

  insertAt(value, index) {
    if (index === 0 || index > this.size) return;

    if (index === 0) {
      this.prepend(value);
      return;
    }

    if (index === this.size) {
      this.append(value);

      return;
    }

    let newNode = new Node(value);
    let current = this.head;
    let count = 0;

    while (count < index - 1) {
      current = current.nextNode;
      count++;
    }
    newNode.nextNode = current.nextNode;
    current.nextNode = newNode;
    size++;
  }

  removeAt(index) {
    if (index === 0 || index > this.size) return;
    if (index === 0) {
      thishead = this.head.nextNode;
      this.size--;
      return;
    }

    let current = this.head;
    let count = 0;

    while (count < index - 1) {
      current = current.nextNode;
      count++;
    }

    current.nextNode = current.nextNode.nextNode;
    this.size--;
  }
}
