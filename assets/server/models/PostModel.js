const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = Schema(
  {
    title: String,
    creatorId: { type: Schema.Types.ObjectId, ref: "User" },
    content: String,
    price: Number,
    picPath: { type: String, default: "" },
    igdbId: Number,
    // picsPath: {type: String, default:""},
    section: { type: String, enum: [""] } // !!!!
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
