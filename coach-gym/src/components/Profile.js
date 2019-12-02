import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import '.././App.css';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { 
    Button,
    FormControl,
    TextField

} from '@material-ui/core';

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
    textField: {
        marginLeft: '8px',
        marginRight: '8px',
        width: 200,
      },
      genButton: {
        position: 'relative',
        top: '25px',
    }
}
class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: [],
            back: false,
        }
        this.goBack = this.goBack.bind(this);
    }

    goBack = () => {
      this.setState({back: true});
    }

    handleUpdate = (event) => {
        event.preventDefault();
        const weightCurr = event.target.weightCurr.value;
        const weightGoal = event.target.weightGoal.value;
        const {id } = this.props.location.state;
        if(weightCurr !== ""){
            this.updateCurrent(weightCurr, id);
        }
        if(weightGoal !== ""){
            this.updateGoal(weightGoal, id);
        }    
        window.location.reload(true); 
    }

    updateCurrent = (weight, id) => {
        fetch(`http://localhost:4000/update/current?cur_weight=${weight}&c_id=${id}`)
        .then(response => response.json())
        .catch(err => console.error(err));
    }

    updateGoal = (weight, id) => {
        fetch(`http://localhost:4000/update/goal?goal_weight=${weight}&c_id=${id}`)
        .then(response => response.json())
        .catch(err => console.error(err));
    }
   

    getUser = () =>{
        const {id } = this.props.location.state;
        fetch(`http://localhost:4000/get/client?c_id=${id}`)
        .then(response => response.json())
        .then(({data}) => {
            this.setState({ user: data })
          } )
        .catch(err => console.error(err));
    }

    componentDidMount () {
        this.getUser();
    }

  render() {
    const { classes } = this.props;
    const { userType, id } = this.props.location.state;
    const { 
      back,
      user
    } = this.state;

    if(back){
      return <Redirect to={{
        pathname: `/${userType}`,
        state: {userType: userType, id: id}
      }}/>
    }
    console.log(user);
    var weightCurr;
    var weightGoal;
    if(user.length > 0) {
        weightCurr = user[0].cur_weight;
        weightGoal = user[0].goal_weight;
    }

      return (
        <div className="App">
            <header className="App-header">
                <h1>
                   Profile                 
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
            
            <form
                onSubmit={this.handleUpdate}
           >
                <h2 className="App-header">
                    Current Weight: {weightCurr}     
                </h2>
                <h2 className="App-header">
                    Current Goal Weight: {weightGoal}          
                </h2>
                <span>
                    <TextField
                        id="weightCurr"
                        label="New Current Weight"
                        type="number"
                        margin="normal"
                        className={classes.textField}
                    />

                <TextField
                    id="weightGoal"
                    label="New Goal Weight"
                    type="number"
                    margin="normal"
                    className={classes.textField}
                    /> 
                </span>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.genButton}
                >
                    Update
                </Button>
            </form>

        </div>

    );
  }
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }
}

export default withStyles(styles)(Profile);