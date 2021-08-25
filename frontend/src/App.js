import { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// Components
import NavBar from './components/navBar'
import Home from './components/home'
import SingUp from './components/singUp'
import SingIn from './components/singIn'
import Edition from './components/edition'


function App() {
  const [userId, setUserId] = useState("")
  return (<Router>
    <div className="App">
      {/* Navbar */}
      <NavBar userId={userId} setUserId={setUserId} />
      <Switch>
        <Route exact path="/">
          <Home userId={userId} />
        </Route>
        <Route exact path="/sing-up">
          <SingUp setUserId={setUserId} />
        </Route>
        <Route exact path="/sing-in">
          <SingIn setUserId={setUserId} />
        </Route>
        <Route exact path="/edition">
          <Edition userId={userId} />
        </Route>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
