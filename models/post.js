const mongoose = require("mongoose")

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BlogPost = new Schema({
    name: { type: String, require: true },
    location: { type: String, require: true },
    likes: { type: Number, require: true },
    description: { type: String, require: true },
    postimage: { type: String, require: true },
    date:{ type: String, require: true }
},{timestamps:true});

const MyModel = mongoose.model('post', BlogPost)

module.exports = MyModel