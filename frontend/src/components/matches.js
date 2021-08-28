import Match from './match'

const Matches = ({ userId, matchList }) => {
  if (matchList.length === 0) {
    return (<div>
      <h3>There are no matches yet :(</h3>
    </div>)
  } else {
    return (<div>
      <h3>Matches</h3>
      <ul className="list-group">
        {matchList.map((match, index) => {
          return <Match key={`match_${userId}_${index}`} match={match} />
        })}
      </ul>
    </div>)
  }
}

export default Matches
