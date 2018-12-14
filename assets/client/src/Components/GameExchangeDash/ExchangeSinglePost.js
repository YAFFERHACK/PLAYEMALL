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
    let postComplete = "";
    // if (this.state.posts !== null) {
    console.log(this.state.posts);
    // postComplete = this.state.posts.find(post => post.id == )(
    //   post => { 
    //     return(
    //       <div>
    //         <img alt="imgPostSnippet" src={post.picPath} />
    //         <h1>{post.title}</h1>
    //         <Link to={`/dashboard`}>
    //       <button>Volver</button>
    //     </Link>
    //       </div>
    //     )
    //     // console.log(postSnippet);
    //   });}
      return (
      <div>
        LoZ AnuNSSsiOs Pa LaS NenAzZZZz
        {this.state.posts ? this.state.posts.title: <p>Loading...</p>}
      </div>
    );
  }
}

