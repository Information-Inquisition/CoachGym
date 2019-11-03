import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';
import '@material-ui/core';
import './Login.css';
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

const styles = {
  textField: {
    marginLeft: '8px',
    marginRight: '8px',
    width: 200,
  },
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signIn: true,
      userType: "client",
      validLogin: false,
    };

    
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.handleUserType = this.handleUserType.bind(this);
    this.validateClientForm = this.validateClientForm.bind(this);
    this.validateLogin = this.validateLogin.bind(this);

  }

  componentDidMount(){
  }

  handleClick = () => {
    const { signIn } = this.state;
    if (signIn) {
      this.setState({ signIn: false });
    } else {
      this.setState({ signIn: true });
    }
  } 
  
  handleUserType = (event) => {
    this.setState({ userType: event.target.value });
  }

  validateClientForm = (event) => {
    event.preventDefault();
    console.log("form submitted");
    const username = event.target.username.value;
    const password1 = event.target.password1.value;
    const password2 = event.target.password2.value;
    const name = event.target.name.value;
    const birthdate = event.target.birthdate.value;
    const weightCurr = event.target.weightCurr.value;
    const height = event.target.height.value;
    const weightGoal = event.target.weightGoal.value;
    if (!this.isValidDate(birthdate)) {
      event.target.birthdate.styles = {error: true};
    }
  }

  //date validation source code:
  //https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript

  isValidDate = (dateString) => {
    // Parse the date parts to integers
    var parts = dateString.split("-");
    var day = parseInt(parts[2], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[0], 10);
    console.log(day);
    console.log(month);
    console.log(year);

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 ) {
      console.log("Err: year out of range");
      return false;
    }
    if (month === 0 || month > 12){
      console.log("Err: month out of range")
    }
    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
  }

  validateTrainerForm = () => {

  }

  validateLogin = () => {
    this.setState({ validLogin: true });
  }


  render() {
    const {
      signIn,
      userType,
      validLogin,
    } = this.state;
    const { classes } = this.props;

    if (validLogin === true){
      console.log(validLogin);
      return <Redirect to='/trainer' />
    }
    console.log(validLogin);
    
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
            <form 
              id="signIn" 
              className="container" 
              autoComplete="off"
            >
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
              <div className="button">
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={this.validateLogin}
                  >
                    Log In
                  </Button>
              </div>
            </form>
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

        
        {!signIn && userType === "client" &&
          <div>
            <form 
              id="createClient"
              className="container"
              autoComplete="off"
              onSubmit={this.validateClientForm}
            >
              <div>
                <Select
                  labelId="user-type"
                  id="user-type"
                  value={userType}
                  onChange={this.handleUserType} 
                >
                  <MenuItem value="client">Client</MenuItem>
                  <MenuItem value="trainer">Trainer</MenuItem>
                </Select>
              </div>
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
                      id="weightCurr"
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
                    id="weightGoal"
                    label="Goal Weight"
                    type="number"
                    margin="normal"
                    className={classes.textField}
                  /> 
              </div> 
              <div className="button">
                <Button 
                  variant="contained" 
                  color="primary"
                  type="submit"
                >
                  Create Account
                </Button>
              </div>
            </form>
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

        {!signIn && userType === "trainer" &&
          <div>
            <form 
              id="createTrainer"
              className="container" 
              autoComplete="off"
            >
              <div>
                <Select
                  labelId="user-type"
                  id="user-type"
                  value={userType}
                  onChange={this.handleUserType} 
                >
                  <MenuItem value="client">Client</MenuItem>
                  <MenuItem value="trainer">Trainer</MenuItem>
                </Select>
              </div>
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
                <TextField
                  required 
                  id="name"
                  label="Name"
                  margin="normal"
                  className={classes.textField}
                />            
              </div> 
              <div className="button">
                <Button 
                  variant="contained" 
                  color="primary"
                >
                  Create Account
                </Button>
              </div>
            </form>
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


export default withStyles(styles)(Login);
