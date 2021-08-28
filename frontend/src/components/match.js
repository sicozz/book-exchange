import { useState, useEffect } from 'react'

const Match = ({ match }) => {
  const url = 'http://localhost:5000/api/library/get-user-name/id/'
  const [user0UserName, setUser0UserName] = useState("")
  const [user1UserName, setUser1UserName] = useState("")

  const fetchUserName = async (url, setFunc) => {
    try {
      const response = await fetch(url)
      const { user_name } = await response.json()
      setFunc(user_name)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchUserName(`${url}${match.user0}`, setUser0UserName)
    fetchUserName(`${url}${match.user1}`, setUser1UserName)
  }, [])

  return (<li className="list-group-item">
    {`${user0UserName} and ${user1UserName} matched with `}
    <b>{match.book_title0}</b> for <b>{match.book_title1}</b>
  </li>)
}

export default Match
