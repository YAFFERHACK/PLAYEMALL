import React from 'react';
import axios from 'axios';
import './GameFinder.css';
require('dotenv').config();

export default class GameFinder extends React.Component {
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

  addGameLocalHandler = (collectionId, game) => {
    this.props.addGameHandler(collectionId, game)
  }

  render() {

    let gameList = []
    if (this.state.games !== []) {
      gameList = this.state.games.map((game) => {
        return (
          <div><h4>{game.name}</h4><button onClick={() => { this.addGameLocalHandler(this.props.collection._id, game) }} >AddGame</button></div>
        )
      })
    }

    let dropDownClass = "dropdown";
    if (this.state.deployed) { dropDownClass = "dropdown is-active" }

    return (
      <div className="gamefinder-container">
        <input className="mr3" type="text" name="searchField" id="searchField" onChange={(e) => { this.handleChange(e) }} />
        <button className="button is-link mr3" onClick={() => this.findHandler()}>Find!</button>
        <div onClick={() => { this.setState({ ...this.state, deployed: !this.state.deployed }) }} className={dropDownClass}>
          <div className="dropdown is-right">
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

      </div>
    )
  }
}