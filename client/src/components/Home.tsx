import React, { useEffect, useState } from 'react'
import PostItem from './PostItem'
import { getUsersPosts,getUserPosts, addPost, updatePost, deletePost } from '../services/post.service'
import AddPost from './AddPost'
/*
import UpdatePostDialog from './UpdatePostDialog'
*/
import { getCurrentUser } from "../services/auth.service";
import { Link } from 'react-router-dom'
import { login, register } from "../services/auth.service";
import { RouteComponentProps } from "react-router-dom";

interface RouterProps {
  history: string;
}

type Props = RouteComponentProps<RouterProps>;

const Home: React.FC<Props> = ({ history }) => {
  /*
  const [editPostId, setEditPostId] = useState("");
  */
  const [posts, setPosts] = useState<IPost[]>([])
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const user = getCurrentUser()
    if (user) {
      setCurrentUserId(user.id)
    }
  }, [])

  useEffect(() => {
    function fetchPosts() {
      if (currentUserId) {
        getUsersPosts(currentUserId)
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
          setPosts(data.posts)
        })
        .catch((err) => console.log(err))
    }
  }
  /*
  
  
    const handleUpdatePost = (post: IPost): void => {
      cancelEditDialog()
      if (currentUserId) {
        updatePost(currentUserId, post)
          .then(({ status, data }) => {
            if (status !== 200) {
              throw new Error('Error! Post not updated')
            }
            setPosts(data.posts)
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
            setPosts(data.posts)
          })
          .catch((err) => console.log(err))
      }
    }
  
    function handleOpenEditDialog(id: string) {
      setEditPostId(id);
    }
  
    function cancelEditDialog() {
      if (editPostId !== "") {
        setEditPostId("")
      }
    }
    */

  const demoLogin = async () => {
    const dateStr = Date.now();
    const username = `Test${dateStr}`;
    const email = `${dateStr}@test.ca`;
    const password = `${dateStr}`;

    await register(username, email, password);
    await login(username, password);

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
        <h1>My Posts</h1>
        <AddPost savePost={handleSavePost} />
        {posts.map((post: IPost) => (
          <PostItem
            key={post.id}
            // updatePost={handleUpdatePost}
            // deletePost={handleDeletePost}
            // openEditDialog={handleOpenEditDialog}
            post={post}
          />
        ))}
        {/* <UpdatePostDialog
          post={
            editPostId !== ""
              ? posts.find(post => post.id === editPostId)
              : undefined
          }
          updatePost={handleUpdatePost}
          cancelEditDialog={cancelEditDialog}
        /> */}
      </div>}
    </div>
  )
}

export default Home