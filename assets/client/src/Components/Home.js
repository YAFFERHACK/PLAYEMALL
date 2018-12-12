import { Switch, Route, Link } from "react-router-dom";
import React, { Component } from "react";

class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    console.log(this.props.username);
    return (
      <div>
        <h1>Play 'Em All {this.props.username}</h1>
        <Link to={`/login/`}>
          <button>login</button>
        </Link>
        <Link to={`/signup/`}>
          <button>signup</button>
        </Link>
      </div>
    );
  }
}

export default Home;
