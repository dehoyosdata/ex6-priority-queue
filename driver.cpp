/*
 * Author: Davos DeHoyos
 * Class: Data Structures
 * Assignment: Priority Queue (Exercise 6)
 * Description:
 *     This file tests the PriorityQueue class, which implements a priority
 *     queue where elements are prioritized by their data values. The program
 *     enqueues several elements, displays the queue, and demonstrates the
 *     functionality of peek and dequeue operations, along with edge cases.
 *     Additionally, it includes automatic testing with random values.
 *
 * Date: 11/05/2024
 */

#include <iostream>
#include <random>
#include "priority_queue.h"

// Function to generate random values and test the queue automatically
void automaticTest(PriorityQueue<int>& pq, int numTests = 10) {
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> valueDist(-100, 100);

    std::cout << "\n[Automatic Test] Enqueue random elements:\n";
    for (int i = 0; i < numTests; ++i) {
        int randomValue = valueDist(gen);
        pq.enqueue(randomValue);
        std::cout << "Enqueued: value = " << randomValue << "\n";
    }

    // Display the queue after random enqueues
    std::cout << "Queue contents after random enqueues (expected order by data values):\n";
    pq.displayQueue();

    // Perform peekFront and dequeue operations automatically
    if (!pq.isEmpty()) {
        std::cout << "\n[Automatic Test] peekFront and dequeue operations:\n";
        std::cout << "peekFront returns: " << pq.peekFront() << "\n";
        std::cout << "Dequeuing elements in sorted order:\n";
        while (!pq.isEmpty()) {
            std::cout << "Dequeued: " << pq.dequeue() << "\n";
        }
    }

    // Final check for empty queue
    std::cout << (pq.isEmpty() ? "PASS: Queue is empty after all dequeues\n" : "FAIL: Queue is not empty after all dequeues\n");
}

void runPriorityQueueTests() {
    PriorityQueue<int> pq;

    std::cout << "\n========== Testing PriorityQueue ==========\n";

    // Test: Enqueue elements
    std::cout << "\n[Test] Enqueue elements:\n";
    pq.enqueue(30);
    pq.enqueue(10);
    pq.enqueue(20);
    pq.enqueue(5);

    std::cout << "Queue after enqueue operations: ";
    pq.displayQueue();

    // Test: peekFront
    std::cout << "\n[Test] peekFront:\n";
    int expectedPeek = 5;
    int actualPeek = pq.peekFront();
    if (actualPeek == expectedPeek) {
        std::cout << "PASS: peekFront returned " << actualPeek << " as expected.\n";
    } else {
        std::cout << "FAIL: peekFront expected " << expectedPeek << ", but got " << actualPeek << ".\n";
    }

    // Test: Dequeue
    std::cout << "\n[Test] Dequeue:\n";
    int expectedDequeue = 5;
    int actualDequeue = pq.dequeue();
    if (actualDequeue == expectedDequeue) {
        std::cout << "PASS: dequeue returned " << actualDequeue << " as expected.\n";
    } else {
        std::cout << "FAIL: dequeue expected " << expectedDequeue << ", but got " << actualDequeue << ".\n";
    }

    std::cout << "Queue after one dequeue: ";
    pq.displayQueue();

    // Test: isEmpty on non-empty queue
    std::cout << "\n[Test] isEmpty (on non-empty queue):\n";
    if (!pq.isEmpty()) {
        std::cout << "PASS: isEmpty correctly returned false for a non-empty queue.\n";
    } else {
        std::cout << "FAIL: isEmpty incorrectly returned true for a non-empty queue.\n";
    }

    // Test: Multiple dequeues to empty the queue
    std::cout << "\n[Test] Multiple dequeues until empty:\n";
    while (!pq.isEmpty()) {
        std::cout << "Dequeued: " << pq.dequeue() << std::endl;
    }
    if (pq.isEmpty()) {
        std::cout << "PASS: Queue is empty after dequeuing all elements.\n";
    } else {
        std::cout << "FAIL: Queue is not empty after dequeuing all elements.\n";
    }

    // Edge Case: Dequeue on empty queue
    std::cout << "\n[Test] Dequeue on an empty queue:\n";
    try {
        pq.dequeue();
        std::cout << "FAIL: Dequeue on an empty queue did not throw an exception.\n";
    } catch (const std::exception &e) {
        std::cout << "PASS: Dequeue on empty queue threw exception as expected: " << e.what() << std::endl;
    }

    // Edge Case: peekFront on empty queue
    std::cout << "\n[Test] peekFront on an empty queue:\n";
    try {
        pq.peekFront();
        std::cout << "FAIL: peekFront on an empty queue did not throw an exception.\n";
    } catch (const std::exception &e) {
        std::cout << "PASS: peekFront on empty queue threw exception as expected: " << e.what() << std::endl;
    }

    // Test: Enqueue more elements after clearing the queue
    std::cout << "\n[Test] Enqueue after clearing queue:\n";
    pq.enqueue(50);
    pq.enqueue(40);
    pq.enqueue(60);
    std::cout << "Queue after enqueue operations: ";
    pq.displayQueue();

    std::cout << "\n========== End of Tests ==========\n";

    // Run automatic tests with random values
    automaticTest(pq);
}

int main() {
    runPriorityQueueTests();
    return 0;
}
