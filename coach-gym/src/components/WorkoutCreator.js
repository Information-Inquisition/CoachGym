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
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Select,
    MenuItem
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
        this.state = {
            targetMuscles: [false, false, false, false],
            isGenerated: false,
            difficulty: 'easy',
            exerType: 'free-weight',
        };

        this.goBack = this.goBack.bind(this);
        this.handleGenerateWorkout = this.handleGenerateWorkout.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleClose = this.handleClose.bind(this);

    }
    goBack = () => {
        this.props.history.push('/trainer');
    }

    handleGenerateWorkout = (event) => {
        const {targetMuscles, isGenerated} = this.state;
        event.preventDefault();
        console.log(targetMuscles);

        //////////////////////////////////
        // WORKOUT GENERATION HERE?
        ////////////////////////////////////

        this.setState({isGenerated: true});
    }

    handleClose = () => {
        this.setState({isGenerated: false});
    }

    handleCheck = (event) => {
        const {targetMuscles} = this.state;
        var tM = targetMuscles;
        console.log("checked");
        if (event.target.value === "arms"){
            tM[0] = event.target.checked;
        } else if (event.target.value === "legs"){
            tM[1] = event.target.checked;
        } else if (event.target.value === "abs"){
            tM[2] = event.target.checked;
        } else if (event.target.value === "back"){
            tM[3] = event.target.checked;
        }
        this.setState({targetMuscles: tM});
    }
    
    handleDifficulty = (event) => {
        this.setState({ difficulty: event.target.value })
    }

    handleExerType = (event) => {
        this.setState({ exerType: event.target.value })
    }

  render() {
    const { classes } = this.props;
    const { userType } = this.props.location.state;
    const {
        isGenerated,
        difficulty,
        exerType
    } = this.state;

    
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
                <TextField
                    className={classes.nameInput}
                    required
                    label="Client Name"
                    id="client-name"
                    margin="normal"
                />
                <div className={classes.nameHeader}>
                    <h2>
                        Difficulty:
                    </h2>
                    <Select
                    labelId="difficulty-lvl"
                    id="difficulty-lvl"
                    value={difficulty}
                    onChange={this.handleDifficulty} 
                    >
                    <MenuItem value="easy">Easy</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="hard">Hard</MenuItem>
                    </Select>
                </div>
                <div className={classes.nameHeader}>
                    <h2>
                        Types of Exercises:
                    </h2>
                    <Select
                    labelId="exercise-type"
                    id="exercise-type"
                    value={exerType}
                    onChange={this.handleExerType} 
                    >
                    <MenuItem value="free-weight">Free Weight</MenuItem>
                    <MenuItem value="body-weight">Body Weight</MenuItem>
                    <MenuItem value="both">Both</MenuItem>
                    </Select>
                </div>

                <div className={classes.nameHeader}>
                    <h2>
                        Choose target muscle groups
                    </h2>
                </div>
                <FormGroup 
                    id="muscleGroups"
                    aria-label="position" 
                    column
                >
                    <div>
                        <FormControlLabel
                            value="arms"
                            control={<Checkbox 
                                color="primary" 
                                onChange={this.handleCheck}
                                />}
                            label="Arms"
                            labelPlacement="end"
                           
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            value="legs"
                            control={<Checkbox 
                                color="primary" 
                                onChange={this.handleCheck}
                                />}
                            label="Legs"
                            labelPlacement="end"
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            value="abs"
                            control={<Checkbox 
                                color="primary" 
                                onChange={this.handleCheck}
                                />}
                            label="Abs"
                            labelPlacement="end"
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            value="back"
                            control={<Checkbox 
                                color="primary" 
                                onChange={this.handleCheck}
                                />}
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

            <Dialog
                open={isGenerated}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Workout Generated
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    You can view your newly generated workout in the Workout Viewer.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={this.handleClose} color="primary" autoFocus>
                    Ok
                </Button>
                </DialogActions>
            </Dialog>

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