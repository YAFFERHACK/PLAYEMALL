import React, { Component } from 'react';
import AuthService from "../../auth/auth-service";
import { Link, Redirect} from 'react-router-dom';
import './Login.css';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: '', redirect: false };
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    this.service.login(username, password)
    .then( response => {
        this.setState({ username: "", password: "", redirect: true});
        this.props.getUser(response)
    })
    .catch( error => error )
  }
    
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
    
  render(){
    if(this.state && this.state.redirect) {
      return <Redirect to="/profile" />
    }
    return(
      <div>
        <form className="login-container" onSubmit={this.handleFormSubmit}>
          <label className="mb3">Username</label>
          <input className="mb3" type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>
          <label className="mb3" >Password</label>
          <input className="mb3" type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
          
          <input className="login button is-link mb3" type="submit" value="Login" />
        </form>
        <p className="mb3 lastLogin">Don't have an account? 
            <Link to={"/signup"}> Signup</Link>
        </p>
      </div>
    )
  }
}

export default Login;