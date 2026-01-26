import { useState } from 'react'
import './App.css'

function App() {
  const [queue, setQueue] = useState([])
  const [inputValue, setInputValue] = useState('')

  // TODO: Implement enqueue with animation
  const handleEnqueue = () => {
    console.log('Enqueue:', inputValue)
  }

  // TODO: Implement dequeue with animation
  const handleDequeue = () => {
    console.log('Dequeue')
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
      </div>

      {/* Queue Visualization */}
      <div className="queue-container">
        {queue.length === 0 ? (
          <p className="empty-message">Queue is empty</p>
        ) : (
          <div className="queue">
            {/* TODO: Render nodes */}
          </div>
        )}
      </div>

      {/* Info Panel */}
      <div className="info-panel">
        <p>Size: {queue.length}</p>
        <p>Front: {queue.length > 0 ? queue[0] : 'N/A'}</p>
      </div>
    </div>
  )
}

export default App
