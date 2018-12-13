import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class ProfilePersonalDet extends Component {
  

  render() {
    if (this.props.user === null) {
      return <div><h1>...CARGANDO JOPUTA</h1></div>
    } else {
      
    const prueba = this.props.user
    console.log(prueba)
    console.log("este")
    return (
      <div>
        <img alt="profileImg" src="https://vignette.wikia.nocookie.net/universosteven/images/9/91/Friki-Meme.png/revision/latest?cb=20150630204103&path-prefix=es"/>
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
