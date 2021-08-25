import React, { useState } from 'react'

const SingIn = ({ setUserId }) => {
  const apiSingIn = 'http://localhost:5000/api/library/sing-in/'
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const handleInput = (setFunction) => {
    const handleFunc = (event) => {
      setFunction(event.target.value)
    }
    return handleFunc
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const params = {
      "user-name": userName,
      password: password,
    };

    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    };

    const response = await fetch(apiSingIn, options)
    const { body, _id } = await response.json()

    if (body) {
      setMessage(`Failed Log-In: ${body}`)
    } else if (_id) {
      setUserId(_id)
      setMessage(`Succesfull Log-In!!`)
    }

    // Continuar, poner recuadro de respuesta
  }

  return (<div className="first container p-4">
    <h3>Log In</h3>
    <form className="border rounded p-3" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="user-name" className="form-label">User Name</label>
        <input
          type="text"
          className="form-control"
          id="user-name"
          value={userName}
          onChange={handleInput(setUserName)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={handleInput(setPassword)}
        />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
      <button className="ms-2 btn btn-secondary">{message}</button>
    </form>
  </div>
  )
}

export default SingIn
