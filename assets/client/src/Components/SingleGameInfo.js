import React, { Component } from 'react';
import AuthService from '../auth/auth-service';
import { Link, Redirect } from 'react-router-dom';
import axios from "axios";

export default class SingleGameInfo extends Component {
    constructor() {
        super();
        this.state = { gameInfo: null };
    }

    getGameInfo = () => {
        axios.get(`http://localhost:5000/api/dbroutes/gameinfo/343`)
            .then(responseFromApi => {
                console.log(responseFromApi.data);
                this.setState({
                    gameInfo: responseFromApi.data
                });
            });
    };

    componentDidMount() {
        this.getGameInfo();
    }

    render() {

        

        if (this.state.gameInfo === null) {
            return (
                <div>
                    <h1>Loading...</h1>
                </div>
            )
        } else {

            let platforms = this.state.gameInfo[0].platforms.map((platform)=>{
                return <span>{platform.name}, </span>
            })

            let genres = this.state.gameInfo[0].genres.map((genre)=>{
                return <span>{genre.name}, </span>
            })

            let publishers = this.state.gameInfo[0].publishers.map((publisher)=>{
                return <span>{publisher.name}, </span>
            })            

            let firstReleaseDate = new Date(this.state.gameInfo[0].first_release_date).toLocaleDateString('en-De');

            let cover = `//images.igdb.com/igdb/image/upload/t_screenshot_med/${this.state.gameInfo[0].cover.cloudinary_id}.jpg`;

            let screenshot =`//images.igdb.com/igdb/image/upload/t_screenshot_med/${this.state.gameInfo[0].screenshots[0].cloudinary_id}.jpg`

            let video = `https://www.youtube.com/embed/${this.state.gameInfo[0].videos[0].video_id}`;

            return (
                <div>
                    <img alt="cover" src={cover} />
                    <h1>{this.state.gameInfo[0].name}</h1>
                    <hr />
                    <p>Genre: {genres}</p>
                    <p>Release date: {firstReleaseDate}</p>
                    <p>Platforms: {platforms}</p>
                    <p>rating: {this.state.gameInfo[0].total_rating}</p>
                    <p>Summary: {this.state.gameInfo[0].summary}</p>
                    <p>Publishers: {publishers}</p>
                    <p><a href={this.state.gameInfo[0].url} >{this.state.gameInfo[0].name}@IGDB</a></p>
                    <hr />
                    <p>Screenshots</p>
                    <img alt="img" src={screenshot} />
                    <hr />
                    <h3>Videos</h3>
                    <iframe width="420" height="315" src={video} />
                </div>
            )

        }

    }
}

