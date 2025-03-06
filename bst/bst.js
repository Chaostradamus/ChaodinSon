class Node {
  constructor(data) {
    this.data = data;
    this.right = null;
    this.left = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree([...new Set(array)].sort((a, b) => a - b));
  }

  buildTree(array) {
    if (array.length === 0) return null;

    let mid = Math.floor(array.length / 2);
    let root = new Node(array[mid]);

    root.left = this.buildTree(array.slice(0, mid));
    root.right = this.buildTree(array.slice(mid + 1));

    return root;
  }
}
