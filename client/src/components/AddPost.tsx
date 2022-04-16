
import React, { useState } from 'react'

type Props = {
  savePost: (formData: AddPostFormData) => void
}

const AddPost: React.FC<Props> = ({ savePost }) => {
  const emptyFields = {
    content: ""
  }
  const [formData, setFormData]
    = useState<AddPostFormData>(
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
    if (!isBlank(formData.content)) {
      savePost(formData)
      setFormData(emptyFields)
    } else {
      alert("Content can not be empty!")
    }
  }

  function isBlank(str: string) {
    return !str || str.length === 0 || !str.trim();
  }

  return (
    <form className='Form' onSubmit={handleSubmit}>
      <div>
        <label htmlFor='content'>Content</label>
        <input onChange={handleForm} value={formData.content} type='text' id='content' />
      </div>
      <button disabled={formData === undefined ? true : false} >Add Post</button>
    </form>
  )
}

export default AddPost
