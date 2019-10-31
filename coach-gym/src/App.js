import React, {Component} from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import '@material-ui/core';
import './App.css';
import { 
  TextField,
  Button,
  ButtonGroup,
  ArrowDropDownIcon,
  withStyles
} from '@material-ui/core';
import {KeyboardDatePicker} from '@material-ui/pickers'

const styles = {
  textField: {
    marginLeft: '8px',
    marginRight: '8px',
    width: 200,
  },
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signIn: true,
    };

    
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    const { signIn } = this.state;
    if (signIn) {
      this.setState({ signIn: false });
    } else {
      this.setState({ signIn: true });
    }
  }  

  render() {
    const {signIn} = this.state;
    const {selectedDate} = this.state;
    const { classes } = this.props;

    return (
      <div className="App">
        <div id="title">
          <header className="App-header">
          <h1>
            Gym Coach
          </h1>
          </header>
          <p className="App-header2">
            Your fitness training manager
          </p>
        </div>

        {signIn &&
          <div>
            <form className="container" noValidate autoComplete="off">
              <div>
                <TextField
                  margin="normal" 
                  id="username"
                  label="Username"
                />
              </div>
              <div>
                <TextField
                  margin="normal"
                  id="password"
                  label="Password"
                  type="password"
                />
              </div> 
            </form>
            <div className="button">
              <Button 
                variant="contained" 
                color="primary"
              >
                Log In
              </Button>
            </div>
            <div className="button">
              <Button
                variant="contained"
                onClick = {this.handleClick}
              >
                Sign Up
              </Button>
            </div>
          </div>
        }

        
        {!signIn &&
          <div>
            <form className="container" noValidate autoComplete="off">
              <div>
                <TextField 
                  required
                  id="username"
                  label="Username"
                  margin="normal"
                />
              </div>
              <div>
                <TextField 
                  required
                  id="password1"
                  label="Password"
                  type="password"
                  margin="normal"
                />
              </div>
              <div>
                <TextField 
                  required
                  id="password2"
                  label="Confirm Password"
                  type="password"
                  margin="normal"
                />
              </div>
              <div>
                <span>
                  <TextField
                    required 
                    id="name"
                    label="Name"
                    margin="normal"
                    className={classes.textField}
                  />
                  <TextField
                    required
                    id="birthdate"
                    label="Birthdate"
                    type="date"
                    defaultValue="2017-05-24T10:30"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    margin="normal"
                    className={classes.textField}
                  />
                </span>
              </div>
              <div>
                <span>
                    <TextField
                      required 
                      id="weight-curr"
                      label="Current Weight"
                      type="number"
                      margin="normal"
                      className={classes.textField}
                    />
      
                  <TextField
                    required 
                    id="height"
                    label="Height"
                    type="number"
                    margin="normal"
                    className={classes.textField}
                  />
                </span>
              </div>
              <div>
              <TextField
                    required 
                    id="weight-goal"
                    label="Goal Weight"
                    type="number"
                    margin="normal"
                    className={classes.textField}
                  /> 
              </div> 
            </form>

            <div className="button">
              <Button 
                variant="contained" 
                color="primary"
              >
                Create Account
              </Button>
            </div>
            <div>
              <Button
                  variant="contained"
                  onClick = {this.handleClick}
                >
                  Sign In
              </Button> 
            </div>
          </div>
        }

        
      </div>
    );
  }
  
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }
}


export default withStyles(styles)(App);
