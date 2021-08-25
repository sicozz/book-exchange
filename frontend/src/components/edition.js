import AddBook from './addBook'
import DeleteBook from './deleteBook'

const Edition = ({ userId }) => {
  return (<div className="first container p-5">
    <div className="row">
      <div className="col">
        <AddBook userId={userId} />
      </div>
      <div className="col">
        <DeleteBook userId={userId} />
      </div>
    </div>
  </div>
  )
}

export default Edition
