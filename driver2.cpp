/*
 * Author: Davos DeHoyos
 * Class: Data Structures
 * Assignment: Priority Queue (Exercise 6 - Priority Queue with Separate Priority Field)
 * Description:
 *     This file tests the PriorityQueue2 class, which implements a priority
 *     queue where elements are prioritized by a separate priority field.
 *     The program enqueues elements with specific priorities, displays the
 *     queue, and demonstrates peek and dequeue operations, along with edge cases.
 *     Additionally, it includes automatic testing with random values.
 *
 * Date: 11/05/2024
 */

#include <iostream>
#include <random>
#include "priority_queue2.h"

// Function to generate random values and priorities
void automaticTest(PriorityQueue2<int>& pq, int numTests = 10) {
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> valueDist(-100, 100);
    std::uniform_int_distribution<> priorityDist(1, 10);

    std::cout << "\n[Automatic Test] Enqueue random elements:\n";
    for (int i = 0; i < numTests; ++i) {
        int randomValue = valueDist(gen);
        int randomPriority = priorityDist(gen);
        pq.enqueue(randomValue, randomPriority);
        std::cout << "Enqueued: value = " << randomValue << ", priority = " << randomPriority << "\n";
    }

    // Display the queue after random enqueues
    std::cout << "Queue contents after random enqueues (expected order by priority):\n";
    pq.displayQueue();

    // Perform some peek and dequeue operations automatically
    if (!pq.isEmpty()) {
        std::cout << "\n[Automatic Test] peekFront and dequeue operations:\n";
        std::cout << "peekFront returns: " << pq.peekFront() << "\n";
        std::cout << "Dequeuing elements in priority order:\n";
        while (!pq.isEmpty()) {
            std::cout << "Dequeued: " << pq.dequeue() << "\n";
        }
    }

    // Final check for empty queue
    std::cout << (pq.isEmpty() ? "PASS: Queue is empty after all dequeues\n" : "FAIL: Queue is not empty after all dequeues\n");
}

void testPriorityQueue2() {
    PriorityQueue2<int> pq;

    std::cout << "\nRunning tests for PriorityQueue2 (with separate priority field):\n";

    // Enqueue elements with varying priorities
    pq.enqueue(30, 1);
    pq.enqueue(10, 2);
    pq.enqueue(20, 3);
    pq.enqueue(5, 4);
    pq.enqueue(30, 5);
    pq.enqueue(-100, 6);
    pq.enqueue(1, 7);
    pq.enqueue(0, 8);

    // Test displayQueue to check the ordering based on priority
    std::cout << "Queue contents after enqueues (expected order by priority):\n";
    pq.displayQueue();

    // Test peekFront to confirm the element with the highest priority is at the front
    int expectedFront = 0; // because 0 has the highest priority (priority = 8)
    if (pq.peekFront() == expectedFront) {
        std::cout << "PASS: peekFront after enqueues is " << expectedFront << std::endl;
    } else {
        std::cout << "FAIL: peekFront expected " << expectedFront << " but got " << pq.peekFront() << std::endl;
    }

    // Test dequeue to confirm elements are dequeued in order of priority
    if (pq.dequeue() == expectedFront) {
        std::cout << "PASS: dequeue removes " << expectedFront << " as the highest priority\n";
    } else {
        std::cout << "FAIL: dequeue expected " << expectedFront << " but got " << pq.dequeue() << std::endl;
    }

    // Check the new front after one dequeue
    expectedFront = 1; // 1 should now have the highest priority (priority = 7)
    if (pq.peekFront() == expectedFront) {
        std::cout << "PASS: New peekFront after dequeue is " << expectedFront << std::endl;
    } else {
        std::cout << "FAIL: New peekFront expected " << expectedFront << " but got " << pq.peekFront() << std::endl;
    }

    // Dequeue all elements to ensure the queue maintains proper order and empties correctly
    while (!pq.isEmpty()) {
        int removed = pq.dequeue();
        std::cout << "Dequeued element: " << removed << "\n";
    }

    // Test isEmpty on an empty queue
    if (pq.isEmpty()) {
        std::cout << "PASS: isEmpty returns true after all elements are dequeued\n";
    } else {
        std::cout << "FAIL: isEmpty expected true after all elements are dequeued but got false\n";
    }

    // Run automatic tests with random values and priorities
    automaticTest(pq);
}

int main() {
    testPriorityQueue2();
    return 0;
}
