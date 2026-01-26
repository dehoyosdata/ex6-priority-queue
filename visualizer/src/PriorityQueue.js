// JavaScript implementation mirroring C++ PriorityQueue
// Sorted linked list, min-heap behavior (lower value = higher priority)

export class PriorityQueue {
  constructor() {
    this.head = null
    this._size = 0
  }

  // TODO: Insert in sorted order (lower value = higher priority)
  enqueue(data) {}

  // TODO: Remove and return front element
  dequeue() {}

  // TODO: Return front element without removing
  peek() {}

  isEmpty() {
    return this.head === null
  }

  size() {
    return this._size
  }

  // TODO: Convert linked list to array for rendering
  toArray() {
    return []
  }

  clear() {
    this.head = null
    this._size = 0
  }
}
