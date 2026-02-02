import { useState, useRef, useCallback } from 'react'
import { PriorityQueue } from './PriorityQueue'
import { Node } from './Node'
import './App.css'

// Pseudocode for the algorithm
const ENQUEUE_CODE = [
  { line: 'function enqueue(value):', indent: 0 },
  { line: 'create newNode with value', indent: 1 },
  { line: 'if queue is empty OR value < head.data:', indent: 1 },
  { line: 'newNode.next = head', indent: 2 },
  { line: 'head = newNode', indent: 2 },
  { line: 'else:', indent: 1 },
  { line: 'current = head', indent: 2 },
  { line: 'while current.next ≠ null AND current.next.data ≤ value:', indent: 2 },
  { line: 'current = current.next  // traverse', indent: 3 },
  { line: 'newNode.next = current.next', indent: 2 },
  { line: 'current.next = newNode', indent: 2 },
  { line: 'size++', indent: 1 },
]

const DEQUEUE_CODE = [
  { line: 'function dequeue():', indent: 0 },
  { line: 'if queue is empty:', indent: 1 },
  { line: 'return null', indent: 2 },
  { line: 'value = head.data', indent: 1 },
  { line: 'head = head.next  // remove front', indent: 1 },
  { line: 'size--', indent: 1 },
  { line: 'return value', indent: 1 },
]

