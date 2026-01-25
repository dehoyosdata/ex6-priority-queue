# Priority Queue - Data Structures

## Overview

This repository contains two implementations of a **Priority Queue** data structure in C++:

1. **PriorityQueue** (`priority_queue.h`) - Uses the data value itself as the priority (min-heap style)
2. **PriorityQueue2** (`priority_queue2.h`) - Uses a separate priority field (max-priority style)

Both implementations use a sorted linked list approach where elements are inserted in priority order.

---

## What is a Priority Queue?

A **Priority Queue** is an abstract data type (ADT) similar to a regular queue, but with a key difference: each element has an associated **priority**, and elements are served based on their priority rather than their arrival order.

Unlike a standard FIFO (First-In-First-Out) queue where the first element added is the first removed, a priority queue removes elements in order of their priority value.

### Key Characteristics

- Elements with higher priority are dequeued before elements with lower priority
- Elements with equal priority are typically served in FIFO order (stable) or arbitrary order
- The queue maintains elements in a way that allows efficient access to the highest-priority element

---

## Real-World Problems Solved by Priority Queues

Priority queues are fundamental in computer science and solve many practical problems:

### 1. Operating System Task Scheduling
- CPU schedulers use priority queues to determine which process runs next
- Higher-priority processes (system processes) run before lower-priority ones (user applications)

### 2. Dijkstra's Shortest Path Algorithm
- Finding the shortest path in a weighted graph
- The algorithm repeatedly extracts the vertex with minimum distance

### 3. Huffman Coding (Data Compression)
- Building optimal prefix-free codes for data compression
- Repeatedly combines the two lowest-frequency nodes

### 4. Event-Driven Simulation
- Processing events in chronological order
- Events are queued by their scheduled time

### 5. Emergency Room Triage
- Patients are treated based on severity, not arrival time
- Critical patients have higher priority than minor injuries

### 6. Network Packet Routing
- Quality of Service (QoS) implementations
- Voice/video packets get priority over regular data

### 7. A* Search Algorithm
- Pathfinding in games and robotics
- Explores most promising paths first

---

## Time Complexity Analysis (Big O)

### This Implementation (Sorted Linked List)

| Operation | Time Complexity | Explanation |
|-----------|-----------------|-------------|
| `enqueue()` | **O(n)** | Must traverse list to find correct insertion point |
| `dequeue()` | **O(1)** | Highest priority element is always at the front |
| `peekFront()` | **O(1)** | Direct access to front element |
| `isEmpty()` | **O(1)** | Simple null check |
| `size()` | **O(n)** | Must traverse entire list to count |
| `clear()` | **O(n)** | Must delete each node |
| `displayQueue()` | **O(n)** | Must visit each element |

### Space Complexity

- **O(n)** where n is the number of elements
- Each element requires a Node with data + pointer (+ priority field in PriorityQueue2)

### Comparison with Other Implementations

| Implementation | Enqueue | Dequeue | Peek | Space |
|----------------|---------|---------|------|-------|
| **Sorted Linked List** (this repo) | O(n) | O(1) | O(1) | O(n) |
| Unsorted Array | O(1) | O(n) | O(n) | O(n) |
| Sorted Array | O(n) | O(1) | O(1) | O(n) |
| Binary Heap | O(log n) | O(log n) | O(1) | O(n) |
| Fibonacci Heap | O(1)* | O(log n)* | O(1) | O(n) |

*Amortized time complexity

### When to Use This Implementation

**Advantages:**
- Simple to understand and implement
- O(1) dequeue operation
- Good for small datasets
- No wasted space (dynamic allocation)

**Disadvantages:**
- O(n) enqueue makes it inefficient for large datasets
- For large-scale applications, a binary heap is preferred

---

## Implementation Details

### PriorityQueue (priority_queue.h)

Uses the **data value itself** as the priority. Smaller values have higher priority (min-heap behavior).

```cpp
PriorityQueue<int> pq;
pq.enqueue(5);  // priority is 5
pq.enqueue(2);  // priority is 2 (higher priority, goes to front)
pq.enqueue(8);  // priority is 8
pq.dequeue();   // returns 2 (smallest value)
```

### PriorityQueue2 (priority_queue2.h)

Uses a **separate priority field**. Larger priority values have higher priority (max-heap behavior).

```cpp
PriorityQueue2<std::string, int> pq;
pq.enqueue("Low priority task", 1);
pq.enqueue("High priority task", 10);
pq.enqueue("Medium priority task", 5);
pq.dequeue();  // returns "High priority task"
```

---

## API Reference

### PriorityQueue<T>

| Method | Description |
|--------|-------------|
| `enqueue(T data)` | Insert element based on data value (lower = higher priority) |
| `T dequeue()` | Remove and return highest priority element |
| `T peekFront()` | Return highest priority element without removing |
| `bool isEmpty()` | Check if queue is empty |
| `int size()` | Return number of elements |
| `void clear()` | Remove all elements |
| `void displayQueue()` | Print all elements |

### PriorityQueue2<T, P>

| Method | Description |
|--------|-------------|
| `enqueue(T data, P priority)` | Insert element with given priority (higher = higher priority) |
| `T dequeue()` | Remove and return highest priority element |
| `T peekFront()` | Return highest priority data without removing |
| `P peekFrontPriority()` | Return highest priority value without removing |
| `bool isEmpty()` | Check if queue is empty |
| `int size()` | Return number of elements |
| `void clear()` | Remove all elements |
| `void displayQueue()` | Print all elements with their priorities |

---

## Building and Running

### Using CMake

```bash
mkdir build && cd build
cmake ..
make
./priority_queue   # Run PriorityQueue tests
./ex6_priority_queue2  # Run PriorityQueue2 tests
```

### Direct Compilation

```bash
# Compile PriorityQueue driver
g++ -std=c++17 driver.cpp -o priority_queue

# Compile PriorityQueue2 driver
g++ -std=c++17 driver2.cpp -o priority_queue2
```

---

## Code Structure

```
ex6-priority-queue/
├── priority_queue.h    # Template class using data as priority (min-heap)
├── priority_queue2.h   # Template class with separate priority field (max-heap)
├── driver.cpp          # Test driver for PriorityQueue
├── driver2.cpp         # Test driver for PriorityQueue2
├── CMakeLists.txt      # CMake build configuration
└── README.md           # This file
```

---

## License

This project is for educational purposes as part of a Data Structures course.
