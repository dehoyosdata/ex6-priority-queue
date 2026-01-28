// Visual representation of a linked list node

export function Node({ value, isHead, isLast, animationState }) {
  const getAnimationClass = () => {
    if (!animationState) return ''
    switch (animationState) {
      case 'inserting':
        return 'node-inserting'
      case 'comparing':
        return 'node-comparing'
      case 'removing':
        return 'node-removing'
      case 'shifted':
        return 'node-shifted'
      default:
        return ''
    }
  }

  return (
    <div className={`node-wrapper ${animationState === 'inserting' ? 'wrapper-inserting' : ''}`}>
      {isHead && <span className="head-label">HEAD</span>}
      <div className={`node ${isHead ? 'node-head' : ''} ${getAnimationClass()}`}>
        <span className="node-value">{value}</span>
      </div>
      {!isLast && <span className="node-arrow">→</span>}
    </div>
  )
}
