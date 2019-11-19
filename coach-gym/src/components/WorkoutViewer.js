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
            control={<Checkbox />}
            label="Workout Name"
          />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography color="textSecondary">
            Exercises
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
            </div>

            <List
                className={classes.panel}
            >
                <ListItem button>
                  <ListItemText
                    primary="Workout Name"
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
            </List>
            </div>

    );
  }
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }
}

export default withStyles(styles)(WorkoutViewer);