// Singly Linked List

/** Class representing a node. */

class Node {
  /**
   * Create a Node
   * @param val - the value to initiate the Node
   */
  constructor(val) {
    this.val = val;
    // Pointer to the next node. Null by default
    this.next = null;
  }
}

/** Class representing a Singly Linked List. */

class SinglyLinkedList {
  /**
   * Create a List
   * Iniialize head, tail and lenght
   */
  constructor() {
    this.head = this.tail = null;
    this.length = 0;
  }

  /**
   * Empties the list
   * @retun {SinglyLinkedList}
   */
  emptyList() {
    this.head = this.tail = null;
    this.length = 0;
  }

  /**
   * Check if the list is empty
   * @return {Boolean}
   */
  isEmpty() {
    return !this.head || this.length === 0;
  }

  /**
   *
   * @param {Function} cb - a callback function that returns the node
   */

  traverse(cb) {
    // if list is empty
    if (this.isEmpty()) return null;

    // reference to the head
    let node = this.head;

    // start looping
    while (node.next) {
      // use callback
      // if is passed as argument
      if (typeof cb === 'function') {
        cb(node);
      }
      // move on to the list
      node = node.next;
    }
  }

  /**
   * Adds a new Node at the end of the list
   * The new node is now the tail
   * @param val - the Node value
   * @return {SinglyLinkedList}
   */
  push(val) {
    // create a new Node with the passed value
    const node = new Node(val);
    // If the list is empty then
    // then the new node is both the head and the tail
    if (this.isEmpty()) {
      // set both head and tail to be the node
      this.head = this.tail = node;
    } else {
      // Set the next pointer of the actual tail to be the new node
      // Then set the new Node to be the tail
      this.tail.next = node;
      this.tail = node;
    }
    // Increase the length
    this.length++;
    // Return the entire list
    return this;
  }

  /**
   * Adds a new Node at the beginning of the list
   * The new node is now the head
   * @param val - the Node value
   * @return {SinglyeLinkedList}
   */

  unshift(val) {
    // create the new Node
    const node = new Node(val);
    // If list is empty the node is both head and tail
    if (this.isEmpty()) {
      this.head = this.tail = node;
    } else {
      // The actual head is now the next pointer
      // From the newly created node
      node.next = this.head;
      // And now the new Head is now the new Node
      this.head = node;
    }
    // Increment the length
    this.length++;
    // Return the List
    return this;
  }

  /**
   * Removes the last node from the list
   * Hence it removes the actual tail
   * @return {Node} - the node we just deleted
   */

  pop() {
    // If list is empty
    if (this.isEmpty()) {
      // We return undefined
      return undefined;
    }

    // If there is only one Node
    // Then we can just set head and tail to null
    // And return the tail
    if (this.length === 1) {
      const tail = this.tail;
      this.head = this.tail = null;
      this.length--;
      return tail;
    }

    // We must traverse the list
    // Starting from the head
    // So we get a reference to the list
    let current = this.head;
    // Because Singly Linked List cannot go backward
    // We need a reference for what it will ne the new tail
    let newTail = current;
    // The tail has next null
    // So the loop stops when we reach the tail
    while (current.next) {
      // the newTail keeps following the current node in the loop
      newTail = current;
      // We move on to the next pointer
      current = current.next;
    }

    // We reached the end of the list
    // newTail is now the last item
    // So the tail
    this.tail = newTail;
    // Cut out the next Node
    // So tail.next = null
    this.tail.next = null;
    // Decrease the length
    this.length--;

    // Return the node we just removed
    return current;
  }

  /**
   * Removes the first node from the list
   * Hence it removes the actual head
   * @return {Node} - the node we just deleted
   */

  shift() {
    if (this.isEmpty()) {
      return undefined;
    }
    // Store the actual Node that is the head
    // So we can return it
    const currentHead = this.head;
    // Set the next for the head to be the head
    this.head = this.head.next;
    // Decrease the length
    this.length--;
    // Edge case if length now is 0
    // Set tail to null
    if (this.length === 0) {
      this.tail = null;
    }

    // return the removed head
    return currentHead;
  }

  /**
   * Find a Node in the list based on a value
   * @param val - the value to search in the list
   * @return the Node if found
   */
  find(val) {
    let current = this.head;
    // traverse the entire list

    while (current) {
      if (current.val === val) {
        // we found the node
        return current;
      }
      current = current.next;
    }
    return false;
  }

  /**
   * Find a Node in the list based on its position
   * @param index - the index of the node
   * @return the Node if found or undefined
   */

