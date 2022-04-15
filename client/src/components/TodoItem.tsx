import React from "react"

type Props = TodoProps & {
  updateTodo: (todo: ITodo) => void
  deleteTodo: (id: string) => void
  openEditDialog: (id: string) => void
}

const Todo: React.FC<Props> = ({ todo, updateTodo, deleteTodo, openEditDialog }) => {
  const checkTodo: string = todo.status ? `line-through` : ""
  return (
    <div className="Card">
      <div className="Card--checkbox_container"
        onClick={() => {
          const updatedTodo: ITodo = {
            ...todo,
            status: !todo.status,
          }
          updateTodo(updatedTodo)
        }
        }>
        <input
          className="Card--checkbox"
          type="checkbox"
          readOnly
          checked={todo.status}
        />
        <span className="Card--checkbox_checkmark" />
      </div>
      <div className="Card--text" onClick={() => openEditDialog(todo.id)}>
        <h2 className={checkTodo}>{todo.name}</h2>
        <span className={checkTodo}>{todo.description}</span>
      </div>
      <div className="Card--button">
        <button
          onClick={() => deleteTodo(todo.id)}
          className="Card--button__delete"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default Todo