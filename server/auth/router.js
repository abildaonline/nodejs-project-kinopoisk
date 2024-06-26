const express = require('express')
const passport = require('passport')
const router = express.Router();
const {signup, signIn, signOut} = require('./controller')
const createAdmin = require('../Admin/seed')

router.post('/api/signup', signup)
router.post('/api/signin', passport.authenticate('local', {failureRedirect: '/login?error=1',}), signIn)
router.get('/api/signout', signOut)
router.post('/api/auth/google', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile/' + req.user._id)
})
createAdmin()
module.exports = router