var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var Bcrypt = require('bcryptjs');

var userSchema = new Schema({
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    active: { type: Boolean, default: true },
    role: { type: String, enum: ['admin', 'user', 'staff'] },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    dateRegistered: { type: Date, default: Date.now }
});
userSchema.pre('save', function (next) {
    var person = this;
    if (this.isModified('password') || this.isNew) {
        Bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            Bcrypt.hash(person.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                person.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

userSchema.methods.comparePassword = function (passw, cb) {
    Bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = Mongoose.model('User', userSchema);
