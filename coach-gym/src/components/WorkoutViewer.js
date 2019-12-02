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
import { thisExpression } from '@babel/types';
import { all } from 'q';
import { classes } from 'istanbul-lib-coverage';
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
    },
    list: {
      display: 'flex',
      alignItems: 'left'
    }
}
class WorkoutViewer extends Component {
    constructor(props){
        super(props);
        this.state = {
          workouts: [],
          exercises: [],
          trainer: [],
          count: 0,
          back: false,
          na: false,
        }
        this.goBack = this.goBack.bind(this);
        this.deleteWorkout = this.deleteWorkout.bind(this);
    }

    goBack = () => {
      this.setState({back: true});
    }

    getWorkouts = (id) =>{
      fetch(`http://localhost:4000/workouts?t_id=${id}` )
      .then(response => response.json())
      .then(({data}) => {
        console.log(data);
        this.setState({ workouts: data })
      } )
      .catch(err => console.error(err));
    }

    getWorkoutCount = (id) =>{
      fetch(`http://localhost:4000/workouts/count?t_id=${id}` )
      .then(response => response.json())
      .then(({data}) => {
        console.log(data[0]);
        this.setState({ count: data[0].count })
      } )
      .catch(err => console.error(err));
    }

    getClientWorkouts = (id) =>{
      fetch(`http://localhost:4000/workouts/client?c_id=${id}` )
      .then(response => response.json())
      .then(({data}) => {
        this.setState({ workouts: data })
      } )
      .catch(err => console.error(err));
    }

    getClientWorkoutCount = (id) =>{
      fetch(`http://localhost:4000/workouts/client/count?c_id=${id}` )
      .then(response => response.json())
      .then(({data}) => {
        console.log(data[0]);
        this.setState({ count: data[0].count })
      } )
      .catch(err => console.error(err));
    }

    getAllExercises = (t_id) =>{
      fetch(`http://localhost:4000/workouts/allexercises?t_id=${t_id}` )
      .then(response => response.json())
      .then(({data}) => {
        console.log(data);
        this.setState({exercises: data});
      } )
      .catch(err => console.error(err));
    }

    getAllClientExercises = (c_id) =>{
      fetch(`http://localhost:4000/workouts/client/allexercises?c_id=${c_id}` )
      .then(response => response.json())
      .then(({data}) => {
        console.log(data);
        this.setState({exercises: data});
      } )
      .catch(err => console.error(err));
    }

    renderExercises = (w_id) =>{
      const {exercises} = this.state;
      var temp = [];
      for (var i = 0; i < exercises.length;i++){
        if (exercises[i].workout_id === w_id){
          temp.push(exercises[i].name);
        }
      }
      return(
      <ul>
        {temp.map(exercise => (
          <li className={classes.list}>{exercise}</li>
        ))}
      </ul>)
    }
    
    deleteWorkout = (w_id) => {
      const {na} = this.state;
      fetch(`http://localhost:4000/workouts/delete?w_id=${w_id}` )
      .then(response => response.json())
      .catch(err => console.error(err));
      window.location.reload(true); 
    }

    componentDidMount = () => {
      const{id, userType} = this.props.location.state;
      if (userType === "client"){
        this.getClientWorkouts(id);
        this.getAllClientExercises(id);
        this.getClientWorkoutCount(id);
      } else if (userType === "trainer"){
        this.getWorkouts(id);
        this.getAllExercises(id);
        this.getWorkoutCount(id);
      } 
    }


  render() {
    const { classes } = this.props;
    const { userType, id } = this.props.location.state;
    const { 
      workouts, 
      exercises,
      back,
      count,
    } = this.state;

    if(back){
      return <Redirect to={{
        pathname: `/${userType}`,
        state: {userType: userType, id: id}
      }}/>
    }

      return (
        <div className="App">
            <header className="App-header">
                <h1>
                   Workout Viewer                 
                </h1>
                
            </header>
            <div>
                  <h2 className="App-header">
                    Total Workouts: {count}
                  </h2>
                </div>
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
                <div>
                <Grid>
                  <ExpansionPanel>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-label="Expand"
                    aria-controls="additional-actions1-content"
                    id="additional-actions1-header"
                  >
                    {workout.name}
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Typography color="textSecondary">
                      {this.renderExercises(workout.workout_id)}
                    </Typography>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
            
                  <Button 
                    button 
                    id="delete"
                    color="secondary"
                    onClick={() => this.deleteWorkout(workout.workout_id)}
                  >Delete</Button>
                </Grid>
                
                </div>
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