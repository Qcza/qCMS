"use strict";
var express = require('express');
var mongodb = require('mongodb');
var assert = require('assert');
var bodyParser = require('body-parser');
var MongoClient = mongodb.MongoClient;
var ObjectId = mongodb.ObjectID;
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
//TEMPLATES
// POST TEMPLATE
app.post('/templates', function (req, res) {
    MongoClient.connect(dbUrl, function (err, db) {
        assert.equal(null, err);
        if (req.body.is_default === true) {
            db.collection('templates').updateMany({}, { $set: { 'is_default': false } });
        }
        db.collection('templates').insertOne(req.body);
        db.collection('helpers').findOne({ 'name': 'collections' }).then(function (document) {
            var new_collections = document.collections;
            if (new_collections.indexOf(req.body.collection) === -1) {
                new_collections.push(req.body.collection);
                return new_collections;
            }
            else {
                return [];
            }
        }).then(function (collections) {
            if (collections.length > 0) {
                db.collection('helpers').updateOne({ 'name': 'collections' }, { $set: { 'collections': collections } }).then(function () {
                    db.close();
                });
            }
            else {
                db.close();
            }
        });
        var response = JSON.stringify('success');
        res.send(response);
    });
});
// GET TEMPLATES
app.get('/templates', function (req, res) {
    MongoClient.connect(dbUrl, function (err, db) {
        assert.equal(null, err);
        db.collection('templates').find().sort({ 'name': 1 }).toArray(function (err, documents) {
            assert.equal(null, err);
            var response = JSON.stringify(documents);
            res.send(response);
        });
        db.close();
    });
});
// DELETE TEMPLATE
app.delete('/templates/:id', function (req, res) {
    var id = req.params.id;
    MongoClient.connect(dbUrl, function (err, db) {
        assert.equal(null, err);
        db.collection('templates').deleteOne({ 'id': id });
        db.close();
        var response = JSON.stringify('success');
        res.send(response);
    });
});
//DOCUMENTS
// POST DOCUMENT
app.post('/documents', function (req, res) {
    MongoClient.connect(dbUrl, function (err, db) {
        assert.equal(null, err);
        db.collection('documents').insertOne(req.body);
        db.close();
        var response = JSON.stringify('success');
        res.send(response);
    });
});
// GET DOCUMENTS
app.get('/documents', function (req, res) {
    MongoClient.connect(dbUrl, function (err, db) {
        assert.equal(null, err);
        db.collection('documents').find().sort({ 'date': -1 }).toArray(function (err, documents) {
            assert.equal(null, err);
            var response = JSON.stringify(documents);
            res.send(response);
        });
        db.close();
    });
});
// EDIT DOCUMENT
app.put('/documents', function (req, res) {
    MongoClient.connect(dbUrl, function (err, db) {
        assert.equal(null, err);
        db.collection('documents').updateOne({ '_id': new ObjectId(req.body._id) }, { $set: {
                'title': req.body.title,
                'template': req.body.template
            } });
        db.close();
        var response = JSON.stringify('success');
        res.send(response);
    });
});
// DELETE DOCUMENT
app.delete('/documents/:id', function (req, res) {
    var id = new ObjectId(req.params.id);
    MongoClient.connect(dbUrl, function (err, db) {
        assert.equal(null, err);
        db.collection('documents').deleteOne({ '_id': id });
        db.close();
        var response = JSON.stringify('success');
        res.send(response);
    });
});
//COLLECTIONS
// GET COLLECTIONS
app.get('/collections', function (req, res) {
    MongoClient.connect(dbUrl, function (err, db) {
        assert.equal(null, err);
        db.collection('helpers').findOne({ 'name': 'collections' }, function (err, document) {
            var response = JSON.stringify(document.collections);
            res.send(response);
        });
        db.close();
    });
});
app.listen(3000);
//helpers
// function getAllDocuments (db, collection:string, callback) {
//   let cursor:Promise<any> = db.collection(collection).find().toArray(callback);
// } 
//# sourceMappingURL=server.js.map