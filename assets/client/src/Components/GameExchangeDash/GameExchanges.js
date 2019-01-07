import React, { Component } from "react";
import { Link } from "react-router-dom";
import PostService from "../../auth/post-service.js";
import './GameExchanges.css';


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
      this.setState({ ...this.state, posts: response });
    });
  };

  render() {
    let postSnippet = "";
    if (this.state.posts !== null) {
  
      postSnippet = this.state.posts.map(post => {
        return (

          <div className="postPrevFlex">
            <div className="postPrevCont">
              <img className="postPrevImg" alt="imgPostSnippet" src={post.picPath} />
              <h1 className="postPrevTitle">{post.title}</h1>
              <Link to={`/completepost/${post._id}`}>
                <button className="postPrevBtn">Ver anuncio</button>
              </Link>

              <hr />

            </div>
          </div>
        );
      });
    }
    return <div className="scroll">
      <Link to={`/newpost`}>
        <button className="postPrevBtnNew">Nuevo anuncio</button>
      </Link>
      {postSnippet}

    </div>;
  }
}
