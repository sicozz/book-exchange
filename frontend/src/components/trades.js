import Trade from './trade'

const Trades = ({ userId, tradeList }) => {
  if (tradeList.length === 0) {
    return (<div>
      <h3>There are no trades yet :(</h3>
    </div>)
  } else {
    return (<div>
      <h3>Trades</h3>
      <ul className="list-group">
        {tradeList.map((trade, index) => {
          return <Trade key={`trade_${userId}_${index}`} trade={trade} />
        })}
      </ul>
    </div>)
  }
}

export default Trades
