import React, { Component } from 'react'
import GameFinder from '../GameFinder'
import CollService from "../../auth/collection-service";

export default class ProfileCollection extends Component {

  constructor() {
    super()
    this.state = {
      collName: "",
      collections: null,
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
    console.log(name);
    this.service.newCollection(name)
      .then(() => this.getCollectionData())
      .then(() => {
        this.setState({ ...this.state, collName: "" }, function () { console.log(this.state.collName); })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  deleteCollection = (event) => {
    const { value } = event.target;
    console.log(event.target);
    console.log(this.state.collections);
    let id = this.state.collections[value]._id;

    this.service.removeCollection(id)
      .then(() => this.getCollectionData())
      .catch((err) => {
        console.log(err)
      })

  }

  getCollectionData = () => {
    this.service.userCollections()
      .then((populatedUser) => {
        // console.log('it did update');
        // console.log(this.state.collections);
        // console.log(populatedUser.collections);
        debugger
        if (this.state.collections === null || 
          this.state.collections.length !== populatedUser.collections.length ) 
        { 
          this.setState({ ...this.state, collections: populatedUser.collections 
          }) }
      })
  }

  gameRemoveHandler = (collectionId, gameId) => {
  
    this.service.removeGame(collectionId, gameId)
    .then(this.getCollectionData())
    .catch((err)=>{
      console.log(err);
    })
  }

  componentDidMount() {
    this.getCollectionData();
  }



  render() {


    if (this.state.collections !== null) {
      this.collectionList = this.state.collections.map((collection, i) => {
        let gamesList = collection.games.map((game) => {
          let gameId = game._id;
          let collectionId = collection._id;
          return (
            <React.Fragment>
              <h3>{game.name}</h3>
              <button onClick={() => this.gameRemoveHandler(collectionId, gameId)} >Remove</button>
            </React.Fragment>

          )
        })
        return (
          <div key={i}>
            <h2 >{collection.name}</h2>
            <div>{gamesList}</div>
            <button value={i} onClick={(e) => { this.deleteCollection(e) }}>Delete</button>
            <GameFinder collection={collection} user={this.props.user} />
          </div>
        )
      })
    }


    return (
      <React.Fragment>
        <div>
          <label htmlFor="coll-name">Collection name: </label>
          <input value={this.state.collName} type="text" name="collName" id="coll-name" onChange={(e) => this.handleChange(e)} />
          <button name="create-coll" onClick={this.createCollection}>Create New Collection</button>
          <h1>{(this.props.user) && this.props.user.username}'s collections:</h1>
          {this.collectionList !== null && this.collectionList}
        </div>


        {/* <div>
        <img style={{height:200}} alt="cover" src="https://www.indiumsoft.com/Blog/wp-content/uploads/2017/10/gamer.png"/>
        <h5>Ryu ga Gotoku</h5>
        <h5>SEGA</h5>
        <h5>PS4, XBOX(coj)ONE</h5>
      </div> */}
      </React.Fragment>
    )
  }
}
