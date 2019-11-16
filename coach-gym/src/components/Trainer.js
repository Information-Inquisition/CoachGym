import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import '.././App.css';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';


const styles = {
    header: {
    },
    backBut: {
        position: 'absolute',
        left: '5px',
        top: '5px',
    },
    button: {
        margin: '15px',
    }

}

class Trainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            viewWork: false,
            createWork: false,
        }
        this.goBack = this.goBack.bind(this);
        this.goToViewWorkouts = this.goToViewWorkouts.bind(this);
    }

    goBack = () => {
        this.props.history.push('/');
    }


    goToViewWorkouts = () => {
        this.setState({ viewWork: true });
    }

    goToCreateWorkout = () => {
        this.setState({ createWork: true });
    }

  render() {
    const { classes } = this.props;
    const {
        viewWork,
        createWork,
    } = this.state;


    if (viewWork){
        return <Redirect to={{
                            pathname: '/workoutviewer',
                            state: {userType: 'trainer'}
                }}/>
    }

    if (createWork){
        return <Redirect to={{
                            pathname: '/workoutcreator',
                            state: {userType: 'trainer'}
        }}/>
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>
                    Welcome Trainer!                    
                </h1>
            </header>
            <Button className={classes.backBut}
                variant="contained"
                color="primary"
                size="small"
                onClick={this.goBack}
            >
                Back
            </Button>

            <div>
                <Button className={classes.button}
                    variant="contained"
                    color="primary"
                    margin="normal"
                    size="large"
                    onClick={this.goToCreateWorkout}
                >
                    Create Workout
                </Button>
            </div>
            <div>
                <Button className={classes.button}
                    variant="contained"
                    color="primary"
                    margin="normal"
                    size="large"
                    onClick={this.goToViewWorkouts}
                >
                    View Workouts
                </Button>
            </div>
        </div>
    );
  }
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }
}

export default withStyles(styles)(Trainer);