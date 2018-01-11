var mongoose = require("mongoose");
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var RoleSchema = new Schema({
    name: {
        type: String,
        required: [true, "This field is required"],
    },
    specs: {
        type: Schema.Types.Mixed
    }
}, {

});

mongoose.model("Role", RoleSchema);
mongoose.model("Role").create({
    name: "User reader",
    specs: {
        User: {
            read: true,
            create: false,
            update: false,
            delete: false
        }
    }
}, function (err, created) {
    console.log(created);
});
