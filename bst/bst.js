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

  insert(value) {
    this.root = this.insertNode(this.root, value);
  }

  insertNode(root, value) {
    if (root === null) return new Node(value);

    if (value < root.data) {
      root.left = this.insertNode(root.left, value);
    } else if (value > root.data) {
      root.right = this.insertNode(root.right, value);
    }

    return root;
  }
  delete(value) {
    this.root = deleteNode(this.root, value);
  }
  deleteNode(root, value) {
    if (!root) return null;

    if (value < root.data) {
      root.left = deleteNode(root.right, value);
    } else if (value > root.data) {
      root.right = deleteNode(root.left, value);
    } else {
      if (!root.left && !root.right) {
        return null;
      }
      if (!root.left) return root.right;
      if (!root.right) return root.left;

      let successor = this.findMin(root.right);
      root.data = seccessor.data;
      root.right = this.deleteNode(root.data, successor);
    }
    return root;
  }

  findMin(root) {
    while (root.left) {
      root = root.left;
    }
    return root;
  }
  find(value) {

    return this.findNode(this.root, value)
  }

  findNode(root,value) {
    if(!root) return null
    if(root.value === value)return root
    if(value < root.value){
      return this.findNode(root.left, value)
    }
    levelOrder(callback) {
if(!callback) {
  throw new Error('haha')
}

llevelOrder(callback) {
  if (!callback) {
    throw new Error("Callback function is required");
  }

  let queue = [this.root]; // Start with the root node in the queue

  while (queue.length > 0) {
    let currentNode = queue.shift(); // Remove the first node in the queue
    callback(currentNode); // Apply the callback on the current node

    if (currentNode.left) {
      queue.push(currentNode.left); // Add left child to the queue
    }

    if (currentNode.right) {
      queue.push(currentNode.right); // Add right child to the queue
    }
  }
}

    }
  }
}
