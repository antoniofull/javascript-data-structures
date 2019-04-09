/** Class representing a node. */

class Node {
  /**
   * Create a Node
   * @param val - the value to initiate the Node
   */
  constructor(val) {
    this.val = val;
    this.left = this.right = null;
  }
}

/**
       10
     /    \
	  7     15
   / \    /  \
	5   8  12   18

  */
class BinarySearchTree {
  /**
   * Create a BInary Search Tree
   * Initialize root to null
   * Or with a value
   * @param val - value for the root
   */
  constructor(val) {
    if (typeof val === 'undefined') {
      // Initialized with no root
      this.root = null;
    } else {
      // Initialize with a value
      const rootNode = new Node(val);
      this.root = rootNode;
    }
  }
  /**
   * Inserts a new Node in to the tree
   * @param val - value to add to the tree
   * @return {BinarySearchTree} - the New Tree
   */
  insert(val) {
    // Create the Node
    const node = new Node(val);
    if (this.root === null) {
      this.root = node;
      return this;
    }
    // keep a reference to the root Node
    let current = this.root;
    while (true) {
      if (val === current.val) return undefined;
      if (val < current.val) {
        if (current.left === null) {
          current.left = node;
          return this;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = node;
          return this;
        }
        current = current.right;
      }
    }
  }

  /**
   *
   * @param {*} val - value to find
   * @return {Node} parent Node
   */
  findParentNode(val) {
    let current = this.root;
    let parent;
    while (current) {
      if (val < current.val) {
        parent = current;
        current = current.left;
      } else if (val > current.val) {
        parent = current;
        current = current.right;
      } else {
        // We found our value
        // we return the parent
        if (this.root.val === current.val) {
          parent = null;
        }
        return parent;
      }
    }
    return null;
  }

  /**
   *
   * @param val - value to search
   * @return {Node} - The node if found
   * @return {Boolean} false - if not found
   */
  find(val) {
    // handle exception no value passed
    if (typeof val === 'undefined') {
      return false;
    }
    // If no root nothing to search
    // Just return false
    if (this.root === null) {
      return false;
    }
    let current = this.root;
    // while we have nodes
    while (current) {
      if (val < current.val) {
        current = current.left;
      } else if (val > current.val) {
        current = current.right;
      } else {
        // We found our value
        return current;
      }
    }
    return null;
  }

  /**
   * @return {Node} minimum value
   */
  findMin() {
    let current = this.root;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }

  /**
   * @return {Node} minimum value
   */
  findMax() {
    let current = this.root;
    while (current.right !== null) {
      current = current.right;
    }
    return current;
  }

  /**
   *
   * @param  val - value to be removed
   * @return {Node} the node removed
   */
  remove(val) {
    // Create a function that we will call
    // Recursevely

    const removeNode = (node, val) => {
      if (node === null) {
        return null;
      }
      // We found the node
      if (val === node.val) {
        // Now we have 3 options
        // 1. Node has no children
        if (node.left === null && node.right === null) {
          // Set the node to null
          return null;
        }
        // 2. Node has one child
        // 2.1 Child is on the right
        if (node.left === null) {
          return node.right;
        }

        // 2.2 Child is on the left
        if (node.right === null) {
          return node.left;
        }

        // 3. Node has 2 children
        // To find our replacement in the tree
        // We must go first on the first right Node
        // Then go to the outmost left of the Node
        // This will be our new node

        let tmp = node.right;

        // Now let's go up to the lowest left value

        while (tmp.left !== null) {
          tmp = tmp.left;
        }

        // Set the actual Node removed
        // With the new value we just found
        node.val = tmp.val;

        // We recursevly move the tree up
        node.right = removeNode(node.right, tmp.val);
        return node;
      } else if (val < node.val) {
        // Our value is less
        // So we move on the left
        node.left = removeNode(node.left, val);
        return node;
      } else {
        // Our value is greater
        // So we move on the right
        node.right = removeNode(node.right, val);
        return node;
      }
    };
    this.root = removeNode(this.root, val);
  }

  // The min height of a tree is
  // the difference between the root node
  // And the first node that has not 2 children
  // It mush have 1 or 0 children. (called leaf)
  /*
  			10
		  /    \
		7       15
	  / \       \
   5   8       18
   
   15 is the first child without 2 children
   so height is 10 -> 15 
   it starts at 0 so 0(10) 1(15)
   The min height is 1
   */

  /**
   *
   * @param {Node} node - reference to the root node
   * @return {Number} Min height of the
   */
  findMinHeight(node = this.root) {
    // No height
    if (node === null) {
      // Return -1
      // Because the count always starts
      // At 0
      return -1;
    }

    // We use recursion as is more elegant
    // To loop through the tree

    let left = this.findMinHeight(node.left);
    let right = this.findMinHeight(node.right);
    // if our left is less than right
    // we increment left
    // becase we are going down the tree
    if (left < right) {
      return left + 1;
    } else {
      return right + 1;
    }
  }

  // The max height is the distance between the root
  // And the most lowest node, leaf with 0 children.
  // Max height 3
  /*
  			10
		  /    \
		7       15
	  / \       \
   5   8       18

   5, 8, 18 are the nodes without any children(leaf)
   so height is 0(10) 1(7) (2) 5,8,18
   Max height is 2
  */

  /**
   *
   * @param {Node} node - reference to the root node
   * @return {Number} max height of the
   */
  findMaxHeight(node = this.root) {
    if (node === null) {
      return -1;
    }

    let left = this.findMaxHeight(node.left);
    let right = this.findMaxHeight(node.right);

    // Like min height but in reverse
    if (left > right) {
      return left + 1;
    } else {
      return right + 1;
    }
  }

  // If a tree is balanced
  // the difference between Min height and max height
  // must not be greater than 1
  // If tree is balanced search is more effective
  isBalanced() {
    return this.findMinHeight() >= this.findMinHeight() - 1;
  }

  // height of a tree is
  // The difference between root node and leaf node
}

export default BinarySearchTree;
