const express = require('express');
const router = express.Router();

const userController = require('../controllers/users_controller');
// router.get('/', userController.userFile);
router.get('/sign-in', userController.signIn);
router.get('/sign-up', userController.signUp);

router.post('/create', userController.create);


// const profileController = require('../controllers/profile');

// router.get('/profile', profileController.profile);

// const postController = require('../controllers/post');

// router.get('/post', postController.post);

module.exports = router;