import React from "react"

type Props = PostProps & {
  // updatePost: (post: IPost) => void
  deletePost: () => void
  likePost: () => void
  isUserOwner: boolean
  // openEditDialog: (id: string) => void
}

const Post: React.FC<Props> = ({ post, isUserOwner, deletePost, likePost }) => {
  return (
    <div className="Card">
      <div className="Card--text">
        <h2>{post.content}</h2>
      </div>
      {isUserOwner && <div className="Card--button">
        <button
          className="Card--button__delete"
          onClick={deletePost}>
          Delete
        </button>
      </div>}
      <div className="Card--button">
        <button
          className="Card--button__like"
          onClick={likePost}>
          Like
        </button>
      </div>
    </div>
  )
}

export default Post