import React, { useState } from 'react'

const AddBook = ({ userId }) => {
  const api = 'http://localhost:5000/api/library/id/'
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [year, setYear] = useState("")
  const [image, setImage] = useState("")
  const [state, setState] = useState("")
  const [message, setMessage] = useState("")

  const handleInput = (setFunction) => {
    const handleFunc = (event) => {
      setFunction(event.target.value)
    }
    return handleFunc
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const params = { title, author, year, image, state };

    const options = {
      method: 'PUT',
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
      setMessage(`Succesfull Addition`)
    }
  }

  return (<div className="container">
    <h3>Add Book</h3>
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
      <div className="mb-3">
        <label htmlFor="author" className="form-label">Author</label>
        <input
          type="text"
          className="form-control"
          id="author"
          value={author}
          onChange={handleInput(setAuthor)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="year" className="form-label">Year</label>
        <input
          type="number"
          className="form-control"
          id="year"
          value={year}
          onChange={handleInput(setYear)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="image" className="form-label">Image URL</label>
        <input
          type="text"
          className="form-control"
          id="image"
          value={image}
          onChange={handleInput(setImage)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="state" className="form-label">Book state</label>
        <input
          type="text"
          className="form-control"
          id="state"
          value={state}
          onChange={handleInput(setState)}
        />
      </div>
      <button type="submit" className="btn btn-primary">Add</button>
      <button className="ms-2 btn btn-secondary">{message}</button>
    </form>
  </div>
  )
}

export default AddBook
