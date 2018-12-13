import React, { Component } from 'react';
import AuthService from '../auth/auth-service';
import { Link, Redirect } from 'react-router-dom';


class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '', city: '', photo: '', redirect: false };
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const city = this.state.city;
    const photo = this.state.photo;
    console.log(photo)


    this.service.signup(username, password, city, photo)
      .then(response => {
        this.setState({
          ...this.state,
          username: "",
          password: "",
          city: "",
          photo: "",
          redirect: true
        });
        this.props.getUser(response)
 
      })
      .catch(error => console.log(error))
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    if(name == "photo") {
      this.setState({...this.state, photo: event.target.files[0]})
    } else {
      this.setState({...this.state, [name]: value});
}
  }


  render() {
    if (this.state && this.state.redirect) {
      return <Redirect to="/" />
    }

    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} />

          <label>Password:</label>
          <textarea name="password" value={this.state.password} onChange={e => this.handleChange(e)} />

          <label>City:</label>
          <textarea name="city" value={this.state.city} onChange={e => this.handleChange(e)} />

          <input type="file" name="photo" onChange={(e) => this.handleChange(e)} /> <br />
          <button type="submit">Save new profile picture</button>

          <input type="submit" value="Signup" />
        </form>

        <p>Already have account?
            <Link to={"/login"}> Login</Link>
        </p>

      </div>
    )
  }



}

export default Signup;
