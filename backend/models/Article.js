const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = Schema({
    headline: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    publishedDate: {
        type: Date,
        required: true
    },
    url: {
        type: String,
        required: true
    },
}, {
    // tells mongoose to add and maintain `createdAt` and `updatedAt` fields with
    // datetime timestamps
    timestamps: true
});

module.exports = mongoose.model('Article', articleSchema);