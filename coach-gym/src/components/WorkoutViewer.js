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
    List,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemSecondaryAction,
    IconButton,
    ListItemText,
    Checkbox,
    Typography,
        FormControlLabel,
        

} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
const styles = {
    backBut: {
        position: 'absolute',
        left: '5px',
        top: '5px',
    },
    panel: {
        margin: 'auto',
        width: '65%',
    },
    workName: {
      position: 'relative',
      right: '-525px',
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

    const workouts = [
     {label: "Workout1", exercise: "pull up"},
     {label: "Workout2", exercise: "pull down"},   
    ]

    console.log(userType);
    return (
        <div className="App">
            <header className="App-header">
                <h1>
                   Workout Viewer for {userType}                 
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
              {workouts.map(workout => (
                <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-label="Expand"
                  aria-controls="additional-actions1-content"
                  id="additional-actions1-header"
                >
                  <FormControlLabel
                    aria-label="Deletion"
                    onClick={event => event.stopPropagation()}
                    onFocus={event => event.stopPropagation()}
                    control={<DeleteIcon 
                              button 
                              id="delete"
                              className={classes.workName}
                              onClick={()=> console.log("delete")}
                      />}
                    label={workout.label}
                  />
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography color="textSecondary">
                    {workout.exercise}
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              ))}
            </div>
        </div>

    );
  }
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }
}

export default withStyles(styles)(WorkoutViewer);