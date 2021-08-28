import { useState, useEffect } from 'react'
import Matches from './matches'
import Trades from './trades'

const Exchange = ({ userId }) => {
  const url = 'http://localhost:5000/api/library/exchange/'

  const [matchList, setMatchList] = useState([])
  const [tradeList, setTradeList] = useState([])

  const fetchMatches = async (path) => {
    try {
      const response = await fetch(path)
      const { matches } = await response.json()
      setMatchList(matches)
      console.log(`Matches: ${matches}`)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchTrades = async (path) => {
    try {
      const response = await fetch(path)
      const { trades } = await response.json()
      setTradeList(trades)
      console.log(`Trades: ${trades}`)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchMatches(`${url}id/${userId}/match`)
    fetchTrades(`${url}id/${userId}/trade`)
  }, [])

  return (<div className="first container pt-5">
    <div className="mb-5">
      <Matches userId={userId} matchList={matchList} />
    </div>
    <Trades userId={userId} tradeList={tradeList} />
  </div>)
}

export default Exchange
