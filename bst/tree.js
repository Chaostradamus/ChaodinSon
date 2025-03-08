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
    this.root = this.deleteNode(this.root, value);
  }

  deleteNode(root, value) {
    if (!root) return null;

    if (value < root.data) {
      root.left = this.deleteNode(root.left, value);
    } else if (value > root.data) {
      root.right = this.deleteNode(root.right, value);
    } else {
      if (!root.left && !root.right) {
        return null;
      }
      if (!root.left) return root.right;
      if (!root.right) return root.left;

      let successor = this.findMin(root.right);
      root.data = successor.data;
      root.right = this.deleteNode(root.right, successor.data);
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
    return this.findNode(this.root, value);
  }

  findNode(root, value) {
    if (!root) return null;
    if (root.data === value) return root;
    if (value < root.data) {
      return this.findNode(root.left, value);
    }
    return this.findNode(root.right, value);
  }

  levelOrder(callback) {
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

  inOrder(callback) {
    if (!callback) {
      throw new Error("Callback function is required");
    }
    this.inOrderHelper(this.root, callback);
  }

  inOrderHelper(root, callback) {
    if (root) {
      this.inOrderHelper(root.left, callback);
      callback(root);
      this.inOrderHelper(root.right, callback);
    }
  }

  preOrder(callback) {
    if (!callback) {
      throw new Error("Callback function is required");
    }
    this.preOrderHelper(this.root, callback);
  }

  preOrderHelper(root, callback) {
    if (root) {
      callback(root); // Visit root
      this.preOrderHelper(root.left, callback); // Traverse left
      this.preOrderHelper(root.right, callback); // Traverse right
    }
  }

  postOrder(callback) {
    if (!callback) {
      throw new Error("Callback function is required");
    }
    this.postOrderHelper(this.root, callback);
  }

  postOrderHelper(root, callback) {
    if (root) {
      this.postOrderHelper(root.left, callback); // Traverse left
      this.postOrderHelper(root.right, callback); // Traverse right
      callback(root); // Visit root
    }
  }

  height(node) {
    if (node === null) return -1;
    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  depth(node, root = this.root, level = 0) {
    if (root === null) return -1;
    if (root === node) return level;

    let leftDepth = this.depth(node, root.left, level + 1);
    if (leftDepth !== -1) return leftDepth;

    return this.depth(node, root.right, level + 1);
  }

  isBalanced(root = this.root) {
    if (!root) return true; // An empty tree is balanced

    let leftHeight = this.height(root.left);
    let rightHeight = this.height(root.right);

    if (Math.abs(leftHeight - rightHeight) > 1) return false; // Check if current node is unbalanced

    // Recursively check if left and right subtrees are also balanced
    return this.isBalanced(root.left) && this.isBalanced(root.right);
  }

  inOrderTraversal(root, result = []) {
    if (root) {
      this.inOrderTraversal(root.left, result);
      result.push(root.data);
      this.inOrderTraversal(root.right, result);
    }
    return result;
  }

  rebalance() {
    const sortedNodes = this.inOrderTraversal(this.root);
    this.root = this.buildTree(sortedNodes);
  }
}

// Export the Node and Tree classes
module.exports = { Node, Tree };
