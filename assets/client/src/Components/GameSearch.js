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
        
        this.setState({ ...this.state, games: [...response.data], deployed: true });
      })
      .catch((err) => {
        return err
      })

  }


  render() {

    let dropDownClass = "dropdown";
    if (this.state.deployed) { dropDownClass = "dropdown is-active" }

    let gameList = []
    if (this.state.games !== []) {
      gameList = this.state.games.map((game) => {
        
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