import '../style/Post.css';
import icHeart from '../images/ic_heart.svg';
import icHeartFill from '../images/ic_heart_fill.svg';
import icTrash from '../images/ic_trash.svg';
import React from "react"
import Comments from './Comments';
import AddComment from './AddComment';

type Props = PostProps & {
  // updatePost: (post: IPost) => void
  deletePost: () => void
  saveComment: (postId: string, commentContent: string) => void
  likePost: () => void
  currentUserId: string
  // openEditDialog: (id: string) => void
}

const Post: React.FC<Props> = ({ post, deletePost, likePost, saveComment, currentUserId }) => {
  console.log(post.username);

  return (
    <div className="post_item-card">
      <div className="post_item-text">
        <h5>{post.username}</h5>
        <h2>{post.content}</h2>
      </div>
      <div className='post_item-row'>
        <div className='post_item-likes'>
          <div className='post_item-likes_n'>{post.likes?.length}</div>
          {post.likes?.find(like => like.userId === currentUserId)
            ? <img src={icHeartFill} alt='disLike' onClick={likePost} height="25" />
            : <img src={icHeart} alt='like' onClick={likePost} height="25" />
          }
        </div>
        {post.userId === currentUserId &&
          <img src={icTrash} alt='delete' onClick={deletePost} height="25" />}
      </div>
      {post.comments && post.comments.length > 0 && < Comments
        comments={post.comments} />}
      <AddComment
        postId={post.id}
        saveComment={saveComment} />
    </div>
  )
}

export default Post