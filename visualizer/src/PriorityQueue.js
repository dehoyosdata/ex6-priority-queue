// JavaScript implementation mirroring C++ PriorityQueue
// Sorted linked list, min-heap behavior (lower value = higher priority)

export class PriorityQueue {
  constructor() {
    this.head = null
    this._size = 0
  }

  enqueue(data) {
    const newNode = { data, next: null, id: crypto.randomUUID() }

    if (this.head === null || data < this.head.data) {
      newNode.next = this.head
      this.head = newNode
    } else {
      let temp = this.head
      while (temp.next !== null && temp.next.data <= data) {
        temp = temp.next
      }
      newNode.next = temp.next
      temp.next = newNode
    }
    this._size++
  }

  dequeue() {
    if (this.head === null) return null
    const value = this.head.data
    this.head = this.head.next
    this._size--
    return value
  }

  peek() {
    return this.head ? this.head.data : null
  }

  isEmpty() {
    return this.head === null
  }

  size() {
    return this._size
  }

  toArray() {
    const arr = []
    let current = this.head
    while (current !== null) {
      arr.push({ data: current.data, id: current.id })
      current = current.next
    }
    return arr
  }

  clear() {
    this.head = null
    this._size = 0
  }
}
