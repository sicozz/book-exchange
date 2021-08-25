import React, { useState } from 'react'

const DeleteBook = ({ userId }) => {
  const api = 'http://localhost:5000/api/library/id/'
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")

  const handleInput = (setFunction) => {
    const handleFunc = (event) => {
      setFunction(event.target.value)
    }
    return handleFunc
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const params = { "book-title": title };

    const options = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    };

    const response = await fetch(`${api}${userId}/book`, options)
    const { error, status } = await response.json()

    if (error) {
      setMessage(`Failed to add book: ${error}`)
    } else if (status) {
      setMessage(`Succesfull Deletion`)
    }
  }

  return (<div className="container">
    <h3>Delete Book</h3>
    <form className="border rounded p-3" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={title}
          onChange={handleInput(setTitle)}
        />
      </div>
      <button type="submit" className="btn btn-primary">Delete</button>
      <button className="ms-2 btn btn-secondary">{message}</button>
    </form>
  </div>
  )
}

export default DeleteBook
