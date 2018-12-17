import React, { Component } from 'react';
import ProfileCollection from './ProfileCollection';
import ProfilePersonalDet from './ProfilePersonalDet';
import './ProfileStyles.css';
import { Link } from "react-router-dom";





export default class Profile extends Component {
  constructor(props){
    super(props)

    this.state={
      props: props,
    }
  }

  render() {

    if (this.props.user === undefined) {
      return (
        <div>
          <h1>Login Failed</h1>
        </div>
      )
    } else {
      console.log('verdaderamente entra aqui');
      console.log(this.props.user)
      console.log("este entra")
      return (
        <div className="profileDad">
          <ProfilePersonalDet user={this.props.user} />
          <ProfileCollection />
          <Link to={`/`}>
          <button>Home</button>
        </Link>
        </div>
      )
    }

  }
}
