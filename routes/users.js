const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users')

router.get('/new', usersCtrl.new);

module.exports = router;