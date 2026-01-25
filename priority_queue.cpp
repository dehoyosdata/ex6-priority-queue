#include "priority_queue.h"
#include <iostream>

Node::Node(int dataVal) : data(dataVal), next(nullptr) {}

PriorityQueue::PriorityQueue() : front(nullptr) {}

PriorityQueue::~PriorityQueue() {
    while (front != nullptr) {
        Node* temp = front;
        front = front->next;
        delete temp;
    }
}

// Adds an element to the priority queue based on its priority
void PriorityQueue::enqueue(int data) {
    Node* newNode = new Node(data);
    // Insert newNode at the front if it's the highest priority
    if (front == nullptr || newNode->data < front->data) {
        newNode->next = front;
        front = newNode;
    } else {
        // Find the correct position based on priority
        Node* temp = front;
        while (temp->next != nullptr && temp->next->data <= newNode->data) {
            temp = temp->next;
        }
        newNode->next = temp->next;
        temp->next = newNode;
    }
}

int PriorityQueue::dequeue() {
    if (isEmpty()) {
        std::cerr << "Queue is empty" << std::endl;
        return -1;
    }
    Node* temp = front;
    int data = front->data;
    front = front->next;
    delete temp;
    return data;
}

bool PriorityQueue::isEmpty() const {
    return front == nullptr;
}

int PriorityQueue::peekFront() const {
    if (isEmpty()) {
        std::cerr << "Queue is empty" << std::endl;
        return -1;
    }
    return front->data;
}

int PriorityQueue::size() const {
    int count = 0;
    Node* current = front;
    while (current != nullptr) {
        count++;
        current = current->next;
    }
    return count;
}

void PriorityQueue::clear() {
    while (front != nullptr) {
        Node* temp = front;
        front = front->next;
        delete temp;
    }
}

// Traverse and print each element from front to back
void PriorityQueue::displayQueue() const {
  Node* current = front;
  while (current != nullptr) {
    std::cout << current->data << " ";
    current = current->next;
  }
  std::cout << std::endl;
}