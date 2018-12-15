const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User/User.js");
const parser = require("../config/cloudinary");
const mongoose = require('mongoose');

const axios = require('axios');
require('dotenv').config();
const igdb = require('igdb-api-node').default;
const client = igdb(process.env.IGDB_KEY);

const Collection = require('../models/CollectionModel/CollectionModel.js');



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
        // expand:['genres','platforms', 'publishers'],
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
        name : name
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
    
    User.findByIdAndUpdate(req.user.id, {$addToSet: {collections: collId}})
    .then((result)=>{
        console.log(result);
    })
    .catch((err)=>{
        console.log(err);
    })
})

router.get('/collections', (req, res) => {

    Collection.find().populate('creatorId')
    .then((result)=>{
        res.status(200).json(result);
    })
    .catch((err)=>{
        res.status(500).json(err);
    })
})


router.get('/user-collections', (req, res) => {
    let id = req.user.id;

    User.findById(id).populate('collections')
    .then((result)=>{
        res.status(200).json(result);
    })
    .catch((err)=>{
        res.status(500).json(err);
    })
})


router.post('/removecoll', (req, res) => {
    let {id} = req.body;

    User.findByIdAndUpdate(req.user.id, {$pull: {collections: id}}, {new:true})
    .then((result)=>{
        console.log('update successful');
        console.log(result);
        res.status(200).json(result);
    })
    .catch((err)=>{
        console.log('update failed');
        console.log(err);
        res.status(500).json(err);
    })
    
    Collection.findByIdAndRemove(id)
    .then((res)=>{
        console.log('removal successful');
        console.log(res);
    })
    .catch((err)=>{
        console.log('removal failed');
        console.log(err);
    })
})

// router.post('/removecoll', (req, res) => {
    
// })
    module.exports = router;