function App() {
  const pqRef = useRef(new PriorityQueue())
  const [queue, setQueue] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [animationSpeed, setAnimationSpeed] = useState(500)
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationStates, setAnimationStates] = useState({})
  const [pendingNode, setPendingNode] = useState(null)

  // New learning features
  const [stepMode, setStepMode] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [explanation, setExplanation] = useState('')
  const [currentCodeLine, setCurrentCodeLine] = useState(-1)
  const [currentCode, setCurrentCode] = useState(ENQUEUE_CODE)
  const [comparisonCount, setComparisonCount] = useState(0)
  const [totalComparisons, setTotalComparisons] = useState(0)
  const [operationHistory, setOperationHistory] = useState([])
  const resolveStepRef = useRef(null)

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

  // Wait for user to click "Next Step" in step mode
  const waitForStep = useCallback(() => {
    if (!stepMode) return Promise.resolve()
    setIsPaused(true)
    return new Promise(resolve => {
      resolveStepRef.current = resolve
    })
  }, [stepMode])

  const handleNextStep = () => {
    if (resolveStepRef.current) {
      setIsPaused(false)
      resolveStepRef.current()
      resolveStepRef.current = null
    }
  }

  const addToHistory = (operation, value, comparisons = 0) => {
    const timestamp = new Date().toLocaleTimeString()
    setOperationHistory(prev => [
      { operation, value, comparisons, timestamp, id: Date.now() },
      ...prev.slice(0, 19) // Keep last 20
    ])
  }

  const handleEnqueue = useCallback(async () => {
    if (inputValue === '' || isAnimating) return
    const value = Number(inputValue)
    setInputValue('')
    setIsAnimating(true)
    setCurrentCode(ENQUEUE_CODE)
    setComparisonCount(0)
    let comparisons = 0

    const currentQueue = pqRef.current.toArray()

    // Step 1: Create new node
    setCurrentCodeLine(1)
    setExplanation(`Creating new node with value ${value}`)
    const pendingId = 'pending-' + Date.now()
    setPendingNode({ data: value, id: pendingId })
    setAnimationStates({ [pendingId]: 'inserting' })
    await waitForStep()
    await sleep(animationSpeed)

    // Check if inserting at head
    if (currentQueue.length === 0 || value < currentQueue[0].data) {
      setCurrentCodeLine(2)
      setExplanation(currentQueue.length === 0
        ? 'Queue is empty, inserting at head'
        : `${value} < ${currentQueue[0].data} (head), inserting at front`)
      await waitForStep()
      await sleep(animationSpeed * 0.5)

      setCurrentCodeLine(4)
      setExplanation(`Setting head to new node with value ${value}`)
      await waitForStep()
    } else {
      // Traverse to find insertion point
      setCurrentCodeLine(6)
      setExplanation(`${value} ≥ ${currentQueue[0].data}, need to traverse list`)
      await waitForStep()
      await sleep(animationSpeed * 0.3)

      setCurrentCodeLine(7)
      setExplanation('Starting traversal from head')
      await waitForStep()

      for (let i = 0; i < currentQueue.length; i++) {
        if (currentQueue[i].data <= value) {
          comparisons++
          setComparisonCount(comparisons)
          setCurrentCodeLine(8)
          setExplanation(`Comparing: ${currentQueue[i].data} ≤ ${value}? YES → move to next`)
          setAnimationStates({ [currentQueue[i].id]: 'comparing', [pendingId]: 'inserting' })
          await waitForStep()
          await sleep(animationSpeed * 0.6)
        } else {
          comparisons++
          setComparisonCount(comparisons)
          setCurrentCodeLine(8)
          setExplanation(`Comparing: ${currentQueue[i].data} ≤ ${value}? NO → found insertion point!`)
          setAnimationStates({ [currentQueue[i].id]: 'comparing', [pendingId]: 'inserting' })
          await waitForStep()
          await sleep(animationSpeed * 0.4)
          break
        }
      }

      setCurrentCodeLine(9)
      setExplanation('Inserting node at found position')
      await waitForStep()
    }

    // Actually insert
    pqRef.current.enqueue(value)
    setPendingNode(null)
    const newQueue = pqRef.current.toArray()

    // Find insertion index
    let insertIndex = newQueue.findIndex(n => n.data === value && !currentQueue.some(old => old.id === n.id))
    if (insertIndex === -1) insertIndex = newQueue.length - 1

    const newNode = newQueue[insertIndex]
    setQueue(newQueue)
    setAnimationStates({ [newNode.id]: 'inserting' })

    setCurrentCodeLine(11)
    setExplanation(`Node ${value} inserted! Size is now ${newQueue.length}`)
    await waitForStep()
    await sleep(animationSpeed)

    // Update totals and history
    setTotalComparisons(prev => prev + comparisons)
    addToHistory('enqueue', value, comparisons)

    // Clear
    setAnimationStates({})
    setCurrentCodeLine(-1)
    setExplanation('')
    setIsAnimating(false)
  }, [inputValue, isAnimating, animationSpeed, stepMode, waitForStep])

  const handleDequeue = useCallback(async () => {
    if (pqRef.current.isEmpty() || isAnimating) return
    setIsAnimating(true)
    setCurrentCode(DEQUEUE_CODE)
    setComparisonCount(0)

    const currentQueue = pqRef.current.toArray()
    const headNode = currentQueue[0]

    setCurrentCodeLine(1)
    setExplanation('Checking if queue is empty...')
    await waitForStep()
    await sleep(animationSpeed * 0.3)

    setCurrentCodeLine(3)
    setExplanation(`Saving head value: ${headNode.data}`)
    setAnimationStates({ [headNode.id]: 'removing' })
    await waitForStep()
    await sleep(animationSpeed)

    setCurrentCodeLine(4)
    setExplanation('Moving head pointer to next node')
    await waitForStep()

    // Actually remove
    const removedValue = pqRef.current.dequeue()
    const newQueue = pqRef.current.toArray()

    if (newQueue.length > 0) {
      const shiftStates = {}
      newQueue.forEach(node => {
        shiftStates[node.id] = 'shifted'
      })
      setQueue(newQueue)
      setAnimationStates(shiftStates)
    } else {
      setQueue(newQueue)
    }

    setCurrentCodeLine(6)
    setExplanation(`Returned ${removedValue}. Size is now ${newQueue.length}. O(1) operation - no comparisons needed!`)
    addToHistory('dequeue', removedValue, 0)
    await waitForStep()
    await sleep(animationSpeed * 0.5)

    setAnimationStates({})
    setCurrentCodeLine(-1)
    setExplanation('')
    setIsAnimating(false)
  }, [isAnimating, animationSpeed, stepMode, waitForStep])

  const handleClear = () => {
    if (isAnimating) return
    pqRef.current.clear()
    setQueue([])
    setAnimationStates({})
    setPendingNode(null)
    setComparisonCount(0)
    setTotalComparisons(0)
    setOperationHistory([])
    setCurrentCodeLine(-1)
    setExplanation('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleEnqueue()
  }

  // Combine queue with pending node for display
  const displayQueue = [...queue]
  if (pendingNode) {
    displayQueue.push(pendingNode)
  }

  return (
    <div className="app">
      <h1>Priority Queue Visualizer</h1>
      <p className="subtitle">Min-Heap using Sorted Linked List • Interactive Learning Mode</p>

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

      {/* Mode Controls */}
      <div className="mode-controls">
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={stepMode}
            onChange={(e) => setStepMode(e.target.checked)}
            disabled={isAnimating}
          />
          <span className="toggle-text">Step-by-Step Mode</span>
        </label>

        <div className="speed-control">
          <label>Speed: </label>
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
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Left: Code Panel */}
        <div className="code-panel">
          <h3>Algorithm</h3>
          <div className="code-block">
            {currentCode.map((item, idx) => (
              <div
                key={idx}
                className={`code-line ${currentCodeLine === idx ? 'code-line-active' : ''}`}
                style={{ paddingLeft: `${item.indent * 16 + 8}px` }}
              >
                <span className="line-number">{idx + 1}</span>
                {item.line}
              </div>
            ))}
          </div>

          {/* Explanation Box */}
          {explanation && (
            <div className="explanation-box">
              <strong>What's happening:</strong>
              <p>{explanation}</p>
            </div>
          )}

          {/* Next Step Button */}
          {isPaused && (
            <button className="next-step-btn" onClick={handleNextStep}>
              Next Step →
            </button>
          )}
        </div>

        {/* Right: Visualization */}
        <div className="viz-panel">
          {/* Queue Visualization */}
          <div className="queue-container">
            {displayQueue.length === 0 ? (
              <p className="empty-message">Queue is empty - enqueue a value to start!</p>
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

          {/* Complexity Tracker */}
          <div className="complexity-panel">
            <h3>Complexity Tracker</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-label">Current Comparisons</span>
                <span className="stat-value">{comparisonCount}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Total Comparisons</span>
                <span className="stat-value">{totalComparisons}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Queue Size</span>
                <span className="stat-value">{queue.length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Enqueue: O(n)</span>
                <span className="stat-value stat-note">Traverses list</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Dequeue: O(1)</span>
                <span className="stat-value stat-note">Direct access</span>
              </div>
            </div>
          </div>

          {/* Operation History */}
          <div className="history-panel">
            <h3>Operation History</h3>
            <div className="history-list">
              {operationHistory.length === 0 ? (
                <p className="history-empty">No operations yet</p>
              ) : (
                operationHistory.map(op => (
                  <div key={op.id} className={`history-item history-${op.operation}`}>
                    <span className="history-op">{op.operation}</span>
                    <span className="history-val">({op.value})</span>
                    {op.comparisons > 0 && (
                      <span className="history-comp">{op.comparisons} comparisons</span>
                    )}
                    <span className="history-time">{op.timestamp}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
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
