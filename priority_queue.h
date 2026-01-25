#ifndef PRIORITYQUEUE_H
#define PRIORITYQUEUE_H

// Forward declaration of Node class to avoid circular dependency
class Node {
public:
    int data;
    Node* next;

    // Constructor
    Node(int data);
};

class PriorityQueue {
private:
    Node* front; // Pointer to the front of the queue

public:
    // Constructor
    PriorityQueue();

    // Destructor
    ~PriorityQueue();

    // Member function declarations
    void enqueue(int data);
    int dequeue();
    bool isEmpty() const;
    int size() const;
    int peekFront() const;
    void displayQueue() const;
    void clear();
};

#endif // PRIORITYQUEUE_H
