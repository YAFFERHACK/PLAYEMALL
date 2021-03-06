const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User.js");
const parser = require("../config/cloudinary");
const mongoose = require('mongoose');

const axios = require('axios');
require('dotenv').config();
const igdb = require('igdb-api-node').default;
const client = igdb(process.env.IGDB_KEY);

const Collection = require('../models/CollectionModel.js');
const Game = require('../models/SingleGameModel.js');



router.get('/igdbgames', (req, res) => {
    client.games({
        ids: [343],
        // filters: {
        //     'release_dates.date-gt': '2010-12-31',
        //     'release_dates.date-lt': '2015-01-01',
        //     'total_rating-gte':80
        // },
        fields: ['id', 'name', 'developers', 'publishers', 'total_rating', 'url', 'first_release_date'],
        expand: ['developers', 'publishers'],
        limit: 20,
        search: 'battlefield',
    })
        .then((response) => {
            res.status(200).json(response.body);
        })
        .catch((err) => {
            res.status(500).json(err);
            console.log(err);
            return err
        })
})

router.post('/mustplay', (req, res) => {
    let { fields } = req.body;
    console.log(fields);
    client.games({
        ids: [...fields],
        // filters: {
        //     'release_dates.date-gt': '2010-12-31',
        //     'release_dates.date-lt': '2015-01-01',
        //     'total_rating-gte':80
        // },
        fields: ['id', 'name', 'developers', 'publishers', 'total_rating', 'url', 'first_release_date', 'cover'],
        expand: ['developers', 'publishers'],
        limit: 20,
        search: 'battlefield',
    })
        .then((response) => {
            res.status(200).json(response.body);
        })
        .catch((err) => {
            res.status(500).json(err);
            console.log(err);
            return err
        })
})


router.get('/gameinfo/:id', (req, res) => {

    console.log(req.params.id);

    client.games({
        ids: [req.params.id],
        // filters: {
        //     'release_dates.date-gt': '2010-12-31',
        //     'release_dates.date-lt': '2015-01-01',
        //     'total_rating-gte':80
        // },
        fields: '*',
        expand: ['genres', 'platforms', 'publishers'],
        limit: 20,
        // search: 'battlefield'
    })
        .then((response) => {
            res.status(200).json(response.body);
        })
        .catch((err) => {
            res.status(500).json(err);
            console.log(err);
            return err
        })
})


router.get('/gamesearch/:search', (req, res) => {

    console.log(req.params.search);

    client.games({
        // ids: [req.params.id],
        // filters: {
        //     'release_dates.date-gt': '2010-12-31',
        //     'release_dates.date-lt': '2015-01-01',
        //     'total_rating-gte':80
        // },
        // fields: '*',
        fields: ['id', 'name', 'developers', 'publishers', 'total_rating', 'url', 'first_release_date'],
        expand: ['genres', 'platforms', 'publishers'],
        limit: 20,
        search: req.params.search
    })
        .then((response) => {
            res.status(200).json(response.body);
        })
        .catch((err) => {
            res.status(500).json(err);
            console.log(err);
            return err
        })
})


router.post('/newcoll', (req, res) => {
    let { name } = req.body;
    let creatorId = mongoose.Types.ObjectId(req.user.id);

    console.log(req.user.id);

    if (!name) {
        name = 'unnamedCollection';
    };

    User.findOne({ name }, (err, foundColl) => {
        if (err) {
            res.status(500).json({ message: "Mongo: Problem checking the name against the database." });
            return;
        }

        if (foundColl && foundColl.creatorId === req.user.id) {
            res.status(400).json({ message: "Collection name taken. Choose another one." });
            return;
        }
    });


    const newCollection = new Collection({
        creatorId: creatorId,
        name: name
    });

    let CollectionID = newCollection.save(err => {
        if (err) {
            res
                .status(400)
                .json({ message: "Saving user to database went wrong." });
            return;
        }
        res.status(200).json(newCollection);
        return newCollection
    });

    let collId = newCollection._id;

    User.findByIdAndUpdate(req.user.id, { $addToSet: { collections: collId } })
        .then((result) => {
            console.log(result);
        })
        .catch((err) => {
            console.log(err);
        })
})

router.get('/collections', (req, res) => {

    Collection.find().populate('creatorId')
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
})


