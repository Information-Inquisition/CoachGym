import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Trainer from './components/Trainer';
import Client from './components/Client';
import WorkoutViewer from './components/WorkoutViewer';
import WorkoutCreator from './components/WorkoutCreator';


import PropTypes from 'prop-types';
import logo from './logo.svg';
import '@material-ui/core';
import './App.css';
import { 
  TextField,
  Select,
  Button,
  MenuItem,
  ButtonGroup,
  ArrowDropDownIcon,
  withStyles
} from '@material-ui/core';
import {KeyboardDatePicker} from '@material-ui/pickers'

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
          </Switch>
        </div>
      </Router>
    );
  }
}


export default App;