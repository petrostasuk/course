var express = require('express');
var router = express.Router();

module.exports = function (app) {
    app.use("/stripe", router);
    router.get('/', function(req, res) {
        var config = require(__dirname + "/../config/dev");
        res.render("stripe", {
            publicKey: config.stripe.publicKey
        });
    });

    router.post('/charge', function(req, res) {
        res.send(req.body);
    });
};