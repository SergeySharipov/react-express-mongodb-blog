import React from "react"

type Props = {
  comments: Array<IComment>
}

const Comments: React.FC<Props> = ({ comments }) => {
  return (
    <div className="Card">
      <div className="Card--text">
        {comments.map((comment: IComment) => (
          <div>
            <h5>{comment.username}</h5>
            <h2>{comment.content}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Comments