const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Text is required']
    },
    commentedBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
