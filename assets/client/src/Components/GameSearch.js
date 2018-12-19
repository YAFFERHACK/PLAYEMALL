import React from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
require('dotenv').config()


export default class GameSearch extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      searchField: "",
      games: []
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
        this.setState({ ...this.state, games: [...response.data] }, function () {
          console.log(this.state.games);
        });
      })
      .catch((err) => {
        console.log('findHandler axios catch');
        console.log(err);
      })

  }


  render() {

    let gameList = []
    if (this.state.games !== []) {
      gameList = this.state.games.map((game) => {
        return (
          <Link to={`/gameinfo/${game.id}`}><div><h4>{game.name}</h4></div></Link>
        )
      })
    }

    return (
      <div>
        <input type="text" name="searchField" id="searchField" onChange={(e) => { this.handleChange(e) }} />
        <button onClick={() => this.findHandler()}>Find!</button>
        {/* <select name="game-selector" id="game-selector"> */}
        {gameList}
        {/* </select> */}
      </div>
    )
  }
}