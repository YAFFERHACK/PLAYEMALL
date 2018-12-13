import React, { Component } from 'react';
import ProfileCollection from './ProfileCollection';
import ProfilePersonalDet from './ProfilePersonalDet';
import './ProfileStyles.css';




export default class Profile extends Component {
  render() {
    console.log(this.props.user)
    console.log("este entra")
    return (
      <div className="profileDad">
      <ProfilePersonalDet user={this.props.user}/>
      <ProfileCollection />
      </div>
    )
  }
}
