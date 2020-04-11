const express = require('express');
const router = express.Router();
const moment = require('moment');

router.get('', function(req, res) {
    res.send(`Bienvenido Api TempoAppHN ${moment().format()}`);
});

module.exports = router;