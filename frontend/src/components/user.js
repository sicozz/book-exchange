const User = ({ userId, user }) => {
  const url = 'http://localhost:5000/api/library/exchange/'

  const trade = async (bookTitle) => {
    try {
      const params = { to: user._id, "book-title": bookTitle };

      const options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      };

      const response = await fetch(`${url}id/${userId}/trade`, options)
      const { body, status } = await response.json()
    } catch (err) {
      console.log(err)
    }
  }
  return (<div className="container bg-light text-dark">
    <h4 className="m-3">{`${user.user_name}: ${user.number}`}</h4>
    <div className="container">
      <div className="row text-center g-4">
        {user.books.map((book, index) => {
          return (<div key={`${user.user_name}_${index}`} className="col-md">
            <div className="card text-center">
              <img src={book.image} className="card-img-top" alt="book cover" />
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <ul className="list-group list-group-flush mb-1">
                  <li className="list-group-item">Author: {book.author}</li>
                  <li className="list-group-item">Year: {book.year}</li>
                  <li className="list-group-item">State: {book.state}</li>
                </ul>
                {/* <p className="card-text"></p> */}
                <button
                  className="btn btn-primary"
                  onClick={() => trade(book.title)}>
                  Trade
                </button>
              </div>
            </div>
          </div>
          )
        })}
      </div>
    </div>
  </div>
  )
}

export default User
