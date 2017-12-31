module.exports = function (app) {
    var glob = require("glob");

    var models = glob.sync(__dirname + "/*.js");
    models.forEach(function (file) {
        if (file.indexOf("index.js") === -1) {
            require(file)(app);
        }
    });
};