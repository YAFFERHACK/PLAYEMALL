const express = require('express');
const mongoose = require('mongoose');
const Post = require('../models/PostModel');
const postRouter  = express.Router();
const User = require("../models/User.js");
const axios = require('axios');
require('dotenv').config();
const parser = require("../config/cloudinary");


postRouter.get('/dashboard', (req, res, next) => {
  Post.find().populate('creatorId')
    .then(allPosts => {
      res.json(allPosts);
    })
    .catch(err => {
      res.json(err);
    })
});

postRouter.post('/newpost', parser.single("photo"), (req, res, next)=>{
  const { title, content, price} = req.body;
  const picPath = req.file ? req.file.url : '...';
  // console.log(req.file);

  const newPost = new Post({
    creatorId: req.user.id,
    title,
    content,
    price,
    picPath,
  })

  newPost.save(err => {
    if (err) {
        res
            .status(400)
            .json({ message: "Saving post to database went wrong." });
        return;
    } else {
      res.status(200).json(newPost);
    }

});
  })

//   Post.create({
//     creatorId: req.user.id,
//     title,
//     content,
//     price,
//     postImg,
//   })
//     .then(response => {
//       res.json(response);
//     })
//     .catch(err => {
//       res.json(err);
//     })
// });

postRouter.get("/completepost/:id",(req, res, next) => {
    console.log("entra");
    Post.findById(req.params.id)
      .populate("creatorId", "username")
      .then(post => {
        console.log(post);
        res.json( post );
      });
  }
);

// postRouter.get("/new", ensureLogin.ensureLoggedIn(), (req, res) => {
//   res.render("sourcesCode/newPost", {
//     message: req.flash("error"),
//     user: req.user
//   });
// });

module.exports = postRouter;
