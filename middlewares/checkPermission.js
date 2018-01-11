module.exports = function (permission) {
    var permissionItems = permission.split(".");
    if (permissionItems.length !== 2) {
        throw new Error("Wrong permission format");
    }
    return function (req, res, next) {

        var forbiddenCallback = function () {
            res.status(403).send("Action is not allowed");
        };

        if (req.user && req.user.role && req.user.role.specs) {
            if (req.user.role.specs[permissionItems[0]] &&
                req.user.role.specs[permissionItems[0]][permissionItems[1]]) {
                next();
            } else {
                return forbiddenCallback()
            }
        } else {
            return forbiddenCallback();
        }
    };
};