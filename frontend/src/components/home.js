import { useState, useEffect } from 'react'
import Users from './users'

const api = 'http://localhost:5000/api/library/'

const Home = ({ userId }) => {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])

  const [author, setAuthor] = useState("")
  const [bookTitle, setBookTitle] = useState("")
  const [userName, setUserName] = useState("")

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
      <div className="first container bg-light pt-4">
        <div className="row">
          <form className="col">
            <input
              className="Nameform-control me-2"
              type="search"
              placeholder="Search by Title"
              aria-label="Search"
              value={bookTitle}
              onInput={(event) => setBookTitle(event.target.value)} />
            <button
              className="btn btn-outline-success me-2"
              type="submit"
              onClick={() => fetchUsers(`${api}?book-title=${bookTitle}`)}>
              Title
            </button>
          </form>

          <form className="col">
            <input
              className="Nameform-control me-2"
              type="search"
              placeholder="Search by Author"
              aria-label="Search"
              value={author}
              onInput={(event) => setAuthor(event.target.value)} />
            <button
              className="btn btn-outline-success me-2"
              type="submit"
              onClick={() => fetchUsers(`${api}?author=${author}`)}>
              Author
            </button>
          </form>

          <form className="col">
            <input
              className="Nameform-control me-2"
              type="search"
              placeholder="Search by User Name"
              aria-label="Search"
              value={userName}
              onInput={(event) => setUserName(event.target.value)} />
            <button
              className="btn btn-outline-success me-2"
              type="submit"
              onClick={() => fetchUsers(`${api}?user-name=${userName}`)}>
              User
            </button>
          </form>
        </div>
      </div>

      {/* Users */}
      <div className="bg-light">
        <Users users={users} />
      </div>
    </div >
    )
  }
}

export default Home
