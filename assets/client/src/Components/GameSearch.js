import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import './GameSearch.css'
require('dotenv').config();


export default class GameSearch extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      searchField: "",
      games: [],
      deployed: false
    }
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ ...this.state, [name]: value });
  };

  findHandler = () => {

    axios.get(`${process.env.REACT_APP_API_URL}/dbroutes/gamesearch/${this.state.searchField}`)
      .then((response) => {
        console.log('findHandler axios then')
        this.setState({ ...this.state, games: [...response.data], deployed: true }, function () {
          console.log(this.state.games);
        });
      })
      .catch((err) => {
        console.log('findHandler axios catch');
        console.log(err);
      })

  }


  render() {

    let dropDownClass = "dropdown";
    if (this.state.deployed) { dropDownClass = "dropdown is-active" }

    let gameList = []
    if (this.state.games !== []) {
      gameList = this.state.games.map((game) => {
        console.log(game)
        return (
          <React.Fragment>
            <div className="dropdown-item">
              <Link to={`/gameinfo/${game.id}`}><div><h4>{game.name}</h4></div></Link>
            </div>
            <hr className="dropdown-divider" />
          </React.Fragment>
        )
      })
    }

    return (
      <div className="gamesearch-container">
        <h1 className="gameSearchTitle">Game Search</h1>
        <input className="searchBarGame" type="text" name="searchField" id="searchField" placeholder="enter a title here" onChange={(e) => { this.handleChange(e) }} />
        <button id="find-button" className="button is-light" onClick={() => this.findHandler()}>Find!</button>
        <div onClick={() => { this.setState({ ...this.state, deployed: !this.state.deployed }) }} className={dropDownClass}>
          <div className="dropdown-trigger">
            <button className="button" aria-haspopup="true" aria-controls="dropdown-menu2">
              <span>Results</span>
              <span className="icon is-small">
                <i className="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
          </div>
          <div className="dropdown-menu" id="dropdown-menu2" role="menu">
            <div className="dropdown-content">
              {gameList}
            </div>
          </div>
        </div>
      </div>
    )
  }
}








// import React from 'react';
// import axios from 'axios';
// import {Link} from "react-router-dom";
// require('dotenv').config()


// export default class GameSearch extends React.Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       searchField: "",
//       games: []
//     }
//   }

//   handleChange = event => {
//     const { name, value } = event.target;
//     this.setState({ ...this.state, [name]: value });
//   };

//   findHandler = () => {

//     axios.get(`${process.env.REACT_APP_API_URL}/dbroutes/gamesearch/${this.state.searchField}`)
//       .then((response) => {
//         console.log('findHandler axios then')
//         this.setState({ ...this.state, games: [...response.data] }, function () {
//           console.log(this.state.games);
//         });
//       })
//       .catch((err) => {
//         console.log('findHandler axios catch');
//         console.log(err);
//       })

//   }


//   render() {

//     let gameList = []
//     if (this.state.games !== []) {
//       gameList = this.state.games.map((game) => {
//         return (
//           <Link to={`/gameinfo/${game.id}`}><div><h4>{game.name}</h4></div></Link>
//         )
//       })
//     }

//     return (
//       <div>
//         <input type="text" name="searchField" id="searchField" onChange={(e) => { this.handleChange(e) }} />
//         <button onClick={() => this.findHandler()}>Find!</button>
//         {/* <select name="game-selector" id="game-selector"> */}
//         {gameList}
//         {/* </select> */}
//       </div>
//     )
//   }
// }