import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/UserLogin/Login";
import Signup from "./Components/Signup";
import Profile from "./Components/Profile/Profile";
import SingleGameInfo from "./Components/SingleGameInfo";
import ProfileEdit from "./Components/Profile/ProfileEdit";
import AuthService from "./auth/auth-service";
import GameExchanges from "./Components/GameExchangeDash/GameExchanges";
import SinglePost from "./Components/GameExchangeDash/ExchangeSinglePost";
import NewPost from "./Components/GameExchangeDash/NewPost";
import Nav from './Components/Nav'
import GameSearch from './Components/GameSearch';
import MustPlay from './Components/MustPlay';
import Loading from "./Components/Loading";
import Loading2 from "./Components/Loading2";



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
      .then(user => {
        // console.log(user);
        this.setState({ ...this.state, loggedInUser: user })});
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
        <Nav user={this.state.loggedInUser} logout={this.Getloggout}/>


        <Switch>
          <Route exact path='/' component={Home}/>
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
          <Route
            exact
            path="/dashboard"
            render={() => <GameExchanges user={this.state.loggedInUser} />}
          />
          <Route
            exact
            path="/completepost/:id"
            render={(match) => <SinglePost user={this.state.loggedInUser} {...match}/>}
          />
          <Route
            exact
            path="/newpost"
            render={(match) => <NewPost user={this.state.loggedInUser} {...match}/>}
          />
          <Route
            exact
            path="/gamesearch"
            render={(match) => <GameSearch user={this.state.loggedInUser} {...match}/>}
          />
          <Route
            exact
            path="/mustplay"
            render={(match) => <MustPlay user={this.state.loggedInUser} {...match}/>}
          />
          {/* <Route exact path="/gameinfo" component={SingleGameInfo} /> */}
          {/* <LogoutRoute redirectTo='/login' /> */}
        </Switch>
        {/* <button classname="angleinleft" onClick={this.Getloggout}>pepe se va</button> */}
        {/* <Home/> */}
      </div>
    );
  }
}

export default App;