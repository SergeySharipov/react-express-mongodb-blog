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

export const getTodos = async (
    currentUserId: string
): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const todos: AxiosResponse<ApiDataType> = await axios.get(
            `${API_URL}/user/${currentUserId}/todos`, { headers: authHeader() });
        return todos
    } catch (e) {
        catchUnauthorizedError(e)
        throw e
    }
}

export const addTodo = async (
    currentUserId: string,
    formData: AddTodoFormData
): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const todo: Omit<ITodo, "id"> = {
            name: formData.name,
            description: formData.description,
            status: false,
            creator: currentUserId
        }
        const saveTodo: AxiosResponse<ApiDataType> = await axios.post(
            `${API_URL}/user/${currentUserId}/todo`,
            todo
            , { headers: authHeader() });
        return saveTodo
    } catch (e) {
        catchUnauthorizedError(e)
        throw e
    }
}

export const updateTodo = async (
    currentUserId: string,
    todo: ITodo
): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const updatedTodo: AxiosResponse<ApiDataType> = await axios.put(
            `${API_URL}/user/${currentUserId}/todo/${todo.id}`,
            todo
            , { headers: authHeader() });
        return updatedTodo
    } catch (e) {
        catchUnauthorizedError(e)
        throw e
    }
}

export const deleteTodo = async (
    currentUserId: string,
    todoId: string
): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const deletedTodo: AxiosResponse<ApiDataType> = await axios.delete(
            `${API_URL}/user/${currentUserId}/todo/${todoId}`
            , { headers: authHeader() });
        return deletedTodo
    } catch (e) {
        catchUnauthorizedError(e)
        throw e
    }
}

export const deleteAllTodos = async (
    currentUserId: string,
): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const deletedTodo: AxiosResponse<ApiDataType> = await axios.delete(
            `${API_URL}/user/${currentUserId}/todos/`
            , { headers: authHeader() });
        return deletedTodo
    } catch (e) {
        catchUnauthorizedError(e)
        throw e
    }
}