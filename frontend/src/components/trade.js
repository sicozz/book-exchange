import { useState, useEffect } from 'react'

const Trade = ({ trade }) => {
  const url = 'http://localhost:5000/api/library/get-user-name/id/'
  const [fromUserName, setFromUserName] = useState("")

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
    fetchUserName(`${url}${trade.from}`, setFromUserName)
  }, [])

  return (<li className="list-group-item">
    {`${fromUserName} is interested in `} <b>{trade.book_title}</b>
  </li>)
}

export default Trade
