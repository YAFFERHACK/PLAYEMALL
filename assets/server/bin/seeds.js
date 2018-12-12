// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
require('dotenv').config();
const bcrypt = require("bcrypt");
const User = require("../models/User/User.js");
// const Post = require("../models/PostModel/PostModel");
// const Comment = require("../models/CommentModel/CommentModel");
// const SingleGame = require("../models/SingleGameModel/SingleGameModel");
// const Collection = require("../models/CollectionModel/CollectionModel");



const bcryptSalt = 10;

mongoose
  .connect(process.env.DBLOCALPATH, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let users = [
  {
    username: "FerGamer",
    password: bcrypt.hashSync("FerGamer", bcrypt.genSaltSync(bcryptSalt)),
    city: "Sevilla",
    profileImg: "",
  },
  {
    username: "YMyers",
    password: bcrypt.hashSync("YMyers", bcrypt.genSaltSync(bcryptSalt)),
    city: "Madrid",
    profileImg: "",
  },
  
]

User.deleteMany()
.then(() => {
  return User.create(users)
})
.then(usersCreated => {
  console.log(`${usersCreated.length} users created with the following id:`);
  console.log(usersCreated.map(u => u._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})