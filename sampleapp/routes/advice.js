var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    res.render('advice', { pagetitle: 'Homesteading Advice' });
});
module.exports = router;