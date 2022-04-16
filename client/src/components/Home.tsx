import React, { useEffect, useState } from 'react'
import PostItem from './Post'
import { getUsersPosts, addPost, deletePost, likePost, commentPost } from '../services/post.service'
import AddPost from './AddPost'
import { getCurrentUser } from "../services/auth.service";
import { Link } from 'react-router-dom'
import { login, register } from "../services/auth.service";
import { RouteComponentProps } from "react-router-dom";
import SearchPost from './SearchPost';

interface RouterProps {
  history: string;
}

type Props = RouteComponentProps<RouterProps>;

const Home: React.FC<Props> = ({ history }) => {
  const [posts, setPosts] = useState<IPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<IPost[]>([])
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUserUsername, setCurrentUserUsername] = useState(null);

  useEffect(() => {
    const user = getCurrentUser()
    if (user) {
      setCurrentUserUsername(user.username)
      setCurrentUserId(user.id)
    }
  }, [])

  useEffect(() => {
    function fetchPosts() {
      if (currentUserId) {
        getUsersPosts()
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
            setPosts(data.usersPosts)
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
          setPosts(data.usersPosts)
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
          setPosts(data.usersPosts)
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
          setPosts(data.usersPosts)
        })
        .catch((err) => console.log(err))
    }
  }

  const demoLogin = async () => {
    const dateStr = Date.now();
    const username = `Test${dateStr}`;
    const email = `${dateStr}@test.ca`;
    const password = `${dateStr}`;

    await register(username, email, password);
    await login(email, password);

    history.push("/");
    window.location.reload();
  }

  return (
    <div className="container">
      {!currentUserId && <div className='unauthorised'>
        <div className="col-md-12">
          <div className="card card-container">
            <h1>Welcome</h1>
            <div className="form-group">
              <Link to={"/login"} className="btn btn-primary btn-block mb-3">
                Login
              </Link>
              <Link to={"/register"} className="btn btn-secondary btn-block mb-3">
                Sign Up
              </Link>
              <button onClick={demoLogin} className="btn btn-primary btn-block">
                <span>Demo Login</span>
              </button>
            </div>
          </div>
        </div>
      </div>}
      {currentUserId && <div className='postApp'>
        <h1>All Posts</h1>
        <AddPost savePost={handleSavePost} />
        <SearchPost searchPost={handleSearchPost} />
        {filteredPosts.map((post: IPost) => (
          <PostItem
            key={post.id}
            currentUserId={currentUserId}
            deletePost={() => handleDeletePost(post.id)}
            likePost={() => handleLikePost(post)}
            saveComment={handleCommentPost}
            post={post}
          />
        ))}
      </div>}
    </div>
  )
}

export default Home