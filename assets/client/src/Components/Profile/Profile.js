import React, { Component } from 'react';
import ProfileCollection from './ProfileCollection';
import ProfilePersonalDet from './ProfilePersonalDet';
import './ProfileStyles.css';



export default class Profile extends Component {
  render() {
    return (
      <div className="profileDad">
      <ProfilePersonalDet />
      <ProfileCollection />
      </div>
    )
  }
}
