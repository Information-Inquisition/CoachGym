import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


class Trainer extends Component {
  render() {
    return (
        <div>
          <h2>Trainer Home</h2>
          <li><Link to={'/'} className="nav-link"> Login </Link></li>
        </div>
    );
  }
}

export default Trainer;