import React, { Component } from 'react';
import ProfileCollection from './ProfileCollection';
import ProfilePersonalDet from './ProfilePersonalDet';
import './ProfileStyles.css';




export default class Profile extends Component {

  render() {

    if (this.props.user === undefined) {
      return (
        <div>
          <h1>Login Failed</h1>
        </div>
      )
    } else {
    
      return (
        <div className="profileDad">
          <ProfilePersonalDet user={this.props.user} />
          <ProfileCollection user={this.props.user} />
        </div>
      )
    }

  }
}
