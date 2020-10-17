const Comment = require('../models/Comment');
const CommentReply = require('../models/CommentReply');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAll = catchAsync(async (req, res, next) => {
  const comments = await Comment.find({ isRoot: true })
    .populate({
      path: 'commentedBy',
      select: ['name']
    })
    .sort({ createdAt: -1 });
  res.json(comments);
});

exports.save = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  req.body.commentedBy = userId;
  req.body.isRoot = true;
  let comment = await Comment.create(req.body);

  comment = await Comment.populate(comment, {
    path: 'commentedBy',
    select: ['name']
  });
  res.status(201).json(comment);
});

exports.updateComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.commentId);
  if (comment.commentedBy.toString() !== req.user.id) {
    return next(
      new AppError(
        'Comment can only be updated by the user who created it',
        400
      )
    );
  }
  let updatedComment = await Comment.findByIdAndUpdate(
    { _id: req.params.commentId },
    { text: req.body.text },
    { new: true }
  );

  updatedComment = await Comment.populate(updatedComment, {
    path: 'commentedBy',
    select: ['name']
  });
  res.json(updatedComment);
});

exports.reply = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  req.body.commentedBy = userId;

  const comment = await Comment.create(req.body);
  const commentReplyBody = {
    comment: req.params.commentId,
    replyComment: comment._id
  };
  let commentReply = await CommentReply.create(commentReplyBody);
  commentReply = await CommentReply.populate(commentReply, {
    path: 'replyComment',
    populate: {
      path: 'commentedBy',
      select: ['name']
    }
  });
  res.status(201).json(commentReply);
});

exports.getAllReply = catchAsync(async (req, res, next) => {
  const commentId = req.params.commentId;
  const replies = await CommentReply.find({ comment: commentId }).populate({
    path: 'replyComment',
    populate: {
      path: 'commentedBy',
      select: ['name']
    }
  });
  res.json(replies);
});
