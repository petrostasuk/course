module.exports = function (req, res, next) {
    if (req.jwt && req.jwt.valid && req.jwt.payload && req.jwt.payload.id) {
        next();
    } else {
        res.status(403).send("Forbiden");
    }
};