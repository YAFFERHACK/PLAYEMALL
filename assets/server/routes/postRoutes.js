const express = require('express');
const mongoose = require('mongoose');
const Post = require('../models/PostModel/PostModel');
const postRouter  = express.Router();
const User = require("../models/User/User.js");
const axios = require('axios');
require('dotenv').config();

postRouter.get('/dashboard', (req, res, next) => {
  Post.find().populate('creatorId')
    .then(allPosts => {
      res.json(allPosts);
    })
    .catch(err => {
      res.json(err);
    })
});

postRouter.post('/new', (req, res, next)=>{
  const { title, content, price } = req.body;
  // const profileImg = req.file ? req.file.url : '...';
  // console.log(req.file);
  Post.create({
    creatorId: req.user.id,
    title,
    content,
    price,
    // profileImg,
  })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    })
});

// postRouter.get("/post/:id",(req, res, next) => {
//     console.log("entra");
//     Post.findById(req.params.id)
//       .populate("creatorId", "username")
//       .then(post => {
//         console.log(post);
//         res.render("sourcesCode/complete-post", { post, user: req.user });
//       });
//   }
// );

// postRouter.get("/new", ensureLogin.ensureLoggedIn(), (req, res) => {
//   res.render("sourcesCode/newPost", {
//     message: req.flash("error"),
//     user: req.user
//   });
// });

module.exports = postRouter;
