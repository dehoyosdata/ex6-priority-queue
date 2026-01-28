import { useState, useRef, useCallback } from 'react'
import { PriorityQueue } from './PriorityQueue'
import { Node } from './Node'
import './App.css'

function App() {
  const pqRef = useRef(new PriorityQueue())
  const [queue, setQueue] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [animationSpeed, setAnimationSpeed] = useState(500) // ms per step
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationStates, setAnimationStates] = useState({}) // { nodeId: 'comparing' | 'inserting' | 'removing' }
  const [pendingNode, setPendingNode] = useState(null) // Node being inserted (shown before actual insertion)

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

  const handleEnqueue = useCallback(async () => {
    if (inputValue === '' || isAnimating) return
    const value = Number(inputValue)
    setInputValue('')
    setIsAnimating(true)

    const currentQueue = pqRef.current.toArray()

    // Find where the new node will be inserted
    let insertIndex = 0
    for (let i = 0; i < currentQueue.length; i++) {
      if (currentQueue[i].data <= value) {
        insertIndex = i + 1
      } else {
        break
      }
    }

    // Step 1: Show the pending node appearing at the end
    const pendingId = 'pending-' + Date.now()
    setPendingNode({ data: value, id: pendingId })
    setAnimationStates({ [pendingId]: 'inserting' })
    await sleep(animationSpeed)

    // Step 2: Animate comparisons - highlight each node as we traverse
    for (let i = 0; i < currentQueue.length; i++) {
      if (currentQueue[i].data <= value) {
        setAnimationStates({ [currentQueue[i].id]: 'comparing', [pendingId]: 'inserting' })
        await sleep(animationSpeed * 0.6)
      } else {
        // Found insertion point
        break
      }
    }

    // Step 3: Actually insert the node
    pqRef.current.enqueue(value)
    setPendingNode(null)
    const newQueue = pqRef.current.toArray()

    // Find the newly inserted node
    const newNode = newQueue[insertIndex]
    setQueue(newQueue)
    setAnimationStates({ [newNode.id]: 'inserting' })
    await sleep(animationSpeed)

    // Step 4: Clear animations
    setAnimationStates({})
    setIsAnimating(false)
  }, [inputValue, isAnimating, animationSpeed])

  const handleDequeue = useCallback(async () => {
    if (pqRef.current.isEmpty() || isAnimating) return
    setIsAnimating(true)

    const currentQueue = pqRef.current.toArray()
    const headNode = currentQueue[0]

    // Step 1: Highlight the node being removed
    setAnimationStates({ [headNode.id]: 'removing' })
    await sleep(animationSpeed)

    // Step 2: Actually remove the node
    pqRef.current.dequeue()
    const newQueue = pqRef.current.toArray()

    // Step 3: Show remaining nodes shifting
    if (newQueue.length > 0) {
      const shiftStates = {}
      newQueue.forEach(node => {
        shiftStates[node.id] = 'shifted'
      })
      setQueue(newQueue)
      setAnimationStates(shiftStates)
      await sleep(animationSpeed * 0.5)
    } else {
      setQueue(newQueue)
    }

    // Step 4: Clear animations
    setAnimationStates({})
    setIsAnimating(false)
  }, [isAnimating, animationSpeed])

  const handleClear = () => {
    if (isAnimating) return
    pqRef.current.clear()
    setQueue([])
    setAnimationStates({})
    setPendingNode(null)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEnqueue()
    }
  }

  // Combine queue with pending node for display
  const displayQueue = [...queue]
  if (pendingNode) {
    displayQueue.push(pendingNode)
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
          onKeyDown={handleKeyDown}
          placeholder="Enter value"
          disabled={isAnimating}
        />
        <button onClick={handleEnqueue} disabled={isAnimating || inputValue === ''}>
          Enqueue
        </button>
        <button onClick={handleDequeue} disabled={isAnimating || queue.length === 0}>
          Dequeue
        </button>
        <button onClick={handleClear} disabled={isAnimating}>
          Clear
        </button>
      </div>

      {/* Animation Speed Control */}
      <div className="speed-control">
        <label>Animation Speed: </label>
        <input
          type="range"
          min="100"
          max="1000"
          step="100"
          value={1100 - animationSpeed}
          onChange={(e) => setAnimationSpeed(1100 - Number(e.target.value))}
          disabled={isAnimating}
        />
        <span>{animationSpeed < 300 ? 'Fast' : animationSpeed < 600 ? 'Medium' : 'Slow'}</span>
      </div>

      {/* Queue Visualization */}
      <div className="queue-container">
        {displayQueue.length === 0 ? (
          <p className="empty-message">Queue is empty</p>
        ) : (
          <div className="queue">
            {displayQueue.map((node, idx) => (
              <Node
                key={node.id}
                value={node.data}
                isHead={idx === 0 && !pendingNode}
                isLast={idx === displayQueue.length - 1}
                animationState={animationStates[node.id]}
              />
            ))}
          </div>
        )}
      </div>

      {/* Animation Status */}
      {isAnimating && (
        <div className="animation-status">
          <span className="status-dot"></span>
          Animating...
        </div>
      )}

      {/* Info Panel */}
      <div className="info-panel">
        <p>Size: {queue.length}</p>
        <p>Front: {queue.length > 0 ? queue[0].data : 'N/A'}</p>
      </div>

      {/* Legend */}
      <div className="legend">
        <div className="legend-item">
          <span className="legend-color legend-head"></span>
          <span>Head (Highest Priority)</span>
        </div>
        <div className="legend-item">
          <span className="legend-color legend-comparing"></span>
          <span>Comparing</span>
        </div>
        <div className="legend-item">
          <span className="legend-color legend-inserting"></span>
          <span>Inserting</span>
        </div>
        <div className="legend-item">
          <span className="legend-color legend-removing"></span>
          <span>Removing</span>
        </div>
      </div>
    </div>
  )
}

export default App
