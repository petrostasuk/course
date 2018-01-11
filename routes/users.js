var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var isLoggined = require(__dirname + "/../middlewares/isLoggined");
var currentUser = require(__dirname + "/../middlewares/currentUser");
var checkPermission = require(__dirname + "/../middlewares/checkPermission");

module.exports = function (app) {

    app.use("/user", router);

    router.get('/', [isLoggined, currentUser, checkPermission("User.read")], function(req, res, next) {
        var User = mongoose.model("User");
        var query = User.find({});
        if (req.query.limit) {
            query.limit(+req.query.limit);
        }
        if (req.query.skip) {
            query.skip(+req.query.skip);
        }
        query.exec(function (err, users) {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(200).send(users);
        });
    });

    router.get('/count', [isLoggined, currentUser, checkPermission("User.read")], function(req, res, next) {
        var User = mongoose.model("User");
        User.count({}, function (err, count) {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(200).send({
                count: count
            });
        });
    });

    router.get('/:id', [isLoggined, currentUser, checkPermission("User.read")], function(req, res, next) {
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

    // User.create
    router.post('/', [isLoggined, currentUser, checkPermission("User.create")], function(req, res, next) {

        var User = mongoose.model("User");
        User.create(req.body, function (err, createdUser) {
            if (err) {
                var code = err.name === "ValidationError" ? 400 : 500;
                return res.status(code).send(err);
            }
            res.status(200).send(createdUser);
        });
    });
    router.post('/:id', [isLoggined, currentUser, checkPermission("User.update")], function(req, res, next) {
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

    router.delete('/:id', [isLoggined, currentUser, checkPermission("User.delete")], function(req, res, next) {
        var User = mongoose.model("User");
        User.remove({_id: req.params.id}, function (err) {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(200).send("DELETED");
        })
    });
};



