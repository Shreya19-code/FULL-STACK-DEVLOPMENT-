const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const auth = require('../controllers/auth');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/me', auth, UserController.getMe);
router.post('/me/favorites/:id', auth, UserController.addFavorite);
router.delete('/me/favorites/:id', auth, UserController.removeFavorite);

module.exports = router;
