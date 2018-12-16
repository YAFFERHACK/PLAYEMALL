import React from 'react';
import axios from 'axios';

export default class GameFinder extends React.Component {
  constructor() {
    super()

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

    axios.get(`http://localhost:5000/api/dbroutes/gamesearch/${this.state.searchField}`)
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
          <option value={game.id}>{game.name}</option>
        )
      })
    }

    return (
      <div>
        <input type="text" name="searchField" id="searchField" onChange={(e) => { this.handleChange(e) }} />
        <button onClick={() => this.findHandler()}>Find!</button>
        <select name="game-selector" id="game-selector">
        {gameList}
        </select>
      </div>
    )
  }
}