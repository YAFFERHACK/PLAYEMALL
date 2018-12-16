const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const singleGameSchema = new Schema({
  collections: [{ type: Schema.Types.ObjectId, ref: "Collection" }],
  idIgdb: { type: Number, unique: true} ,//diccionario id
  name: String,
  url: String,
  summary: String,
  // franchise: Number, //diccionario id
  rating: Number,
  publishers: Number, //diccionario id
  first_release_date: Number, // timestamp
  genres: Number, //diccionario id
  platforms: Number, //diccionario id
  screenshots: [
    {
      url: String,
      cloudinary_id: String
    }
  ],
  videos: [
    {
      name: String,
      video_id: String
    }
  ],
  cover: {
    url: String,
    cloudinary_id: String
  }
},
{
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const SingleGame = mongoose.model("SingleGame", singleGameSchema);
module.exports = SingleGame;
