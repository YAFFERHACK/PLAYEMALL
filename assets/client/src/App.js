import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Switch, Route, Link } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/UserLogin/Login";
import Signup from "./Components/UserLogin/Signup";
import Profile from "./Components/Profile/Profile";
import SingleGameInfo from "./Components/SingleGameInfo";
import ProfileEdit from "./Components/Profile/ProfileEdit";
import AuthService from "./auth/auth-service";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.auth = new AuthService();
    this.Getloggedin();
  }

  Getloggedin = () => {
    this.auth
      .loggedin()
      .then(user => this.setState({ ...this.state, loggedInUser: user }));
  };

  getTheUser = userObj => {
    this.setState({
      loggedInUser: userObj
    });
  };

  Getloggout = () => {
    this.auth
      .logout()
      .then(() => this.setState({ ...this.state, loggedInUser: null }));
  };
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home}/>
          {/* <Route exact path='/login' render={() => <Login getUser={this.getTheUser}/>}/> */}
          {/* <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser}/>}/> */}
          {/* <Route exact path='/profile' render={() => <Profile getUser={this.getTheUser}/>}/> */}
          <Route exact path='/gameinfo/:id' render ={(match)=> <SingleGameInfo {...match}/>}/>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/login"
            render={() => <Login getUser={this.getTheUser} />}
          />
          <Route
            exact
            path="/signup"
            render={() => <Signup getUser={this.getTheUser} />}
          />
          <Route
            exact
            path="/profile"
            render={() => <Profile user={this.state.loggedInUser} />}
          />
          <Route
            exact
            path="/editprofile"
            render={() => <ProfileEdit user={this.state.loggedInUser} />}
          />
          {/* <Route exact path="/gameinfo" component={SingleGameInfo} /> */}
          {/* <LogoutRoute redirectTo='/login' /> */}
        </Switch>
        <button onClick={this.Getloggout}>pepe se va</button>
      </div>
    );
  }
}

export default App;