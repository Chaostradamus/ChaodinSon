// Import the Node and Tree classes
const { Node, Tree } = require("./path-to-your-file");

// Example usage:
const randomNumbers = [20, 15, 25, 10, 5, 30, 40, 35];
const tree = new Tree(randomNumbers);

// Check if the tree is balanced
console.log("Is the tree balanced?", tree.isBalanced());

// Print in various orders
console.log("Level Order:");
tree.levelOrder((node) => console.log(node.data));

console.log("In Order:");
tree.inOrder((node) => console.log(node.data));

console.log("Pre Order:");
tree.preOrder((node) => console.log(node.data));

console.log("Post Order:");
tree.postOrder((node) => console.log(node.data));

// Unbalance the tree by adding some nodes
tree.insert(100);
tree.insert(150);
tree.insert(200);

// Check if the tree is balanced again
console.log("Is the tree balanced after insertion?", tree.isBalanced());

// Rebalance the tree
tree.rebalance();
console.log("Is the tree balanced after rebalancing?", tree.isBalanced());

// Print the tree in various orders again
console.log("Level Order After Rebalance:");
tree.levelOrder((node) => console.log(node.data));

console.log("In Order After Rebalance:");
tree.inOrder((node) => console.log(node.data));

console.log("Pre Order After Rebalance:");
tree.preOrder((node) => console.log(node.data));

console.log("Post Order After Rebalance:");
tree.postOrder((node) => console.log(node.data));
