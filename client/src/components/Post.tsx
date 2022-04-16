import '../style/Post.css';
import React from "react"
import Comments from './Comments';
import AddComment from './AddComment';

type Props = PostProps & {
  // updatePost: (post: IPost) => void
  deletePost: () => void
  saveComment: (postId: string, commentContent: string) => void
  likePost: () => void
  isUserOwner: boolean
  // openEditDialog: (id: string) => void
}

const Post: React.FC<Props> = ({ post, isUserOwner, deletePost, likePost, saveComment }) => {
  return (
    <div className="post_item-card">
      <div className="post_item-text">
        <h2>{post.content}</h2>
      </div>
      {isUserOwner && <div className="post_item-button">
        <button
          className="post_item-delete"
          onClick={deletePost}>
          Delete
        </button>
      </div>}
      <div className="post_item-button">
        <button
          className="post_item-like"
          onClick={likePost}>
          Like
        </button>
      </div>
      <AddComment
        postId={post.id}
        saveComment={saveComment} />
      {post.comments && post.comments.length > 0 && < Comments
        comments={post.comments} />}
    </div>
  )
}

export default Post