  findAt(index) {
    // Check if list is empty
    if (this.isEmpty()) {
      return undefined;
    }
    // If the index is not in the list
    if (index < 0 || index > this.length) {
      return false;
    }
    // reference for the loop
    let current = this.head;
    // Reference for counting in the list
    // Lists have no indexes unlike arrays
    // Count is 0 so first item will be like in arrays
    let count = 0;
    // if count is different than our index we
    // keep looping
    while (count !== index) {
      current = current.next;
      count++;
    }
    // Return the node
    return current;
  }

  /**
   * Update a Node in the list
   * @param {Number} index - the index for the list
   * @param val - the value to update
   * */

  set(index, val) {
    // we take advantage of our findAt method
    let node = this.findAt(index);
    // If node is found
    if (node) {
      node.val = val;
      return node;
    }
    // Node not found
    return false;
  }

  /**
   * Insert a Node to the list at a given Index
   * @param {Number} index - the index for the list
   * @param val - the value to insert
   * @return {Boolean}
   * */

  insert(index, val) {
    if (index < 0 || index > this.length) {
      return false;
    }
    // If index is the first, 0, we are adding the head
    // we already have a method for it

    if (index === 0) {
      this.unshift(val);
      return true;
    }
    // if the index is the last item
    // then we also have the push method
    // for adding the new tail
    if (index === this.length) {
      this.push(val);
      return true;
    }

    // Create the new Node
    const node = new Node(val);

    // We need to find the previous Node
    // Where we want to insert our node
    let prev = this.findAt(index - 1);

    // prev.next is our position
    // We need to store the actual value
    let tmp = prev.next;
    // Now our node is in the correct index
    prev.next = node;

    // The node that was at our index
    // Must go one step forward so is our
    // new Node.next
    node.next = tmp;

    // Increease the length
    this.length++;
    // Return true
    return true;
  }

  /**
   * Removes a Node from the list at a given Index
   * @param {Number} index - the index for the list
   * @return {Node} the node that has been removed
   * */

  remove(index) {
    // If index does not exists
    if (index < 0 || index > this.length) {
      return false;
    }
    // if the index is the head
    if (index === 0) return this.shift();

    // If the index is the tail
    if (index === index - 1) return this.pop();

    // Get the previous node
    let previousNode = this.findAt(index - 1);

    // Store the node that will be removed
    let removed = previousNode.next;

    // Set the node next to previousNode
    // To be the Node next to our removed one
    previousNode.next = removed.next;

    // Decrease length
    this.length--;

    // return the removed Node
    return removed;
  }

  /**
   * Traverse the entire Linked List
   * @callback cb - do something with the list
   * @Example
      function log(node) {
        if(node) {
          console.log('The value is: ', node.val);
          if(!node.next) {
            console.log('we reached the end, ', node.val)
          }
        }
      }
   *
   * */
  run(cb) {
    // Reference to the head
    let current = this.head;

    // Loop until we reach the end
    while (current) {
      // Do something with the value
      cb(current);

      // move on
      current = current.next;
    }
  }

  /**
   * Reverse the Linked List
   * @return {SinglyLinkedList} - The reversed list
   * @Example
    Original List: 1 -> 2 -> 3 -> 4 -> 5
    Reversed List: 1 <- 2 <- 3 <- 4 <- 5
   */

  reverse() {
    // If List is empty return the List
    if (this.isEmpty()) return this;

    // swap head and tail
    // And keep a reference
    // For the tail because it will be our
    // New head
    let node = this.head;
    this.head = this.tail;
    this.tail = node;
    // We need to variable to
    // keep reference to previous and next Node
    let prev = null;
    let next;

    // Loop through the list
    // We could also use the run method
    while (node) {
      // we save the next value @example 2
      next = node.next;

      // set the next node the be the previous
      // @example 2 will be the previous of 1
      node.next = prev;

      // Set previous to be the actual Node
      // @example 1
      // @example Now 2 as 1 as next 1 <- 2
      prev = node;

      // Move on to the loop
      node = next;
    }
    // When the loop is finished
    // Our prev is our reversed list
    // So we just set it to be the head
    // @example (tail)1 <- 2 <- 3 <- 4 <- 5(head)
    this.head = prev;
    return this;
  }

  reverseWithRecursion() {
    /**
     *
     * @param {Node} head
     * @return {Node} The reversed head of he list
     */

    function reverse(head) {
      if (!head || !head.next) {
        return head;
      }

      let tmp = reverse(head.next);
      head.next.next = head;
      head.next = null;
      return tmp;
    }
    // Start recursions
    reverse(this.head);

    // Swap head and tail
    let node = this.tail;
    this.tail = this.head;
    this.head = node;
    // Return list
    return this;
  }
}

export default SinglyLinkedList;
