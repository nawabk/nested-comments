const express = require('express');
const authController = require('../controllers/authController');
const commentController = require('../controllers/commentController');

const router = express.Router();
router.use(authController.protect);

router
  .route('/')
  .get(commentController.getAll)
  .post(commentController.save);

router.route('/:commentId').put(commentController.updateComment);
router
  .route('/:commentId/reply')
  .get(commentController.getAllReply)
  .post(commentController.reply);

module.exports = router;
