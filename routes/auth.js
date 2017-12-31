var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");

module.exports = function (app) {
    app.use("/auth", router);
    router.post('/login', function(req, res) {
        var User = mongoose.model("User");
        User.findOne({login: req.body.login}).exec(function (err, user) {
            if (err) {
                return res.status(500).send(err);
            }
            if (!user) {
                return res.status(403).send("Login isnt valid");
            }
            user.comparePassword(req.body.password || "", function (err, isMatch) {
                if (err) {
                    return res.status(500).send(err);
                }
                if (!isMatch) {
                    return res.status(403).send("Password is not correct");
                }
                res.status(200).send({
                    token: res.jwt({
                    id: user.id
                }).token
                });
            });
        })
    });
}