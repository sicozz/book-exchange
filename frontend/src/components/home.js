import { useState, useEffect } from 'react'
import Users from './users'

const api = 'http://localhost:5000/api/library/'

const Home = ({ userId }) => {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])

  const [input, setInput] = useState("")

  const fetchUsers = async (url) => {
    setLoading(true)
    try {
      const response = await fetch(url)
      const { users } = await response.json()
      setUsers(users)
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers(api)
  }, [])

  if (loading) {
    return (<h1>loading...</h1>)
  } else {
    return (<div className="bg-light">
      {/* Search section */}
      <div className="container bg-light pt-4">
        <form className="d-flex justify-content-center">
          <input
            className="Nameform-control me-2 search-bar border rounded"
            type="search"
            placeholder="Search books"
            aria-label="Search"
            value={input}
            onInput={(event) => setInput(event.target.value)} />
          <button
            className="btn btn-outline-success me-2"
            type="submit"
            onClick={() => fetchUsers(`${api}?book-title=${input}`)}>
            Title
          </button>
          <button
            className="btn btn-outline-success me-2"
            type="submit"
            onClick={() => fetchUsers(`${api}?author=${input}`)}>
            Author
          </button>
          <button
            className="btn btn-outline-success me-2"
            type="submit"
            onClick={() => fetchUsers(`${api}?user-name=${input}`)}>
            User
          </button>
        </form>
      </div>

      {/* Users */}
      <div className="bg-light">
        <Users userId={userId} users={users} />
      </div>
    </div >
    )
  }
}

export default Home
