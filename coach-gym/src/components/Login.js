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
      id: null,
      exercises: [],
      trainers: [],
      clients: [],
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
    const weightCurr = event.target.weightCurr.value;
    const weightGoal = event.target.weightGoal.value;

    var err = [false, false, false, false, false, 
      false, false, false, false, false, false, false];

    var valid = true;
    //check passwords
    if(password1 !== password2){
      console.log("Err: passwords do not match");
      err[1] = true;
      err[2] = true;
      valid = false;
    }

    //check weights
    if (weightCurr < 0){
      err[5] = true;
      valid = false;
    }
    if (weightGoal < 0){
      err[7] = true;
      valid = false;
    }

    this.getClients();
    const { clients } = this.state;
    if(valid){
      console.log("adding client")
      this.addClient(name, username, password1, weightCurr, weightGoal);
      window.location.reload(true); 
    }
    
    this.setState ({ errors: err });
  }

  validateTrainerForm = (event) => {
    //check if trainer form is complete
    event.preventDefault();
    console.log("validating trainer");
    const username = event.target.username.value;
    const password1 = event.target.password1.value;
    const password2 = event.target.password2.value;
    const name = event.target.name.value;

    var err = [false, false, false, false, false, 
      false, false, false, false, false, false, false]

      var valid = true;

    //check passwords
    if(password1 !== password2){
      console.log("Err: passwords do not match");
      valid = false;
      err[9] = true;
      err[10] = true;
    }

    this.getTrainers();
    const { trainers } = this.state;
    for(var i = 0; i < trainers.length;i++){
      console.log(trainers[i].username);
      if (username === trainers[i].username){
        console.log("Err: username must be unique");
        valid = false;
        err[8] = true;
      }
    }

    if(valid){
      //put into database
      this.addTrainer(name, username, password1);
      window.location.reload(true); 
    }
    this.setState ({ errors: err });
  }

  addTrainer = (name, username, password) => {
    fetch(`http://localhost:4000/add/trainer?name=${name}&username=${username}&password=${password}`)
      .then(response => response.json())
      .catch(err => console.error(err));
  }

  addClient = (name, username, password, weightCurr, weightGoal) => {
    fetch(`http://localhost:4000/add/client?name=${name}&username=${username}&password=${password}&weightCurr=${weightCurr}&weightGoal=${weightGoal}`)
      .then(response => response.json())
      .catch(err => console.error(err));
  }

  validateLogin = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    const{ trainers, clients } = this.state;
   
    for (var i = 0; i < trainers.length;i++){
      if (username === trainers[i].username){
        if(password === trainers[i].password){
            // this.props.history.push('/trainer', {id: trainers[i].id});
            this.setState({validLogin: true, userType: 'trainer', id: trainers[i].trainer_id});
        }
      }
    }

    for (var i = 0; i < clients.length;i++){
      if (username === clients[i].username){
        if(password === clients[i].password){
            // this.props.history.push('/client', {id: clients[i].id});
            console.log(clients[i].id);
            this.setState({validLogin: true,  userType: 'client', id: clients[i].client_id});

        }
      }
    }
    console.log("wrong login")
  }


  componentDidMount() {
    //this.getExercises();
    this.getTrainers();
    this.getClients();
  }
  
  getExercises = () => {
    fetch('http://localhost:4000/exercises' )
      .then(response => response.json())
      .then(({data}) => {
        this.setState({ exercises: data })
      } )
      .catch(err => console.error(err));
  }

  getTrainers = () => {
    fetch('http://localhost:4000/trainers' )
      .then(response => response.json())
      .then(({data}) => {
        this.setState({ trainers: data })
      } )
      .catch(err => console.error(err));
  }

  getClients = () => {
    fetch('http://localhost:4000/clients' )
      .then(response => response.json())
      .then(({data}) => {
        this.setState({ clients: data })
      } )
      .catch(err => console.error(err));
  }


  render() {
    const {
      exercises,
      signIn,
      userType,
      validLogin,
      errors,
      id
    } = this.state;
    const { classes } = this.props;

    if (validLogin){
      return <Redirect to={{
          pathname: `/${userType}`,
          state: {id: id}
        }}/>
    }
    
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
                    id="weightGoal"
                    label="Goal Weight"
                    type="number"
                    margin="normal"
                    error={errors[7]}
                    className={classes.textField}
                  /> 
              </span>
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
