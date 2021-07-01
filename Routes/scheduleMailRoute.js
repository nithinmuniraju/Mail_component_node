const express = require('express');
const router = express.Router();

const mailController = require('../Controller/mailController');

router.post('/send', mailController.sendMail)

module.exports = router;