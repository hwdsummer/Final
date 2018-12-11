var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    asyncHandler = require('express-async-handler'),
    passportService = require('../../config/passport'),
    passport = require('passport');


var requireLogin = passport.authenticate('local', {
    session: false
});
var requireAuth = passport.authenticate('jwt', {
    session: false
});

module.exports = function (app, config) {
    app.use('/api', router);

    router.route('/users').post(asyncHandler(async (req, res) => {

        logger.log('info', 'Creating user');
        var user = new User(req.body);
        await user.save()
            .then(result => {
                res.status(201).json(result);
            })
            .catch(error => {
                return next(error);
            })
    }));

    router.get('/users', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'Get all users');
        let query = User.find();
        query.sort(req.query.order)
        await query.exec().then(result => {
            res.status(200).json(result);
        })
    }));
    router.get('/users/:id', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'Get user %s', req.params.id);
        await User.findById(req.params.id).then(result => {
            res.status(200).json(result);
        })
    }));
    router.put('/users/password/:userId', requireAuth, function (req, res, next) {
        logger.log('Update user ' + req.params.userId, 'verbose');
        User.findById(req.params.userId)
            .exec()
            .then(function (user) {
                if (req.body.password !== undefined) {
                    user.password = req.body.password;
                }
                user.save()
                    .then(function (user) {
                        res.status(200).json(user);
                    })
                    .catch(function (err) {
                        return next(err);
                    });
            })
            .catch(function (err) {
                return next(err);
            });
    });


    router.delete('/users/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Deleting user %s', req.params.id);
        await User.remove({
            _id: req.params.id
        })
            .then(result => {
                res.status(200).json(result);
            })
    }));

    router.route('/users/login').post(requireLogin, login);

};