import React, { useState } from 'react'

type Props = {
  saveTodo: (formData: AddTodoFormData) => void
}

const AddTodo: React.FC<Props> = ({ saveTodo }) => {
  const emptyFields = {
    "name": "",
    "description": ""
  }
  const [formData, setFormData]
    = useState<AddTodoFormData>(
      emptyFields
    )

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value
    })
  }

  const handleSubmit = (e: React.FormEvent<Element>): void => {
    e.preventDefault()
    if (!isBlank(formData.name)) {
      saveTodo(formData)
      setFormData(emptyFields)
    } else {
      alert("Name can not be empty!")
    }
  }

  function isBlank(str: string) {
    return !str || str.length === 0 || !str.trim();
  }

  return (
    <form className='Form' onSubmit={handleSubmit}>
      <div>
        <label htmlFor='name'>Name</label>
        <input onChange={handleForm} value={formData.name} type='text' id='name' />
      </div>
      <div>
        <label htmlFor='description'>Description</label>
        <input onChange={handleForm} value={formData.description} type='text' id='description' />
      </div>
      <button disabled={formData === undefined ? true : false} >Add Todo</button>
    </form>
  )
}

export default AddTodo