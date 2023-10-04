var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    res.render('tips', { pagetitle: 'Tips For Living Well' });
});
module.exports = router;