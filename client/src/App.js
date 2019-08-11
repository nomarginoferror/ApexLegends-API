import React, { Fragment } from 'react';
import Dashboard from './pages/Dashboard';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route path='/profile/:platform/:gamerTag' component={Profile} />
      </Switch>
    </Router>
  );
}

export default App;
