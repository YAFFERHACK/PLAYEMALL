const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = Schema({
  content: String,
  creatorId: { type: Schema.Types.ObjectId, ref: "User" },
  postId: { type: Schema.Types.ObjectId, ref: "Post" }
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
