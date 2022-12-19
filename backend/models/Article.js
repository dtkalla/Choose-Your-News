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
    publishedDate: {
        type: Date,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    figure: {
        type: Schema.Types.ObjectId,
        ref: 'Figure'
    }
}, {
    // tells mongoose to add and maintain `createdAt` and `updatedAt` fields with
    // datetime timestamps
    timestamps: true
});

module.exports = mongoose.model('Article', articleSchema);