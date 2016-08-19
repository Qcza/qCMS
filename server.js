"use strict";
var express = require('express');
var mongodb = require('mongodb');
var assert = require('assert');
var bodyParser = require('body-parser');
var MongoClient = mongodb.MongoClient;
var dbUrl = 'mongodb://localhost:27017/qcms';
var app = express();
app.use(bodyParser.json());
app.use('/', express.static(__dirname));
app.use('/css', express.static(__dirname + '/app/styles/'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css/'));
app.use('/css', express.static(__dirname + '/static/font-awesome/css/'));
app.use('/fonts', express.static(__dirname + '/static/font-awesome/fonts/'));
// app.get('/', function (req: express.Request, res: express.Response) {
//     res.sendFile(path.resolve(__dirname, 'index.html'));
// });
//ADMIN >> NEW TEMPLATE
app.post('/templates', function (req, res) {
    MongoClient.connect(dbUrl, function (err, db) {
        assert.equal(null, err);
        db.collection('templates').insertOne(req.body);
        db.close();
        var response = JSON.stringify('success');
        res.status(200);
        res.send(response);
    });
});
app.get('/templates', function (req, res) {
    MongoClient.connect(dbUrl, function (err, db) {
        assert.equal(null, err);
        var cursor = db.collection('templates').find().toArray(function (err, documents) {
            assert.equal(null, err);
            var response = JSON.stringify(documents);
            res.send(response);
        });
        db.close();
    });
});
app.listen(3000);
//helpers
function getAllDocuments(db, collection, callback) {
    var cursor = db.collection(collection).find().toArray(callback);
}
//# sourceMappingURL=server.js.map