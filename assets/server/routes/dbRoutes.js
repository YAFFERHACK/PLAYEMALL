const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User/User.js");
const parser = require("../config/cloudinary");

const axios = require('axios');
require('dotenv').config();
const igdb = require('igdb-api-node').default;
const client = igdb(process.env.IGDB_KEY);



router.get('/igdbgames', (req, res) => {
    client.games({
        ids: [343],
        // filters: {
        //     'release_dates.date-gt': '2010-12-31',
        //     'release_dates.date-lt': '2015-01-01',
        //     'total_rating-gte':80
        // },
        fields: ['id','name','developers', 'publishers', 'total_rating', 'url','first_release_date'],
        expand: ['developers','publishers'],
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
        expand:['genres','platforms', 'publishers'],
        limit: 20,
        search: 'battlefield'
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



module.exports = router;
