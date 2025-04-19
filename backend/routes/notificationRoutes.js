const express = require('express');
const { getNotifications, markAsRead, sendMessage } = require('../controllers/notificationController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.route("/").get(authMiddleware,getNotifications);
router.route("/:id").patch(authMiddleware,markAsRead);

module.exports = router;