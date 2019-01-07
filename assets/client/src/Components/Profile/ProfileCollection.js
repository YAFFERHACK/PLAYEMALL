import React, { Component } from 'react'
import GameFinder from '../GameFinder'
import CollService from "../../auth/collection-service";
import { Link } from "react-router-dom";
import './ProfileCollection.css';
import RemoveButton from './RemoveButton.js';

export default class ProfileCollection extends Component {

  constructor() {
    super()
    this.state = {
      collName: "",
      collections: null,
      deployed: false
    }

    this.collectionList = null;
    this.service = new CollService();
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ ...this.state, [name]: value });
  };

  createCollection = () => {
    const name = this.state.collName;
    
    this.service.newCollection(name)
      .then(() => this.getCollectionData())
      .then(() => {
        this.setState({ ...this.state, collName: "" })
      })
      .catch((err) => {
        return err
      })
  }

  deleteCollection = (event) => {
    const { value } = event.target;    
    let id = this.state.collections[value]._id;

    this.service.removeCollection(id)
      .then(() => this.getCollectionData())
      .catch((err) => {
        return err
      })

  }


  getCollectionData = () => {

    this.service.userCollections()
      .then((populatedUser) => {
        if (this.props.user) {
          
          this.setState({ ...this.state, collections: populatedUser.collections })
        }
      })
  }

  gameRemoveHandler = (collectionId, gameId) => {

    this.service.removeGame(collectionId, gameId)
      .then((response) => {
        
        return response
      })
      .then(() => this.getCollectionData())
      .catch((err) => {
        return err;
      })
  }

  addGameHandler = (collectionId, game) => {
    
    this.service.addGame(collectionId, game)
      .then((response) => {
        
        return response
      })
      .then(() => this.getCollectionData())
      .catch((err) => {
        return err
      })
  }

  componentDidMount() {
    this.getCollectionData();
  }



  render() {

    let dropDownClass = "dropdown";
    if (this.state.deployed) { dropDownClass = "dropdown is-active" }

    if (this.state.collections !== null && this.state.collections !== undefined) {
      this.collectionList = this.state.collections.map((collection, i) => {
        let gamesList = collection.games.map((game, i) => {
          let gameId = game._id;
          let collectionId = collection._id;
          return (
            <div className="game-container" key={i}>
              <Link to={`/gameinfo/${game.idIgdb}`}><h3>{game.name}</h3></Link>
              <button className="button is-danger is-rounded rmv" onClick={() => this.gameRemoveHandler(collectionId, gameId)} >-</button>
            </div>

          )
        })
        return (
          <div className="collection-container" key={i}>
            <div className="collection-header">
              <h1 className="collection-title mr3">{collection.name}</h1>
              <GameFinder addGameHandler={(collectionId, game) => this.addGameHandler(collectionId, game)} collection={collection} user={this.props.user} />
            </div>
            <div className="games-container">
              {gamesList}
            </div>
            <RemoveButton deleteCollection ={this.deleteCollection} value = {i}/>
          </div>
        )
      })
    }


    return (

      <div className="collections-parent">

        <h1 className="collections-title">{(this.props.user) && this.props.user.username}'s collections:</h1>
        <div className="collections-container">
          <label className="mr3" htmlFor="coll-name">Title </label>
          <input className="mr3" value={this.state.collName} type="text" name="collName" id="coll-name" onChange={(e) => this.handleChange(e)} />
          <button className="button is-link" name="create-coll" onClick={this.createCollection}>Create New Collection</button>
        </div>
        {this.collectionList !== null && this.collectionList}
      </div>

    )
  }
}
