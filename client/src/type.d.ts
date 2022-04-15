interface ITodo {
  id: string
  creator: string
  name: string
  description?: string
  status: boolean
  createdAt?: string
  updatedAt?: string
}

interface AddTodoFormData {
  name: string
  description: string
}

interface TodoProps {
  todo: ITodo
}

type ApiDataType = {
  message: string
  status: string
  todos: ITodo[]
  todo?: ITodo
}