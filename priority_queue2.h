#ifndef PRIORITYQUEUE2_H
#define PRIORITYQUEUE2_H

// Forward declaration of Node class to avoid circular dependency
class Node2 {
public:
    int data;
    int priority;
    Node2* next;

    // Constructor
    Node2(int data, int priority);
};

class PriorityQueue2 {
private:
    Node2* front; // Pointer to the front of the queue

public:
    // Constructor
    PriorityQueue2();

    // Destructor
    ~PriorityQueue2();

    // Member function declarations
    void enqueue(int data, int priority);
    int dequeue();
    bool isEmpty() const;
    int size() const;
    int peekFront() const;
    int peekFrontPriority() const;
    void displayQueue() const;
    void clear();
};

#endif // PRIORITYQUEUE2_H
