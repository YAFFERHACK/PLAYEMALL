import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './ProfileStyles.css';
import './Profile.css';
import Loading3 from '../Loading3';


export default class ProfilePersonalDet extends Component {
  

  render() {
    if (this.props.user === null) {
      return <div><Loading3/></div>
    } else {
      
    return (
      <div className="profCont">
        <img className="profileImg" alt="profileImg" src={this.props.user.profileImg} style={{width:250}}/>
        <h1 className="profName">{this.props.user.username}</h1>
        <h4 className="profCity"><b>Ciudad:</b> {this.props.user.city}</h4>
        <h4 className="profPost"><b>Posts:</b> 6</h4>
        <Link to={`/editprofile`}>
          <button className="editBtn">Edit Profile</button>
        </Link>
        
      </div>
    )
  }
}
}

// Posts: {this.props.user.post}
