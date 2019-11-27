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
import { conditionalExpression } from '@babel/types';

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
      books: [],
      signIn: true,
      userType: "client",
      validLogin: false,
      errors: [false, false, false, false, false, 
        false, false, false, false, false, false, false], 

    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.handleUserType = this.handleUserType.bind(this);
    this.validateClientForm = this.validateClientForm.bind(this);
    this.validateTrainerForm = this.validateTrainerForm.bind(this);
    this.validateLogin = this.validateLogin.bind(this);

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
    this.setState({ 
      userType: event.target.value,
      errors: [false, false, false, false, false, 
        false, false, false, false, false, false, false]
    });
  }

  validateClientForm = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password1 = event.target.password1.value;
    const password2 = event.target.password2.value;
    const name = event.target.name.value;
    const birthdate = event.target.birthdate.value;
    const weightCurr = event.target.weightCurr.value;
    const height = event.target.height.value;
    const weightGoal = event.target.weightGoal.value;

    var err = [false, false, false, false, false, 
      false, false, false, false, false, false, false];

    //check bday
    if (!this.isValidDate(birthdate)) {
      console.log("Err: bday not valid");
      err[4] = true;
    }

    //check name
    for (var i = 0; i < name.length; i++){
      if (!name.charAt(i).match(/^[0-9a-z]+$/)){
          console.log("Err: name not valid");
          err[3] = true;
      }
    }

    //check passwords
    if(password1 !== password2){
      console.log("Err: passwords do not match");
      err[1] = true;
      err[2] = true;
    }

    //check weights and height
    if (weightCurr < 0){
      err[5] = true;
    }
    if (height < 0){
      err[6] = true;
    }
    if (weightGoal < 0){
      err[7] = true;
    }
    
    this.setState ({ errors: err });
  }

  //date validation source code:
  //https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript
  isValidDate = (dateString) => {
    // Parse the date parts to integers
    var parts = dateString.split("-");
    var day = parseInt(parts[2], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[0], 10);

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

  validateTrainerForm = (event) => {
    //check if trainer form is complete
    event.preventDefault();
    const username = event.target.username.value;
    const password1 = event.target.password1.value;
    const password2 = event.target.password2.value;
    const name = event.target.name.value;

    var err = [false, false, false, false, false, 
      false, false, false, false, false, false, false]

    //check passwords
    if(password1 !== password2){
      console.log("Err: passwords do not match");
      err[9] = true;
      err[10] = true;
    }

    //check name
    for (var i = 0; i < name.length; i++){
      if (!name.charAt(i).match(/^[0-9a-z]+$/)){
          console.log("Err: name not valid");
          err[11] = true;
      }
    }

    this.setState ({ errors: err });    
  }

  validateLogin = () => {
    //CHECK IF USER IS IN DATABASE HERE, //
    //THEN OPEN CORRECT PAGE             //
    /* if username and password are in database{
      if usertype is trainer {
        open trainer home
      } else {
        open client home
      }
    }
    */
    const { validLogin } = this.state;
    if (validLogin === false) {
      this.props.history.push('/trainer');
    }
  }

  // async componentDidMount() {
	// 	try {
	// 		let r = await fetch('/api/books');
	// 		let books = await r.json();
	// 		this.setState({ books });
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
  // }

  componentDidMount() {
    this.getBooks();
  }
  
  getBooks = () => {
    fetch('http://localhost:4000/books' )
      .then(response => response.json())
      .then(({data}) => {
        console.log(data);
        this.setState({ books: data })
      } )
      .catch(err => console.error(err));
  }

  render() {
    const {
      books,
      signIn,
      userType,
      validLogin,
      errors,
    } = this.state;
    const { classes } = this.props;

    // if (validLogin === true){
    //   return <Redirect to='/trainer' />
    // }
    
    return (
      <div className="App">
        <ul>
            {books.map(book => {
              return <li>{book.Title}</li>
            })}
        </ul>
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
              onSubmit={this.validateLogin}
            >
              <div>
                <TextField
                  required
                  margin="normal" 
                  id="username"
                  label="Username"
                />
              </div>
              <div>
                <TextField
                  required
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
                    type="submit"
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
                  error={errors[0]}
                />
              </div>
              <div>
                <TextField 
                  required
                  id="password1"
                  label="Password"
                  type="password"
                  margin="normal"
                  error={errors[1]}
                />
              </div>
              <div>
                <TextField 
                  required
                  id="password2"
                  label="Confirm Password"
                  type="password"
                  margin="normal"
                  error={errors[2]}
                />
              </div>
              <div>
                <span>
                  <TextField
                    required 
                    id="name"
                    label="Name"
                    margin="normal"
                    error={errors[3]}
                    className={classes.textField}
                  />
                  <TextField
                    required
                    id="birthdate"
                    label="Birthdate"
                    type="date"
                    error={errors[4]}
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
                      error={errors[5]}
                      className={classes.textField}
                    />
      
                  <TextField
                    required 
                    id="height"
                    label="Height"
                    type="number"
                    margin="normal"
                    error={errors[6]}
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
                    error={errors[7]}
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
              onSubmit={this.validateTrainerForm}
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
                  error={errors[8]}
                />
              </div>
              <div>
                <TextField 
                  required
                  id="password1"
                  label="Password"
                  type="password"
                  margin="normal"
                  error={errors[9]}
                />
              </div>
              <div>
                <TextField 
                  required
                  id="password2"
                  label="Confirm Password"
                  type="password"
                  margin="normal"
                  error={errors[10]}
                />
              </div>
              <div>
                <TextField
                  required 
                  id="name"
                  label="Name"
                  margin="normal"
                  error={errors[11]}
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

      </div>
    );
  }
  
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }
}


export default withStyles(styles)(Login);
