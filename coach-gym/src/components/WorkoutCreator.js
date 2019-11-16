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
    Checkbox

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

class WorkoutCreator extends Component {
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
                <div>
                    <h1>
                    Create Workout                    
                    </h1>
                </div>
                
            </header>
            <div className="App-header2">
                <h2>
                    Choose target muscle groups
                </h2>
            </div>
            <FormControl id="muscle-groups">
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
            </FormControl>



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