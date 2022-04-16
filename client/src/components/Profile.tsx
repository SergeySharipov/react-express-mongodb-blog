import React, { useEffect, useState } from 'react'
import { getCurrentUser } from "../services/auth.service";
import { RouteComponentProps } from "react-router-dom";
import { getUsersPosts, getUserPosts, addPost, updatePost, deletePost } from '../services/post.service'
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
      <div className='postApp'>
        <h1>My Posts</h1>
        <AddPost savePost={handleSavePost} />
        {posts.map((post: IPost) => (
          <PostItem
            key={post.id}
            // updatePost={handleUpdatePost}
            deletePost={() => handleDeletePost(post.id)}
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
      </div>
    </div>
  )
}

export default Profile