const mongoose = require("mongoose")

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BlogPost = new Schema({
    email: { type: String, require: true },
    password: { type: String, require: true },
});

const MyModel = mongoose.model('login', BlogPost)

module.exports = MyModel