router.get('/user-collections', (req, res) => {
    let id = req.user.id;

    User.findById(id).populate({
        path: 'collections',
        populate: {
            path: 'games'
        }

    })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
})


router.post('/removecoll', (req, res) => {
    let { id } = req.body;

    // User.findByIdAndUpdate(req.user.id, { $pull: { collections: id } }, { new: true })
    //     .then((result) => {
    //         console.log('update successful');
    //         console.log(result);
    //         Collection.findByIdAndRemove(id)
    //         .then((res) => {
    //             res.status(200).json(result);
    //             console.log('removal successful');
    //             console.log(res);
    //         })
    //         .catch((err) => {
    //             console.log('removal failed');
    //             console.log(err);
    //         })
    //     })
    //     .catch((err) => {
    //         console.log('update failed');
    //         console.log(err);
    //         res.status(500).json(err);
    //     })

    Promise.all([
        User.findByIdAndUpdate(req.user.id, { $pull: { collections: id } }, { new: true }),
        Collection.findByIdAndRemove(id)
    ])
        .then(result => {
            const userUpdate = result[0]
            res.status(200).json({ result: userUpdate })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })

})

router.post('/addgame', async (req, res) => {
    let { collectionId, game } = req.body;
    // console.log(collectionId);
    // console.log(game);
    // console.log('ENTRA A LA RUTA DEL SERVIDOR')
    let { name, id } = game;
    if (game.url !== undefined) { let { url } = game } else { let url = 'not available' }
    if (game.summary !== undefined) { let { summary } = game } else { let summary = 'not available' }
    if (game.rating !== undefined) { let { rating } = game } else { let rating = 'not available' }
    if (game.publishers !== undefined) { let { publishers } = game } else { let publishers = 'not available' }
    if (game.first_release_date !== undefined) { let { first_release_date } = game } else { let first_release_date = 'not available' }
    if (game.genres !== undefined) { let { genres } = game } else { let genres = 'not available' }
    if (game.platforms !== undefined) { let { platforms } = game } else { let platforms = 'not available' }
    if (game.screenshots !== undefined) { let { screenshots } = game } else { let screenshots = 'not available' }
    if (game.videos !== undefined) { let { videos } = game } else { let videos = 'not available' }
    if (game.cover !== undefined) { let { cover } = game } else { let cover = 'not available' }


    let idIgdb = id;

    // await console.log({ collectionId, idIgdb, name });

    let alreadyInDb = false;
    let gameId = null;

    await Game.findOne({ idIgdb }, (err, foundGame) => {
        if (err) {
            res.status(500).json({ message: "Mongo: Problem checking the name against the database." });
            return;
        }

        if (foundGame) {
            // console.log(foundGame);
            alreadyInDb = true;
            gameId = foundGame._id;
            return;
        }
    });

    // await console.log("already in Db: " + alreadyInDb);

    if (!alreadyInDb) {
        let newGame = new Game({
            idIgdb: idIgdb,
            name: name
        })

        await newGame.save(err => {
            if (err) {
                res
                    .status(400)
                    .json({ message: "Saving game to database went wrong." });
                return;
            }

            return newGame
        });

        gameId = newGame._id;
    }

    await Collection.findByIdAndUpdate(collectionId, { $addToSet: { games: gameId } }, { new: true })
        .then((result) => {
            console.log(result);
            // if (alreadyInDb) {
            //     res.status(203).json(result);
            // }
        })
        .catch((err) => {
            console.log(err);
        })

    await Game.findByIdAndUpdate(gameId, { $addToSet: { collections: collectionId } }, { new: true })
        .then((result) => {
            // console.log(result);
            // if (alreadyInDb) {
            //     res.status(200).json(result);
            // }
            res.status(202).json({ msg: 'OK' });
        })
        .catch((err) => {
            console.log(err);
        })
})

router.post('/removefromcoll', (req, res) => {
    let { collectionId, gameId } = req.body;

    Collection.findByIdAndUpdate(collectionId, { $pull: { games: gameId } }, { new: true })
        .then((result) => {
            console.log('update successful');
            console.log(result);
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log('update failed');
            console.log(err);
            res.status(500).json(err);
        })

})

module.exports = router;
