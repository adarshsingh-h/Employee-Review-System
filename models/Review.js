const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    doneBy: { type: String, required: true},
    doneFor: { type: String, required: true},
    review: { type: String },
});

module.exports = mongoose.model("Review", ReviewSchema);