import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './ProfileStyles.css';


export default class ProfilePersonalDet extends Component {
  

  render() {
    if (this.props.user === null) {
      return <div><h1>...CARGANDO JOPUTA</h1></div>
    } else {
      
    return (
      <div>
        <img className="profImg" alt="profileImg" src={this.props.user.profileImg} style={{width:250}}/>
        <h1>{this.props.user.username}</h1>
        <h4>Ciudad: {this.props.user.city}</h4>
        <h4>Posts: {this.props.user.post}</h4>
        <Link to={`/editprofile`}>
          <button>Edit Profile</button>
        </Link>
        <Link to={`/`}>
          <button>Logout</button>
        </Link>
      </div>
    )
  }
}
}
