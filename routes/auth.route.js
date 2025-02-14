const express = require('express');
const { register, login, profile, isAuth } = require('../controllers/auth.controller');

const router = express.Router();


router.post('/register',register)
router.post('/login', login)
router.get('/profile', isAuth, profile)


module.exports = router;