#ifndef PRIORITYQUEUE2_H
#define PRIORITYQUEUE2_H

#include <iostream>

template<typename T, typename P = int>
class Node2 {
public:
    T data;
    P priority;
    Node2* next;

    Node2(T data, P priority) : data(data), priority(priority), next(nullptr) {}
};

template<typename T, typename P = int>
class PriorityQueue2 {
private:
    Node2<T, P>* front;

public:
    PriorityQueue2() : front(nullptr) {}

    ~PriorityQueue2() {
        while (front != nullptr) {
            Node2<T, P>* temp = front;
            front = front->next;
            delete temp;
        }
    }

    // Adds a new node with specified data and priority to the queue
    // Higher priority values are dequeued first
    void enqueue(T data, P priority) {
        Node2<T, P>* newNode = new Node2<T, P>(data, priority);

        // Insert newNode at the correct position based on priority
        if (front == nullptr || priority > front->priority) {
            newNode->next = front;
            front = newNode;
        } else {
            Node2<T, P>* current = front;
            // Traverse to find the correct insertion point
            while (current->next != nullptr && current->next->priority >= priority) {
                current = current->next;
            }
            newNode->next = current->next;
            current->next = newNode;
        }
    }

    T dequeue() {
        if (isEmpty()) {
            std::cerr << "Queue is empty" << std::endl;
            return T();
        }
        Node2<T, P>* temp = front;
        T data = front->data;
        front = front->next;
        delete temp;
        return data;
    }

    bool isEmpty() const {
        return front == nullptr;
    }

    int size() const {
        int count = 0;
        Node2<T, P>* current = front;
        while (current != nullptr) {
            count++;
            current = current->next;
        }
        return count;
    }

    T peekFront() const {
        if (isEmpty()) {
            std::cerr << "Queue is empty" << std::endl;
            return T();
        }
        return front->data;
    }

    P peekFrontPriority() const {
        if (isEmpty()) {
            std::cerr << "Queue is empty" << std::endl;
            return P();
        }
        return front->priority;
    }

    void displayQueue() const {
        Node2<T, P>* temp = front;
        while (temp != nullptr) {
            std::cout << "[Data: " << temp->data << ", Priority: " << temp->priority << "] -> ";
            temp = temp->next;
        }
        std::cout << "null" << std::endl;
    }

    void clear() {
        while (front != nullptr) {
            Node2<T, P>* temp = front;
            front = front->next;
            delete temp;
        }
    }
};

#endif // PRIORITYQUEUE2_H
