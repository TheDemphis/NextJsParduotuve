'use client'
import { useState } from 'react'
import { Button } from '../ui/button'
function Comment({ comment }: { comment: string }) {
  const [expanded, setExpanded] = useState(false)
  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  const commentLength = comment.length > 130
  const displayComment =
    commentLength && !expanded ? comment.slice(0, 130) : comment
  return (
    <div>
      <p className="text-sm">{displayComment}</p>
      {commentLength && (
        <Button
          variant="link"
          className="text-muted-foreground"
          onClick={toggleExpanded}
        >
          {expanded ? 'Rodyti mažiau' : 'Rodyti daugiau'}
        </Button>
      )}
    </div>
  )
}
export default Comment
