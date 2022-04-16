import axios, { AxiosResponse, AxiosError } from "axios"
import authHeader from "./auth-header";
import * as AuthService from "./auth.service";
import API_URL from '../utills/config'

const logOut = () => {
  AuthService.logout();
  window.location.reload();
};

const catchUnauthorizedError = (e: unknown) => {
  if ((e as AxiosError).response) {
    if ((e as AxiosError).response?.status === 401) {
      alert("Session token expired. Please log in.")
      logOut()
    }
  }
};

export const getUsersPosts = async (): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const posts: AxiosResponse<ApiDataType> = await axios.get(
      `${API_URL}/api/post/all`, { headers: authHeader() });
    return posts
  } catch (e) {
    catchUnauthorizedError(e)
    throw e
  }
}

export const getUserPosts = async (
  currentUserId: string
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const posts: AxiosResponse<ApiDataType> = await axios.get(
      `${API_URL}/api/post/`, { headers: authHeader() });
    return posts
  } catch (e) {
    catchUnauthorizedError(e)
    throw e
  }
}

export const addPost = async (
  currentUserId: string,
  currentUserUsername: string,
  formData: AddPostFormData
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const post: Omit<IPost, "id"> = {
      content: formData.content,
      userId: currentUserId,
      username: currentUserUsername
    }
    const savePost: AxiosResponse<ApiDataType> = await axios.post(
      `${API_URL}/api/post`,
      post
      , { headers: authHeader() });
    return savePost
  } catch (e) {
    catchUnauthorizedError(e)
    throw e
  }
}

export const updatePost = async (
  currentUserId: string,
  post: IPost
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const updatedPost: AxiosResponse<ApiDataType> = await axios.put(
      `${API_URL}/api/post/${post.id}`,
      post
      , { headers: authHeader() });
    return updatedPost
  } catch (e) {
    catchUnauthorizedError(e)
    throw e
  }
}

export const likePost = async (
  postId: string,
  isLike: boolean
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const updatedPost: AxiosResponse<ApiDataType> = await axios.put(
      `${API_URL}/api/post/${postId}/like`,
      { isLike: isLike }
      , { headers: authHeader() });
    return updatedPost
  } catch (e) {
    catchUnauthorizedError(e)
    throw e
  }
}

export const commentPost = async (
  postId: string,
  comment: IComment
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const updatedPost: AxiosResponse<ApiDataType> = await axios.put(
      `${API_URL}/api/post/${postId}/comment`,
      comment
      , { headers: authHeader() });
    return updatedPost
  } catch (e) {
    catchUnauthorizedError(e)
    throw e
  }
}

export const deletePost = async (
  currentUserId: string,
  postId: string
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const deletedPost: AxiosResponse<ApiDataType> = await axios.delete(
      `${API_URL}/api/post/${postId}`
      , { headers: authHeader() });
    return deletedPost
  } catch (e) {
    catchUnauthorizedError(e)
    throw e
  }
}