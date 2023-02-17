const express = require('express');
const router = express.Router();

const userController = require('../controllers/users_controller');
// router.get('/', userController.userFile);
router.get('/sign-in', userController.signIn);
router.get('/sign-up', userController.signUp);

router.post('/create', userController.create);
router.post('/create-session', userController.createSession);

router.get('/profile', userController.profile);
router.get('/close-session', userController.closeSession);
module.exports = router;