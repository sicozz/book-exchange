import React from 'react'

const User = ({ user }) => {
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
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Author: {book.author}</li>
                  <li className="list-group-item">Year: {book.year}</li>
                </ul>
                {/* <p className="card-text"></p> */}
                <a href="#" className="btn btn-primary">Trade</a>
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
