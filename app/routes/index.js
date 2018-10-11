var router = require('express').Router();

router.get('/', function(req, res) {
    res.send("Hello");
});

module.exports = router;