
import React, { useState } from 'react'

type Props = {
  searchPost: (formData: SearchPostFormData) => void
}

const SearchPost: React.FC<Props> = ({ searchPost }) => {
  const emptyFields = {
    content: ""
  }
  const [formData, setFormData]
    = useState<SearchPostFormData>(
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
    searchPost(formData)
  }

  const handleCancel = (e: React.FormEvent<Element>): void => {
    e.preventDefault()
    setFormData(emptyFields)
    searchPost(emptyFields)
  }

  return (
    <form className='Form' onSubmit={handleSubmit}>
      <div>
        <input onChange={handleForm} value={formData.content} type='text' id='content' />
      </div>
      <button disabled={formData === undefined ? true : false} >Search Post</button>
      <button disabled={formData === undefined ? true : false} onClick={handleCancel} >Cancel</button>
    </form>
  )
}

export default SearchPost
