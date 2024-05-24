class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
class Tree {
  constructor(array){
    this.root = this.buildTree(array);
  }

  removeDuplicatesAndSort(array) {
    return [...new Set(array)].sort((a, b) => a - b);
  }

  buildTree(array) {
    if (array.length == 0){ return null }

    array = this.removeDuplicatesAndSort(array);
    const build = (arr, start, end) => {
      if (start > end) {
        return null;
      }
      const mid = Math.floor((start + end) / 2);
      const node = new Node(arr[mid]);

      node.left = build(arr, start, mid - 1);
      node.right = build(arr, mid + 1, end);

      return node ;
    }
    return build(array, 0, array.length - 1);
  }

  insert(value){
    const node = new Node(value);
    if (this.root == null){
      this.root = node;
    }else{
      let temp = this.root;
      let parent = null;

      while ( temp != null){
        parent = temp;
        if (value > temp.data){
          temp = temp.right;
        }else if (value < temp.data){
          temp = temp.left;
        }else{
          console.log("Value already exsiste !");
          return 
        }
      }
      if (value > parent.data){
        parent.right = node;
      }else{
        parent.left = node;
      }
    }
  }

  deleteItem(value) {
    this.root = this.deleteNode(this.root, value);
  }
  deleteNode(root, value) {
    if (root === null) return root;

    if (value < root.data) {
      root.left = this.deleteNode(root.left, value);
    } else if (value > root.data) {
      root.right = this.deleteNode(root.right, value);
    } else {
      // Node to be deleted found

      // Case 1: Node with only one child or no child
      if (root.left === null) return root.right;
      if (root.right === null) return root.left;

      // Case 2: Node with two children
      // Get the inorder successor (smallest in the right subtree)
      root.data = this.minValue(root.right);

      // Delete the inorder successor
      root.right = this.deleteNode(root.right, root.data);
    }

    return root;
  }

  minValue(node) {
    let current = node;

    // Loop down to find the leftmost leaf
    while (current.left !== null) {
      current = current.left;
    }

    return current.data;
  }

  find(root, value){
    if(root === null){
      console.log("Value does not existe");
      return null;
    }else if (root.data === value){
      return root;
    }else if (root.data > value){
      return this.find(root.left, value);
    }else{
      return this.find(root.right, value);
    }
  }

  levelOrder(callback) {
    const result = [];
    const queue = [];
    if (this.root !== null) {
      queue.push(this.root);
    }

    while (queue.length > 0) {
      const node = queue.shift();
      if (callback) {
        callback(node);
      } else {
        result.push(node.data);
      }

      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
    }

    return result;
  }

  levelOrder(callback) {
    const result = [];
    const queue = [];
    if (this.root !== null) {
      queue.push(this.root);
    }

    while (queue.length > 0) {
      const node = queue.shift();
      if (callback) {
        callback(node);
      } else {
        result.push(node.data);
      }

      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
    }

    return result;
  }

  inOrder(callback) {
    const result = [];
    const traverse = (node) => {
      if (node === null) return;
      traverse(node.left);
      if (callback) {
        callback(node);
      } else {
        result.push(node.data);
      }
      traverse(node.right);
    };
    traverse(this.root);
    return result;
  }

  preOrder(callback) {
    const result = [];
    const traverse = (node) => {
      if (node === null) return;
      if (callback) {
        callback(node);
      } else {
        result.push(node.data);
      }
      traverse(node.left);
      traverse(node.right);
    };
    traverse(this.root);
    return result;
  }

  postOrder(callback) {
    const result = [];
    const traverse = (node) => {
      if (node === null) return;
      traverse(node.left);
      traverse(node.right);
      if (callback) {
        callback(node);
      } else {
        result.push(node.data);
      }
    };
    traverse(this.root);
    return result;
  }

  height(node){
    if (node == null){
      return -1;
    }
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1
  }

  depth(node, current = this.root, depth = 0) {
    if (current === null) return -1;
    if (current === node) return depth;

    const leftDepth = this.depth(node, current.left, depth + 1);
    if (leftDepth !== -1) return leftDepth;

    return this.depth(node, current.right, depth + 1);
  }

  isBalanced(node = this.root) {
    if (node === null) return true;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    if (Math.abs(leftHeight - rightHeight) > 1) return false;

    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }

  rebalance() {
    const values = this.inOrder();
    this.root = this.buildTree(values);
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
const array = [1, 2, 3, 4, 5, 6, 7, 7, 9, 10, 11, 22, 23, 24, 25, 26, 27,];
const t = new Tree(array);
//t.insert(10);
//t.deleteItem(4)
const element = t.find(t.root, 27)

prettyPrint(t.root);
// Perform traversals
//console.log("In-order traversal without callback:");
//console.log(t.inOrder()); // Should return an array of values
//
//console.log("Pre-order traversal without callback:");
//console.log(t.preOrder()); // Should return an array of values
//
//console.log("Post-order traversal without callback:");
//console.log(t.postOrder()); // Should return an array of values

console.log(t.height(element))
console.log(t.depth(element))
t.insert(21)
if (t.isBalanced()){
  console.log("Tree is already balanced !");
}else{
  rebalance();
  prettyPrint(t.root);
}