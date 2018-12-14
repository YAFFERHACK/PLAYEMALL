import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import AuthService from "../../../src/auth/auth-service.js";
import PostService from "../../auth/post-service.js";

export default class SinglePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null
    };
    this.service = new PostService();
  }

  componentDidMount = () => {
    console.log(this.props.match.params.id)
    this.service.dashboardOne(this.props.match.params.id).then(response => {
      console.log(response);
      this.setState({posts: response}, () => {
        console.log(this.state)
      })
    })
    .catch(console.log)
  };

  render() {
    if (this.state.posts) {
      return (
        <div>
        <h1>{this.state.posts.title}</h1>
        {<h4>{this.state.posts.creatorId.username}</h4> }
        <img alt="img" src={this.state.posts.picPath}/> 
        <h4>{this.state.posts.content}</h4>
        <h4>{this.state.posts.igdbId}</h4>
        <h4>Precio {this.state.posts.price}</h4>
        </div>


      )
    } else {
      return(
        <h1>Loading...</h1>
      )
    }
  }
}

