const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const collectionSchema = new Schema({
  games: [{ type: Schema.Types.ObjectId, ref: SingleGame }]
});

const Collection = mongoose.model("Collection", collectionSchema);
module.exports = Collection;
