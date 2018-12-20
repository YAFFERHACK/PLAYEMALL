import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import AuthService from "../../../src/auth/auth-service.js";
import PostService from "../../auth/post-service.js";
import './ExchangeSinglePost.css';


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
        <div className="postComCont">
        <h1 className="postComTitle">{this.state.posts.title}</h1>
        {<h4 className="postComAuthor"><b>Autor:</b> {this.state.posts.creatorId.username}</h4> }
        <img className="postComImg" alt="img" src={this.state.posts.picPath}/> 
        <h4 className="postComContent">{this.state.posts.content}</h4>
        {/* <h4 className="postComUrl">{this.state.posts.igdbId}</h4> */}
        <h4 className="postComPrice"><b>Precio:</b> {this.state.posts.price} euros</h4>
        <Link className="postComBtn" to={`/dashboard`}>
          <button className="postComBtn">Back</button>
        </Link>
        </div>


      )
    } else {
      return(
        <h1>Loading...</h1>
      )
    }
  }
}

