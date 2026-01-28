// Visual representation of a linked list node

export function Node({ value, isHead, isLast }) {
  return (
    <div className="node-wrapper">
      {isHead && <span className="head-label">HEAD</span>}
      <div className={`node ${isHead ? 'node-head' : ''}`}>
        <span className="node-value">{value}</span>
      </div>
      {!isLast && <span className="node-arrow">→</span>}
    </div>
  )
}
