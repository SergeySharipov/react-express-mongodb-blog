import React, { useState, useEffect } from 'react'
import Modal from "react-modal";

Modal.setAppElement("#root");

type Props = {
  todo: ITodo | undefined
  updateTodo: (todo: ITodo) => void
  cancelEditDialog: () => void
}

const UpdateTodoDialog: React.FC<Props> = ({ todo, updateTodo, cancelEditDialog }) => {
  const [formData, setFormData] = useState<{}>()

  React.useEffect(() => {
    setFormData(todo)
  }, [todo])

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    console.log(formData)
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    })
  }

  const handleSubmit = (e: React.FormEvent<Element>): void => {
    e.preventDefault()
    if (instanceOfITodo(formData) && !isBlank(formData.name)) {
      updateTodo(formData as ITodo)
    } else {
      alert("Name can not be empty!")
    }
  }

  function instanceOfITodo(object: any): object is ITodo {
    return object !== undefined && 'id' in object;
  }

  function isBlank(str: string) {
    return !str || str.length === 0 || !str.trim();
  }

  return (
    <Modal
      isOpen={todo !== undefined}
      contentLabel="My dialog"
      className="mymodal"
      onRequestClose={cancelEditDialog}
      overlayClassName="myoverlay">
      <form className='Form' onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor='name'>Name</label>
            <input onChange={handleForm} type='text' id='name' value={instanceOfITodo(formData) ? formData.name : ""} />
          </div>
          <div>
            <label htmlFor='description'>Description</label>
            <input onChange={handleForm} type='text' id='description' value={instanceOfITodo(formData) ? formData.description : ""} />
          </div>
        </div>
        <button disabled={formData === undefined ? true : false} >Update Todo</button>
      </form>
    </Modal>
  )
}

export default UpdateTodoDialog