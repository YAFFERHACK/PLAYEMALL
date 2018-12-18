import React, { Component } from 'react';
import CollService from "../auth/collection-service";
import axios from "axios";
import Loading from './Loading';


export default class MustPlay extends Component {
    constructor() {
        super();
        this.state = {
            gameInfo: null
        };
        this.service = new CollService();
    }

    getGameInfo = () => {
        let fields = [];
        for (let i = 0; i < 5; i++) {
            fields.push(Math.floor(Math.random() * 8500))
        }
        this.service.mustPlay(fields)
            .then((response) => {
                this.setState({ ...this.state, gameInfo: response })
                console.log(fields)
                console.log(this.state)
            })
    };

    componentDidMount() {
        this.getGameInfo();
    }

    render() {



        if (this.state.gameInfo === null) {
            return (
                <div>
                    <Loading/>
                </div>
            )
        } else {

            let gamecards = this.state.gameInfo.map((game) => {

                let cover = null;
                if (game.cover !== undefined) {
                    cover = `//images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.cloudinary_id}.jpg`;
                } else { cover = `https://shop.purgatoryresort.com/bundles/spotliowebappfront/purgatoryresort/images/photo_not_available.jpg` }

                let publishers = null;
                if (game.publishers !== undefined) {
                    publishers = game.publishers.map((publisher) => {
                        return <span>{publisher.name}, </span>
                    })
                } else { publishers = 'publishers not available' }

                let rating = null;
                if (game.total_rating !== undefined){
                    rating = game.total_rating
                    rating = rating.toFixed(1)
                } else {
                    rating = '-'
                }
                

                return (
                    <div>
                        <img src={cover} alt="gamecover" />
                        <h1>{game.name}</h1>
                        <h3>{publishers}</h3>
                        <h3>{rating}</h3>
                    </div>
                )
            })

            return (
                <div>

                    {gamecards}

                </div>
            )

        }

    }
}

