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
function addTemplate(db, req) {
    db.collection('templates').insertOne(req.body).then(function () {
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
    });
}
app.post('/templates', function (req, res) {
    MongoClient.connect(dbUrl, function (err, db) {
        assert.equal(null, err);
        if (req.body.is_default === true) {
            db.collection('templates').updateMany({}, { $set: { 'is_default': false } }).then(function () {
                addTemplate(db, req);
            });
        }
        else {
            addTemplate(db, req);
        }
        var response = JSON.stringify('success');
        res.send(response);
    });
});
// GET TEMPLATES
app.get('/templates', function (req, res) {
    MongoClient.connect(dbUrl, function (err, db) {
        assert.equal(null, err);
        db.collection('templates').find().sort({ 'name': 1 }).toArray().then(function (documents) {
            var response = JSON.stringify(documents);
            res.send(response);
            db.close();
        });
    });
});
// GET TEMPLATE
app.get('/templates/:id', function (req, res) {
    MongoClient.connect(dbUrl, function (err, db) {
        assert.equal(null, err);
        var id = req.params.id;
        db.collection('templates').findOne({ '_id': new ObjectId(id) }).then(function (document) {
            var response = JSON.stringify(document);
            res.send(response);
            db.close();
        });
    });
});
// DELETE TEMPLATE
app.delete('/templates/:id', function (req, res) {
    var id = req.params.id;
    MongoClient.connect(dbUrl, function (err, db) {
        assert.equal(null, err);
        db.collection('templates').deleteOne({ '_id': new ObjectId(id) }).then(function () {
            var response = JSON.stringify('success');
            res.send(response);
            db.close();
        });
    });
});
// EDIT TEMPLATE
function updateTemplate(db, req) {
    var id = req.params.id;
    db.collection('templates').updateOne({ '_id': new ObjectId(id) }, {
        'name': req.body.name,
        'collection': req.body.collection,
        'is_default': req.body.is_default,
        'elements': req.body.elements
    }).then(function () {
        db.close();
    });
}
app.put('/templates/:id', function (req, res) {
    MongoClient.connect(dbUrl, function (err, db) {
        assert.equal(null, err);
        if (req.body.is_default === true) {
            db.collection('templates').updateMany({}, { $set: { 'is_default': false } }).then(function () {
                updateTemplate(db, req);
            });
        }
        else {
            updateTemplate(db, req);
        }
        var response = JSON.stringify('success');
        res.send(response);
    });
});
//DOCUMENTS
// POST DOCUMENT
app.post('/documents', function (req, res) {
    MongoClient.connect(dbUrl, function (err, db) {
        assert.equal(null, err);
        db.collection('documents').insertOne(req.body).then(function () {
            var response = JSON.stringify('success');
            res.send(response);
            db.close();
        });
    });
});
// GET DOCUMENTS
app.get('/documents', function (req, res) {
    MongoClient.connect(dbUrl, function (err, db) {
        assert.equal(null, err);
        db.collection('documents').find().sort({ 'date': -1 }).toArray().then(function (documents) {
            var response = JSON.stringify(documents);
            res.send(response);
            db.close();
        });
    });
});
// EDIT DOCUMENT
app.put('/documents/:id', function (req, res) {
    var id = req.params.id;
    MongoClient.connect(dbUrl, function (err, db) {
        assert.equal(null, err);
        db.collection('documents').updateOne({ '_id': new ObjectId(id) }, { $set: {
                'title': req.body.title,
                'template': req.body.template
            } }).then(function () {
            var response = JSON.stringify('success');
            res.send(response);
            db.close();
        });
    });
});
// DELETE DOCUMENT
app.delete('/documents/:id', function (req, res) {
    var id = new ObjectId(req.params.id);
    MongoClient.connect(dbUrl, function (err, db) {
        assert.equal(null, err);
        db.collection('documents').deleteOne({ '_id': id }).then(function () {
            var response = JSON.stringify('success');
            res.send(response);
            db.close();
        });
    });
});
// USERS
// POST USERS
app.post('/users', function (req, res) {
    MongoClient.connect(dbUrl, function (err, db) {
        assert.equal(null, err);
        db.collection('users').insertOne(req.body).then(function () {
            var response = JSON.stringify('success');
            res.send(response);
            db.close();
        });
    });
});
// GET USERS
app.get('/users', function (req, res) {
    MongoClient.connect(dbUrl, function (err, db) {
        assert.equal(null, err);
        db.collection('users').find().sort({ 'login': 1 }).toArray().then(function (documents) {
            var response = JSON.stringify(documents);
            res.send(response);
            db.close();
        });
    });
});
// EDIT USER
app.put('/users:id', function (req, res) {
    var id = req.params.id;
    MongoClient.connect(dbUrl, function (err, db) {
        assert.equal(null, err);
        db.collection('users').updateOne({ '_id': new ObjectId(req.body._id) }, {
            'fname': req.body.fname,
            'lname': req.body.lname,
            'imgurl': req.body.imgurl,
            'role': req.body.role,
            'pw': req.body.pw
        }).then(function () {
            var response = JSON.stringify('success');
            res.send(response);
            db.close();
        });
    });
});
// DELETE USER
app.delete('/users/:id', function (req, res) {
    var id = new ObjectId(req.params._id);
    MongoClient.connect(dbUrl, function (err, db) {
        assert.equal(null, err);
        db.collection('users').deleteOne({ '_id': id }).then(function () {
            var response = JSON.stringify('success');
            res.send(response);
            db.close();
        });
    });
});
//HELPERS
// GET COLLECTIONS
app.get('/helpers/collections', function (req, res) {
    MongoClient.connect(dbUrl, function (err, db) {
        assert.equal(null, err);
        db.collection('helpers').findOne({ 'name': 'collections' }).then(function (document) {
            var response = JSON.stringify(document.collections);
            res.send(response);
            db.close();
        });
    });
});
// GET ELEMENTS
app.get('/helpers/elements', function (req, res) {
    MongoClient.connect(dbUrl, function (err, db) {
        assert.equal(null, err);
        db.collection('helpers').findOne({ 'name': 'elements' }).then(function (document) {
            var response = JSON.stringify(document.types);
            res.send(response);
            db.close();
        });
    });
});
// GET ROLES
app.get('/helpers/roles', function (req, res) {
    MongoClient.connect(dbUrl, function (err, db) {
        assert.equal(null, err);
        db.collection('helpers').findOne({ 'name': 'roles' }).then(function (document) {
            var response = JSON.stringify(document.roles);
            res.send(response);
            db.close();
        });
    });
});
app.listen(3000);
//# sourceMappingURL=server.js.map