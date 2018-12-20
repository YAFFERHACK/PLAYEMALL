import React, { Component } from 'react'
import PostService from "../../auth/post-service.js";
import { Redirect } from "react-router-dom";
import './NewPost.css';


export default class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", content: "", price: "", photo: "", redirect: false };
    this.service = new PostService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const title = this.state.title;
    const content = this.state.content;
    const price = this.state.price;
    const photo = this.state.photo

    this.service
      .dashboardWritePost(title, content, price, photo)
      .then(response => {
        this.setState({
          ...this.state,
          title: "",
          content: "",
          price: "",
          photo: "",
          redirect: true
        });
        this.props.getUser(response);

        // this.props.getUser(response)
      })
      .catch(error => console.log(error));
  };

  handleChange = event => {
    const { name, value } = event.target;
    if (name === "photo") {
      this.setState({ ...this.state, photo: event.target.files[0] })
    } else {
      this.setState({ ...this.state, [name]: value });
    }
  };
  render() {
    if(this.state && this.state.redirect) {
      return <Redirect to="/dashboard" />
    }
    return (
      <div>
        
        <form className="signup-container" onSubmit={this.handleFormSubmit}>
          <h1 className="editform-title"> Nuevos anuncios</h1>
          <label className="mb3">Title</label>
          <input
            className="mb3"
            type="text"
            name="title"
            // value={this.state.title}
            onChange={e => this.handleChange(e)}
          />

          <label className="mb3">Content</label>
          <input
            className="mb3"
            type="text"
            name="content"
            // value={this.state.content}
            onChange={e => this.handleChange(e)}
          />

          <label className="mb3">Price</label>
          <input
            className="mb3"
            type="text"
            name="price"
            // value={this.state.password}
            onChange={e => this.handleChange(e)}
          />

          <input className="mb3" type="file" name="photo" onChange={(e) => this.handleChange(e)} /> <br />


          <input className="submit button is-primary" type="submit" value="New Post" />
        </form>
      </div>
    )
  }
}












// import React, { Component } from 'react'
// import PostService from "../../auth/post-service.js";
// import { Link, Redirect } from "react-router-dom";


// export default class NewPost extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { title: "", content: "", price: "", photo: "", redirect: false };
//     this.service = new PostService();
//   }

//   handleFormSubmit = event => {
//     event.preventDefault();
//     const title = this.state.title;
//     const content = this.state.content;
//     const price = this.state.price;
//     const photo = this.state.photo

//     this.service
//       .dashboardWritePost(title, content, price, photo)
//       .then(response => {
//         this.setState({
//           ...this.state,
//           title: "",
//           content: "",
//           price: "",
//           photo: "",
//           redirect: true
//         });
//         this.props.getUser(response);

//         // this.props.getUser(response)
//       })
//       .catch(error => console.log(error));
//   };

//   handleChange = event => {
//     const { name, value } = event.target;
//     if (name === "photo") {
//       this.setState({ ...this.state, photo: event.target.files[0] })
//     } else {
//       this.setState({ ...this.state, [name]: value });
//     }
//   };
//   render() {
//     if(this.state && this.state.redirect) {
//       return <Redirect to="/dashboard" />
//     }
//     return (
//       <div>
//         nuevos anuncios
//         <form onSubmit={this.handleFormSubmit}>
//           <label>title:</label>
//           <input
//             type="text"
//             name="title"
//             // value={this.state.title}
//             onChange={e => this.handleChange(e)}
//           />

//           <label>content:</label>
//           <input
//             type="text"
//             name="content"
//             // value={this.state.content}
//             onChange={e => this.handleChange(e)}
//           />

//           <label>price:</label>
//           <input
//             type="text"
//             name="price"
//             // value={this.state.password}
//             onChange={e => this.handleChange(e)}
//           />

//           <input type="file" name="photo" onChange={(e) => this.handleChange(e)} /> <br />


//           <input type="submit" value="New Post" />
//         </form>
//       </div>
//     )
//   }
// }
