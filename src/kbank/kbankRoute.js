const express = require("express");
const router = express.Router();
const kbankController = require('./kbankController');

router.get('/', kbankController.getRates);
module.exports = router;