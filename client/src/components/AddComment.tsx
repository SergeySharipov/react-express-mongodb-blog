
import React, { useState } from 'react'

type Props = {
  postId: string
  saveComment: (postId: string, commentContent: string) => void
}

const AddComment: React.FC<Props> = ({ postId, saveComment }) => {
  const emptyFields = {
    content: ""
  }
  const [formData, setFormData]
    = useState<AddCommentFormData>(
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
      saveComment(
        postId,
        formData.content
      )
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
        <input onChange={handleForm} value={formData.content} type='text' id='content' />
      </div>
      <button disabled={formData === undefined ? true : false} >Add Comment</button>
    </form>
  )
}

export default AddComment
