import React, { useEffect, useState } from 'react'
import { getCurrentUser } from "../services/auth.service";
import { RouteComponentProps } from "react-router-dom";
import { getUserPosts, addPost, deletePost, likePost } from '../services/post.service'
import AddPost from './AddPost';
import PostItem from './PostItem'

interface RouterProps {
  history: string;
}

type Props = RouteComponentProps<RouterProps>;

const Profile: React.FC<Props> = ({ history }) => {
  const [posts, setPosts] = useState<IPost[]>([])
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const user = getCurrentUser()
    if (user) {
      setCurrentUserId(user.id)
    } else {
      history.push("/login");
      window.location.reload();
    }
  }, [history])

  useEffect(() => {
    function fetchPosts() {
      if (currentUserId) {
        getUserPosts(currentUserId)
          .then(({ data: { posts } }: IPost[] | any) => setPosts(posts))
          .catch((err: Error) => console.log(err))
      }
    }
    if (currentUserId !== null) {
      fetchPosts()
    }
  }, [currentUserId])

  const handleSavePost
    = (formData: AddPostFormData): void => {
      if (currentUserId) {
        addPost(currentUserId, formData)
          .then(({ status, data }) => {
            if (status !== 201) {
              throw new Error('Error! Post not saved')
            }
            setPosts(data.userPosts)
          })
          .catch((err) => console.log(err))
      }
    }

  const handleDeletePost = (id: string): void => {
    if (currentUserId) {
      deletePost(currentUserId, id)
        .then(({ status, data }) => {
          if (status !== 200) {
            throw new Error('Error! Post not deleted')
          }
          setPosts(data.userPosts)
        })
        .catch((err) => console.log(err))
    }
  }

  const handleLikePost = (post: IPost): void => {
    if (currentUserId) {
      let like = post.likes?.find(like => like.userId === currentUserId)

      likePost(post.id, like === undefined)
        .then(({ status, data }) => {
          if (status !== 200) {
            throw new Error('Error! Post not liked')
          }
          setPosts(data.userPosts)
        })
        .catch((err) => console.log(err))
    }
  }

  return (
    <div className="container">
      <div className='postApp'>
        <h1>My Posts</h1>
        <AddPost savePost={handleSavePost} />
        {posts.map((post: IPost) => (
          <PostItem
            key={post.id}
            isUserOwner={true}
            deletePost={() => handleDeletePost(post.id)}
            likePost={() => handleLikePost(post)}
            post={post}
          />
        ))}
      </div>
    </div>
  )
}

export default Profile