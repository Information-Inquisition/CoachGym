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
    FormGroup,
    FormControl,
    FormControlLabel,
    FormLabel,
    Checkbox,
    TextField

} from '@material-ui/core';

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
    nameInput: {
        position: 'relative',
        top: '-30px',
    },
    nameHeader: {
        position: 'relative',
        top: '0px',
        fontSize: '18px',
        color: 'navy',
    },
    genButton: {
        position: 'relative',
        top: '50px',
    }
}

class WorkoutCreator extends Component {
    constructor(props){
        super(props);
        this.goBack = this.goBack.bind(this);
        this.handleGenerateWorkout = this.handleGenerateWorkout.bind(this);
    }
    goBack = () => {
        this.props.history.push('/trainer');
    }

    handleGenerateWorkout = (event) => {
        event.preventDefault();
        console.log("generate workout");

        //////////////////////////////////
        // WORKOUT GENERATION HERE?
        ////////////////////////////////////
    }

  render() {
    const { classes } = this.props;
    const { userType } = this.props.location.state;

    return (
        <div className="App">
            <header className="App-header">
                <div>
                    <h1>
                    Create Workout                    
                    </h1>
                </div>
                
            </header>
           <form
                id="muscle-groups"
                onSubmit={this.handleGenerateWorkout}
           >
            <FormControl>
                <div className={classes.nameHeader}>
                    <h2>
                        Name this Workout
                    </h2>
                </div>
                <TextField
                    className={classes.nameInput}
                    required
                    label="Workout Name"
                    id="workout-name"
                    margin="normal"
                />
                <div className={classes.nameHeader}>
                    <h2>
                        Choose target muscle groups
                    </h2>
                </div>
                <FormGroup aria-label="position" column>
                    <div>
                        <FormControlLabel
                            value="arms"
                            control={<Checkbox color="primary" />}
                            label="Arms"
                            labelPlacement="end"
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            value="legs"
                            control={<Checkbox color="primary" />}
                            label="Legs"
                            labelPlacement="end"
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            value="abs"
                            control={<Checkbox color="primary" />}
                            label="Abs"
                            labelPlacement="end"
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            value="back"
                            control={<Checkbox color="primary" />}
                            label="Back"
                            labelPlacement="end"
                        />
                    </div>
                </FormGroup>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.genButton}
                >
                    Generate Workout
                </Button>
            </FormControl>
            </form>


            <Button className={classes.backBut}
                variant="contained"
                color="primary"
                size="small"
                onClick={this.goBack}
            >
                Back
            </Button>
        </div>
    );
  }
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }
}

export default withStyles(styles)(WorkoutCreator);