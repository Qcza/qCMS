"use strict";
var express = require('express');
var path = require('path');
var mongodb = require('mongodb');
var assert = require('assert');
var MongoClient = mongodb.MongoClient;
var dbUrl = 'mongodb://localhost:27017/qcms';
var app = express();
app.listen(3000);
app.use(express.static(path.resolve(__dirname)));
app.use('/css', express.static(__dirname + '/app/styles/'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css/'));
app.use('/fonts', express.static(__dirname + '/node_modules/bootstrap/fonts/'));
app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});
//ADMIN >> NEW TEMPLATE
app.post('/templates', function (req, res) {
    MongoClient.connect(dbUrl, function (err, db) {
        assert.equal(null, err);
        console.log('Connected to mongodb');
        console.log(req);
        db.close();
    });
});
//# sourceMappingURL=server.js.map