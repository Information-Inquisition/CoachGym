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

}

class Client extends Component {
    constructor(props){
        super(props);
        this.state = {
            viewWork: false,
        }
        this.goBack = this.goBack.bind(this);
    }

    goBack = () => {
        console.log(this.props.history);
        this.props.history.push('/');
    }

    goToViewWorkouts = () => {
        this.setState({ viewWork: true });
    }

    render() {
    const { classes } = this.props;
    const {viewWork} = this.state;

    if (viewWork){
        return <Redirect to={{
                            pathname: '/workoutviewer',
                            state: {userType: 'client'}
                }}/>
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>
                    Welcome Client!                    
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

export default withStyles(styles)(Client);