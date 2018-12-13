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
        console.log(this.props.match.params);
        const { params } = this.props.match;
        console.log(params);
        axios.get(`http://localhost:5000/api/dbroutes/gameinfo/${params.id}`)
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

            let platforms = null;
            if (this.state.gameInfo[0].platforms !== undefined) {
                platforms = this.state.gameInfo[0].platforms.map((platform) => {
                    return <span>{platform.name}, </span>
                })
            } else { platforms = 'not available' }

            let genres = null;
            if (this.state.gameInfo[0].genres !== undefined) {
                genres = this.state.gameInfo[0].genres.map((genre) => {
                    return <span>{genre.name}, </span>
                })
            } else { genres = 'not available' }


            let publishers = null;
            if (this.state.gameInfo[0].publishers !== undefined) {
                publishers = this.state.gameInfo[0].publishers.map((publisher) => {
                    return <span>{publisher.name}, </span>
                })
            } else { publishers = 'not available' }

            let firstReleaseDate = null;
            if (this.state.gameInfo[0].first_release_date) {
                firstReleaseDate = new Date(this.state.gameInfo[0].first_release_date).toLocaleDateString('en-De');
            } else { firstReleaseDate = 'not available' }

            let cover = null;
            if (this.state.gameInfo[0].cover !== undefined) {
                cover = `//images.igdb.com/igdb/image/upload/t_screenshot_med/${this.state.gameInfo[0].cover.cloudinary_id}.jpg`;
            } else { cover = `https://shop.purgatoryresort.com/bundles/spotliowebappfront/purgatoryresort/images/photo_not_available.jpg` }

            let screenshot = null;
            if (this.state.gameInfo[0].screenshots !== undefined ) {
                screenshot = `//images.igdb.com/igdb/image/upload/t_screenshot_med/${this.state.gameInfo[0].screenshots[0].cloudinary_id}.jpg`
            } else { screenshot = `https://shop.purgatoryresort.com/bundles/spotliowebappfront/purgatoryresort/images/photo_not_available.jpg` }

            let video = null;
            if (this.state.gameInfo[0].videos !== undefined) {
                video = `https://www.youtube.com/embed/${this.state.gameInfo[0].videos[0].video_id}`;
            } else { video = 'https://www.youtube.com/embed/tgbNymZ7vqY' }


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

