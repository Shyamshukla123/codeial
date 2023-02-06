const express = require('express');
const router = express.Router();

const userFile = require('../controllers/users-controller');
router.get('/', userFile.userFile);


const profileController = require('../controllers/profile');

router.get('/profile', profileController.profile);

const postController = require('../controllers/post');

router.get('/post', postController.post);

module.exports = router;