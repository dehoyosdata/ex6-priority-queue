import { useState, useRef } from 'react'
import { PriorityQueue } from './PriorityQueue'
import { Node } from './Node'
import './App.css'

function App() {
  const pqRef = useRef(new PriorityQueue())
  const [queue, setQueue] = useState([])
  const [inputValue, setInputValue] = useState('')

  // TODO: Implement with animation steps
  const handleEnqueue = () => {
    if (inputValue === '') return
    pqRef.current.enqueue(Number(inputValue))
    setQueue(pqRef.current.toArray())
    setInputValue('')
  }

  // TODO: Implement with animation steps
  const handleDequeue = () => {
    pqRef.current.dequeue()
    setQueue(pqRef.current.toArray())
  }

  const handleClear = () => {
    pqRef.current.clear()
    setQueue([])
  }

  return (
    <div className="app">
      <h1>Priority Queue Visualizer</h1>
      <p className="subtitle">Min-Heap using Sorted Linked List</p>

      {/* Controls */}
      <div className="controls">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter value"
        />
        <button onClick={handleEnqueue}>Enqueue</button>
        <button onClick={handleDequeue}>Dequeue</button>
        <button onClick={handleClear}>Clear</button>
      </div>

      {/* Queue Visualization */}
      <div className="queue-container">
        {queue.length === 0 ? (
          <p className="empty-message">Queue is empty</p>
        ) : (
          <div className="queue">
            {queue.map((node, idx) => (
              <Node
                key={node.id}
                value={node.data}
                isHead={idx === 0}
                isLast={idx === queue.length - 1}
              />
            ))}
          </div>
        )}
      </div>

      {/* Info Panel */}
      <div className="info-panel">
        <p>Size: {queue.length}</p>
        <p>Front: {queue.length > 0 ? queue[0].data : 'N/A'}</p>
      </div>
    </div>
  )
}

export default App
