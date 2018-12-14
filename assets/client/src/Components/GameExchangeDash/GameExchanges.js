import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import AuthService from "../../../src/auth/auth-service.js";
import PostService from "../../auth/post-service.js";

export default class GameExchanges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null
    };
    this.service = new PostService();
  }

  componentDidMount = () => {
    this.service.dashboardShowPost().then(response => {
      console.log(response);
      this.setState({...this.state, posts: response})
    });
  };

  render() {
    let postSnippet = "";
    if (this.state.posts !== null) {
    console.log(this.props.post);
     postSnippet = this.state.posts.map(
      post => { 
        return(
          <div>
            <img alt="imgPostSnippet" src={post.picPath} />
            <p>{post.picPath}</p>
            <h1>{post.title}</h1>
            <Link to={`/completepost/${post._id}`}>
          <button>Ver anuncio</button>
        </Link>
          </div>
        )
        // console.log(postSnippet);
      });}
      return (
      <div>
        LoZ AnuNSSsiOs Pa LaS NenAzZZZz
        {postSnippet}
      </div>
    );
  }
}
