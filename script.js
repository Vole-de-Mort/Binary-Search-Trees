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
const array = [1, 2, 3, 4, 5, 6, 7, 7, 9, 10];
const t = new Tree(array);
//t.insert(10);
//t.deleteItem(4)
const element = t.find(t.root, 5)
console.log(element);
prettyPrint(t.root);