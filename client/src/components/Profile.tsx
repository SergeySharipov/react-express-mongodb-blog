import React, { useEffect, useState } from 'react'
import { getCurrentUser } from "../services/auth.service";
import { RouteComponentProps } from "react-router-dom";
import { getUserPosts, addPost, deletePost, likePost, commentPost } from '../services/post.service'
import AddPost from './AddPost';
import PostItem from './Post'
import SearchPost from './SearchPost';

interface RouterProps {
  history: string;
}

type Props = RouteComponentProps<RouterProps>;

const Profile: React.FC<Props> = ({ history }) => {
  const [posts, setPosts] = useState<IPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<IPost[]>([])
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUserUsername, setCurrentUserUsername] = useState(null);

  useEffect(() => {
    const user = getCurrentUser()
    if (user) {
      setCurrentUserId(user.id)
      setCurrentUserUsername(user.username)
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

  useEffect(() => {
    setFilteredPosts(posts)
  }, [posts])

  const handleSearchPost
    = (formData: SearchPostFormData): void => {
      if (!isBlank(formData.content)) {
        setFilteredPosts(posts.filter(post => post.content.includes(formData.content)))
      } else {
        setFilteredPosts(posts)
      }
    }

  function isBlank(str: string) {
    return !str || str.length === 0 || !str.trim();
  }

  const handleSavePost
    = (formData: AddPostFormData): void => {
      if (currentUserId && currentUserUsername) {
        addPost(currentUserId, currentUserUsername, formData)
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


  const handleCommentPost = (postId: string, commentContent: string): void => {
    if (currentUserId && currentUserUsername) {
      const comment: IComment = {
        userId: currentUserId,
        username: currentUserUsername,
        date: Date.now(),
        content: commentContent
      }
      commentPost(postId, comment)
        .then(({ status, data }) => {
          if (status !== 200) {
            throw new Error('Error! Post not commented')
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
        <SearchPost searchPost={handleSearchPost} />
        {currentUserId && filteredPosts.map((post: IPost) => (
          <PostItem
            key={post.id}
            currentUserId={currentUserId}
            deletePost={() => handleDeletePost(post.id)}
            likePost={() => handleLikePost(post)}
            saveComment={handleCommentPost}
            post={post}
          />
        ))}
      </div>
    </div>
  )
}

export default Profile