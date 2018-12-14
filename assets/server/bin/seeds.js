// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
require('dotenv').config();
const bcrypt = require("bcrypt");
const User = require("../models/User/User.js");
const Post = require("../models/PostModel/PostModel");
const Comment = require("../models/CommentModel/CommentModel");
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

let posts = [
  {
    title: "Yakuza 6 'After Hours Edition'",
    content: "Vendo edición coleccionista de Yakuza 6, en perfecto estado. No acepto cambios ni bajo el precio, entrega en zona de Arguelles, Madrid",
    price: 50,
    picPath: "/images/subsections/exban2.png",
    creatorId: 1,
    // subsectionId: 4,
    section: "Express"
  },
  {
    title: "Vendo o intercambio New Nintendo 3DS",
    content: "En perfecto estado, cambio por PS Vita o vendo, no acepto ofertas. Zona 'Callao' en Madrid",
    price: 110,
    picPath: "",
    creatorId: 1,
    // subsectionId: 4,
    section: "Express"
  },
];

let comments = [
  {
    content: "eso es una mierda",
    creatorId: 2,
    postId: 0
  },
  {
    content: "eso es mentira",
    creatorId: 1,
    postId: 0
  },
  {
    content: "mi post es mejor",
    creatorId: 0,
    postId: 1
  },
];


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

posts.forEach((e) => {e.creatorId = usersCreated[e.creatorId]._id
});
console.log(`${usersCreated.length} users created with the following id:`);
console.log(usersCreated.map(u => u._id));

return Post.deleteMany()
      .then(() => {
        return Post.create(posts).catch(err => console.log(err))
      })
      .then(postsCreated => {
        console.log(`${postsCreated.length} posts created with the following id:`);
        console.log(postsCreated.map(u => u._id));
        comments.forEach((e) => {
          e.creatorId = usersCreated[e.creatorId]._id;
          e.postId = postsCreated[e.postId]._id
        }
        );
        return Comment.deleteMany()
          .then(() => {
            return Comment.create(comments).catch(err => console.log(err))
          })
          .then(commentsCreated => {
            console.log(`${commentsCreated.length} comments created with the following id:`);
            console.log(commentsCreated.map(u => u._id));
          })        
      })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })
  