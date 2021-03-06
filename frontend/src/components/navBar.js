import { Link } from 'react-router-dom'

const NavBar = ({ userId, setUserId }) => {
  if (userId !== "") {
    return (<nav className="navbar navbar-expand-lg fixed-top navbar-dark p-2">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">El Mundo del Lector</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/exchange">Exchanges</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/edition">Edit Books</Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/"
                onClick={() => setUserId("")}>
                Log-Out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    )
  }
  else {
    return (<nav className="navbar navbar-expand-lg fixed-top navbar-dark p-2">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">El Mundo del Lector</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sing-up/">Sing Up</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sing-in/">Sing In</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    )
  }
}

export default NavBar
