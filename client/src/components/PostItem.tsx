import React from "react"

type Props = PostProps & {
  // updatePost: (post: IPost) => void
  deletePost: () => void
  // openEditDialog: (id: string) => void
}

const Post: React.FC<Props> = ({ post, deletePost }) => {
  return (
    <div className="Card">
      <div className="Card--text">
        <h2>{post.content}</h2>
        <span>{post.id}</span>
      </div>
      <div className="Card--button">
        <button
          className="Card--button__delete"
          onClick={deletePost}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default Post