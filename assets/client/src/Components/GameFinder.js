import React from 'react';
import axios from 'axios';
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

  addGameLocalHandler = (collectionId, game) => {
    // console.log(collectionId);
    // console.log(game);
    this.props.addGameHandler(collectionId, game)

    // .then(()=>{
    //   console.log('success')
    // })
    // .catch((err)=>{
    //   console.log(err)
    // })
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
      <div>
        <input type="text" name="searchField" id="searchField" onChange={(e) => { this.handleChange(e) }} />
        <button onClick={() => this.findHandler()}>Find!</button>
        <div onClick={() => { this.setState({ ...this.state, deployed: !this.state.deployed }) }} class={dropDownClass}>
          <div className="dropdown is-up">
            <div class="dropdown-trigger">
              <button class="button" aria-haspopup="true" aria-controls="dropdown-menu2">
                <span>Results</span>
                <span class="icon is-small">
                  <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu2" role="menu">
              <div class="dropdown-content">
                {gameList}
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}






// import React from 'react';
// import axios from 'axios';
// require('dotenv').config()


// export default class GameFinder extends React.Component {
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

//   addGameLocalHandler = (collectionId, game) => {
//     // console.log(collectionId);
//     // console.log(game);
//     this.props.addGameHandler(collectionId, game)

//     // .then(()=>{
//     //   console.log('success')
//     // })
//     // .catch((err)=>{
//     //   console.log(err)
//     // })
//   }

//   render() {

//     let gameList = []
//     if (this.state.games !== []) {
//       gameList = this.state.games.map((game) => {
//         return (
//           // <option onClick={this.addGameLocalHandler(this.props.collection._id, game)} value={this.props.collection._id}>{game.name}</option>
//           <div><h4>{game.name}</h4><button onClick={()=>{ this.addGameLocalHandler(this.props.collection._id, game)}} >AddGame</button></div>
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