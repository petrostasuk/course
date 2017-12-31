var mongoose = require("mongoose");
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    login: {
        type: String,
        required: [true, "This field is required"],
    },
    name: String,
    age: {
        type: Number,
        min: 0
    },
    password: {
        type: String,
        required: [true, "This field is required"],
        minlength: [6, "Min length is 6 symbols"],
    },
}, {
    toJSON: {
        transform: function (doc, ret) {
            delete ret.__v;
            delete ret.password;
        }
    },
    toObject: {
        transform: function (doc, ret) {
            delete ret.__v;
            delete ret.password;
        },
        virtuals: true,
    },
});

UserSchema.pre("save", function (next) {
    var user = this;
    if (user.isModified('password') || user.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });
    } else
        next();
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);

