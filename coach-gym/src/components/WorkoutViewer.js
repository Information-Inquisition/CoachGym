import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import '.././App.css';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { 
    Button,
    Grid,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,

} from '@material-ui/core';

const styles = {
    header: {
    },
    backBut: {
        position: 'absolute',
        left: '5px',
        top: '5px',
    },
    panel: {
        margin: 'auto',
        width: '65%',
    }

}

class WorkoutViewer extends Component {
    constructor(props){
        super(props);
        this.goBack = this.goBack.bind(this);
    }
    goBack = () => {
        this.props.history.push('/trainer');
    }
  render() {
    const { classes } = this.props;
    const { userType } = this.props.location.state;

    console.log(userType);
    return (
        <div className="App">
            <header className="App-header">
                <h1>
                   Workout Viewer                    
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
            <div className={classes.panel}>
                <ExpansionPanel>        
                    <ExpansionPanelSummary>
                            Workout Name
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <p>
                        Exercises
                    </p>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        </div>
    );
  }
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }
}

export default withStyles(styles)(WorkoutViewer);