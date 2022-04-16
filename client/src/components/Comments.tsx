import React from "react"

type Props = {
  comments: Array<IComment>
}

const Comments: React.FC<Props> = ({ comments }) => {
  return (
    <div className="Card">
      <div className="Card--text">
      <h5>Comments:</h5>
        {comments.map((comment: IComment) => (
          <div key={comment.date}>
            <h6>{comment.username}</h6>
            <h2>{comment.content}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Comments