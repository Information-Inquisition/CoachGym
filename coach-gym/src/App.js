import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Trainer from './components/Trainer';
import Client from './components/Client';
import WorkoutViewer from './components/WorkoutViewer';
import WorkoutCreator from './components/WorkoutCreator';
import Profile from './components/Profile';

import '@material-ui/core';
import './App.css';

class App extends Component {
  
    render(){
      return (
        <Router>
        <div>
          <Switch>
              <Route exact path='/' component={Login} />
              <Route exact path='/trainer' component={Trainer} />
              <Route exact path='/client' component={Client} />
              <Route exact path='/workoutviewer' component={WorkoutViewer} />
              <Route exact path='/workoutcreator' component={WorkoutCreator} />
              <Route exact path='/profile' component={Profile} />
          </Switch>
        </div>
      </Router>
    );
  }
}


export default App;