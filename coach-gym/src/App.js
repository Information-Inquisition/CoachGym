import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Trainer from './components/Trainer';
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
        <Login/>
    );
  }
}


export default App;
