const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const figureSchema = Schema({
    name: {
        type: String,
        required: true
    }
}, {
    // tells mongoose to add and maintain `createdAt` and `updatedAt` fields with
    // datetime timestamps
    timestamps: true
});

module.exports = mongoose.model('Figure', figureSchema);