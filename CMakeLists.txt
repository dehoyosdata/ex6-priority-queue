cmake_minimum_required(VERSION 3.10)
project(ex6_priority_queue)

set(CMAKE_CXX_STANDARD 17)

# Target for PriorityQueue testing with driver.cpp
# Implementation is now header-only (templates)
add_executable(priority_queue driver.cpp)

# Target for PriorityQueue2 testing with driver2.cpp
# Implementation is now header-only (templates)
add_executable(ex6_priority_queue2 driver2.cpp)
