import React, { Component } from 'react';
import AuthService from '../auth/auth-service';
import { Link, Redirect } from 'react-router-dom';


export default class Nav extends Component {
  render() {
    return (
      <div>
        <div className="Nav">
        <nav className="navbar is-dark">
          <div className="navbar-brand">
            <a className="navbar-item" href="https://bulma.io">
              {" "}
              <img
                src="https://png2.kisspng.com/20180629/arq/kisspng-white-house-press-secretary-logo-trademark-jiu-5b35b5c2da6a78.6673986015302465948946.png"
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
              <a className="navbar-item" href="https://bulma.io/">
                Play Em All
              </a>
              <a className="navbar-item" href="https://bulma.io/">
                Dashboard
              </a>
              <a className="navbar-item" href="https://bulma.io/">
                Games
              </a>
            </div>
            
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="field is-grouped">
                <p className="control">
                  {/* <a> */}
                    {/* <CoolBtn>Login</CoolBtn> */}
                  {/* </a> */}
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
