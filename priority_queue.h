#ifndef PRIORITYQUEUE_H
#define PRIORITYQUEUE_H

#include <iostream>

template<typename T>
class Node {
public:
    T data;
    Node* next;

    Node(T data) : data(data), next(nullptr) {}
};

template<typename T>
class PriorityQueue {
private:
    Node<T>* front;

public:
    PriorityQueue() : front(nullptr) {}

    ~PriorityQueue() {
        while (front != nullptr) {
            Node<T>* temp = front;
            front = front->next;
            delete temp;
        }
    }

    // Adds an element to the priority queue based on its priority
    // Lower values have higher priority (min-heap style)
    void enqueue(T data) {
        Node<T>* newNode = new Node<T>(data);
        // Insert newNode at the front if it's the highest priority
        if (front == nullptr || newNode->data < front->data) {
            newNode->next = front;
            front = newNode;
        } else {
            // Find the correct position based on priority
            Node<T>* temp = front;
            while (temp->next != nullptr && temp->next->data <= newNode->data) {
                temp = temp->next;
            }
            newNode->next = temp->next;
            temp->next = newNode;
        }
    }

    T dequeue() {
        if (isEmpty()) {
            std::cerr << "Queue is empty" << std::endl;
            return T();
        }
        Node<T>* temp = front;
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
        Node<T>* current = front;
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

    void displayQueue() const {
        Node<T>* current = front;
        while (current != nullptr) {
            std::cout << current->data << " ";
            current = current->next;
        }
        std::cout << std::endl;
    }

    void clear() {
        while (front != nullptr) {
            Node<T>* temp = front;
            front = front->next;
            delete temp;
        }
    }
};

#endif // PRIORITYQUEUE_H
