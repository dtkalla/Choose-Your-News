const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    figures: [{
        type: Schema.Types.ObjectId,
        ref: "Figure"
    }],
    shared: {
        type: Boolean,
        default: true,
        required: true
    }
}, {
    // tells mongoose to add and maintain `createdAt` and `updatedAt` fields with
    // datetime timestamps
    timestamps: true
});

module.exports = mongoose.model('Group', groupSchema);