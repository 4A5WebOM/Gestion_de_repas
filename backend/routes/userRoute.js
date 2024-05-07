const express = require('express');
const { signupUser, loginUser, getUserById, updateUserById } = require('../controllers/userController');


const router = express.Router();

router.post('/signup', signupUser);

router.post('/login', loginUser);

router.get('/:id', getUserById);

router.patch('/:id', updateUserById);


module.exports = router;