var express = require('express');
var morgan = require('morgan');
var logger = require('./logger');
var bodyParser = require('body-parser');
var cors = require('cors');

var mongoose = require('mongoose');
var bluebird = require('bluebird');

var glob = require('glob');

module.exports = function (app, config) {
   
    logger.log('info', "Loading Mongoose functionality");
    mongoose.Promise = bluebird;
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', function () {
        throw new Error('unable to connect to database at ' + config.db);
    });
    app.use(cors({origin: 'http://localhost:9000'}));
    
  if (process.env.NODE_ENV !== 'test') {
        app.use(morgan('dev'));
        mongoose.set('debug', true);
        mongoose.connection.once('open', function callback() {
            logger.log('info', 'Mongoose connected to the database');
        });

        app.use(function (req, res, next) {
            logger.log('Request from ' + req.connection.remoteAddress, 'info');
            next();
        });
    }



    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));


    app.use(express.static(config.root + '/public'));
    
    var models = glob.sync(config.root + '/app/models/*.js');
      models.forEach(function (model) {
        require(model);
      });
    
    var controllers = glob.sync(config.root + '/app/controllers/*.js');
    controllers.forEach(function (controller) {
        require(controller)(app, config);
    });

    var users = [{
            name: 'A',
            email: 'woo@hoo.com'
        },
        {
            name: 'B',
            email: 'loo@woo.com'
        },
        {
            name: 'C',
            email: 'boo@woo.com'
        }
    ];

    app.get('/api/users', function (req, res) {
        res.status(200).json(users);
    });


    app.use(function (req, res) {
        logger.log('error', 'File not found');
        res.type('text/plan');
        res.status(404);
        res.send('404 Not Found');
    });

    app.use(function (err, req, res, next) {
        console.error(err.stack);
        res.type('text/plan');
        res.status(500);
        res.send('500 Server Error');
    });

    app.use(function (err, req, res, next) {
        console.log(err);
        if (process.env.NODE_ENV !== 'test') logger.log(err.stack,'error');
        res.type('text/plan');
        if(err.status){
          res.status(err.status).send(err.message);
        } else {
          res.status(500).send('500 Sever Error');
        }
      });
    

    logger.log('info', "Starting application");

};