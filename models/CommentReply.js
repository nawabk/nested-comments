const mongoose = require('mongoose');

const commentReplyScehma = new mongoose.Schema({
  comment: {
    type: mongoose.Schema.ObjectId,
    ref: 'Comment'
  },
  replyComment: {
    type: mongoose.Schema.ObjectId,
    ref: 'Comment'
  }
});

const CommentReply = mongoose.model('CommentReplies', commentReplyScehma);

module.exports = CommentReply;
