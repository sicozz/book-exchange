import { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// Components
import Banner from './components/banner'
import Edition from './components/edition'
import Exchange from './components/exchange'
import Home from './components/home'
import NavBar from './components/navBar'
import SingIn from './components/singIn'
import SingUp from './components/singUp'

function App() {
  const [userId, setUserId] = useState("")
  return (<Router>
    <div className="App">
      <NavBar userId={userId} setUserId={setUserId} />
      <Switch>
        <Route exact path="/">
          <Banner />
          <Home userId={userId} />
        </Route>
        <Route exact path="/sing-up">
          <SingUp setUserId={setUserId} />
        </Route>
        <Route exact path="/sing-in">
          <SingIn setUserId={setUserId} />
        </Route>
        <Route exact path="/exchange">
          <Exchange userId={userId} />
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
