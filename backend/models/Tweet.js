const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tweetSchema = Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  text: {
    type: String,
    required: true
  }
}, {
  // tells mongoose to add and maintain `createdAt` and `updatedAt` fields with
  // datetime timestamps
  timestamps: true
});

module.exports = mongoose.model('Tweet', tweetSchema);