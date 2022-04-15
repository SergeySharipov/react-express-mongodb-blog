import { Response, Request } from "express"
import { ITodo } from "../types/types"
import Todo from "../models/todo"

const getTodos = async (req: Request, res: Response): Promise<void> => {
    try {
        const todos: ITodo[] = await Todo.find({ creator: req.userId }).sort({ status: 1, updatedAt: -1, createdAt: -1 })
        res.status(200).json({ todos })
    } catch (error) {
        throw error
    }
}

const addTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<ITodo, "name" | "description" | "status" | "creator">

        const todo: ITodo = new Todo({
            name: body.name,
            description: body.description,
            status: body.status,
            creator: body.creator
        })

        const newTodo: ITodo = await todo.save()
        const allTodos: ITodo[] = await Todo.find({ creator: req.userId }).sort({ status: 1, updatedAt: -1, createdAt: -1 })

        res.status(201).json({ 
            message: "Todo added", 
            todo: newTodo, 
            todos: allTodos 
        })
    } catch (error) {
        throw error
    }
}

const updateTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: { todoId },
            body,
        } = req
        const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
            {
                _id: todoId
            },
            body
        )
        const allTodos: ITodo[] = await Todo.find({ creator: req.userId }).sort({ status: 1, updatedAt: -1, createdAt: -1 })
        res.status(200).json({
            message: "Todo updated",
            todo: updateTodo,
            todos: allTodos,
        })
    } catch (error) {
        throw error
    }
}

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(req.params.todoId)

        const allTodos: ITodo[] = await Todo.find({ creator: req.userId }).sort({ status: 1, updatedAt: -1, createdAt: -1 })
        res.status(200).json({
            message: "Todo deleted",
            todo: deletedTodo,
            todos: allTodos,
        })
    } catch (error) {
        throw error
    }
}

const deleteAllTodos = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedTodo = await Todo.deleteMany({ creator: req.userId })

        const allTodos: ITodo[] = await Todo.find({ creator: req.userId }).sort({ status: 1, updatedAt: -1, createdAt: -1 })
        res.status(200).json({
            message: "Deleted Todos count: " + deletedTodo.deletedCount,
            todos: allTodos,
        })
    } catch (error) {
        throw error
    }
}

export { getTodos, addTodo, updateTodo, deleteTodo, deleteAllTodos }