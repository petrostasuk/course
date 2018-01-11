var mongoose = require("mongoose");
module.exports = function (req, res, next) {
    var User = mongoose.model("User");
    if (req.jwt && req.jwt.valid && req.jwt.payload && req.jwt.payload.id) {
        User.findOne({_id: req.jwt.payload.id}).populate('role').exec(function (err, user) {
            if (err) {
                return res.status(500).send(err);
            }
            if (user) {
                req.user = user.toObject();
            }
            next();
        });
    } else {
        next();
    }
};