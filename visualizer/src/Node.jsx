// Visual representation of a linked list node

export function Node({ value, isHead }) {
  // TODO: Render node box with value
  // TODO: Show arrow to next node
  // TODO: Highlight if isHead
  return (
    <div className="node">
      {value}
    </div>
  )
}
