var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

module.exports = function (app) {

    app.use("/user", router);

    router.get('/', function(req, res, next) {
        var User = mongoose.model("User");
        User.find({}).exec(function (err, users) {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(200).send(users);
        })
    });

    router.get('/:id', function(req, res, next) {
        var User = mongoose.model("User");
        User.findOne({_id: req.params.id}).exec(function (err, user) {
            if (err) {
                return res.status(500).send(err);
            }
            if (!user) {
                return res.status(404).send("Not found");
            }
            res.status(200).send(user);
        })
    });

    router.post('/', [function (req, res, next) {}], function(req, res, next) {
        var User = mongoose.model("User");
        User.create(req.body, function (err, createdUser) {
            if (err) {
                var code = err.name === "ValidationError" ? 400 : 500;
                return res.status(code).send(err);
            }
            res.status(200).send(createdUser);
        });
    });
    router.post('/:id', function(req, res, next) {
        var User = mongoose.model("User");
        User.findOne({_id: req.params.id}).exec(function (err, user) {
            if (err) {
                return res.status(500).send(err);
            }
            if (!user) {
                return res.status(404).send("Not found");
            }
            User.update({_id: req.params.id}, {$set: req.body}, function (err, updatedResult) {
                if (err) {
                    return res.status(500).send("")
                }
                res.status(200).send(updatedResult);
            })
        })
    });

    router.delete('/:id', function(req, res, next) {
        var User = mongoose.model("User");
        User.remove({_id: req.params.id}, function (err) {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(200).send("DELETED");
        })
    });
};



