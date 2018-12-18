import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import AuthService from "../auth/auth-service";
import '../Nav.css'
import App from '../App'


export default class Nav extends Component {
  
  
  render() {
    let user=""
    if(this.props.user !== null && this.props.user !== undefined){
      user = (
      <a className="navbar-item userNav" href="/profile">
      <img className="userNavImg" alt="" src={this.props.user.profileImg}/>
      <p className="userNavName">{this.props.user.username}</p>
      </a>)
    } else {
      user =""
    }

    
    return (
      <div>
        <div className="Nav">
        <nav className="navbar is-dark">
          <div className="navbar-brand">
            <a className="navbar-item navLogo" href="/">
              {" "}
              <img
                src="https://okapy.es/image/cache/catalog/customer_designs/33-90ccb12f14fe5363fd0d270ebddec5ce-228x228.png"
                alt=""
                width="30"
                height="28"
              />
            </a>
            <div
              className="navbar-burger burger"
              data-target="navbarExampleTransparentExample"
            >
              <span />
              <span />
              <span />
            </div>
          </div>
          <div id="navbarExampleTransparentExample" className="navbar-menu">
            <div className="navbar-start">
              <a className="navbar-item" href="/">
                Play Em All
              </a>
              <a className="navbar-item" href="/dashboard">
                Dashboard
              </a>
              <a className="navbar-item" href="/gamesearch">
                Games
              </a>
              <a className="navbar-item" href="/mustplay">
                Must Play
              </a>
              
            </div>
            
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="field is-grouped">
                {user}
                <p className="control">
             
                {/* <a class="navbar-link">
          <img class="navImg" src={{user.imgPath}}> {{user.username}}/>
                    </a> */}
                   <a className="loginBtns" href="/login">  
                    <button className="button is-primary separation">Login</button>
                  </a> 
                   <a href="/signup"> 
                  {/* <button className="button is-info separation2" onClick={this.Getloggout}>Logout</button> */}

                    <button className="button is-info separation2" onClick={this.Getloggout}>Signup</button>
                  </a>  
                </p>
                <p className="control" />
              </div>
            </div>
          </div>
        </nav>
      </div>
      </div>
    )
  }
}
