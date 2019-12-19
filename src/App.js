import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import './App.css';

import Feed from './components/Feed';
import Login from './components/Login';
import Logout from './components/Logout';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Authenticate from './components/Authenticate';

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/home" component={Feed}/>
        <Route path="/logout" component={Logout}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/profile/:handle" component={Profile}/>
        <Route path="/" exact component={Authenticate}/>
      </Switch>
    </HashRouter>
  );
}

export default App;
