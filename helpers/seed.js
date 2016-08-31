"use strict";
var user_1 = require('../app/models/user');
var mongodb = require('mongodb');
var assert = require('assert');
var bcrypt = require('bcrypt');
var MongoClient = mongodb.MongoClient;
var ObjectId = mongodb.ObjectID;
var dbUrl = 'mongodb://localhost:27017/qcms';
var collections = {
    name: 'collections',
    collections: [
        'articles'
    ]
};
var elements = {
    name: 'elements',
    types: [
        'header',
        'text'
    ]
};
var roles = {
    name: 'roles',
    roles: [
        'user',
        'admin'
    ]
};
// SEED COLLECTIONS
MongoClient.connect(dbUrl, function (err, db) {
    assert.equal(null, err);
    db.collection('helpers').findOne({ 'name': 'collections' }).then(function (document) {
        if (!document) {
            db.collection('helpers').insertOne(collections).then(function () {
                console.log('added collections');
                db.close();
            });
        }
        else {
            db.collection('helpers').updateOne({ 'name': 'collections' }, { $set: { 'collections': collections.collections } }).then(function () {
                console.log('updated collections');
                db.close();
            });
        }
    });
});
// SEED ELEMENTS
MongoClient.connect(dbUrl, function (err, db) {
    assert.equal(null, err);
    db.collection('helpers').findOne({ 'name': 'elements' }).then(function (document) {
        if (!document) {
            db.collection('helpers').insertOne(elements).then(function () {
                console.log('added elements');
                db.close();
            });
        }
        else {
            db.collection('helpers').updateOne({ 'name': 'elements' }, { $set: { 'types': elements.types } }).then(function () {
                console.log('updated elements types');
                db.close();
            });
        }
    });
});
// SEED ROLES
MongoClient.connect(dbUrl, function (err, db) {
    assert.equal(null, err);
    db.collection('helpers').findOne({ 'name': 'roles' }).then(function (document) {
        if (!document) {
            db.collection('helpers').insertOne(roles).then(function () {
                console.log('added roles');
                db.close();
            });
        }
        else {
            db.collection('helpers').updateOne({ 'name': 'roles' }, { $set: { 'roles': roles.roles } }).then(function () {
                console.log('updated roles');
                db.close();
            });
        }
    });
});
// SEED USER
bcrypt.hash('ch@ngeIt', 8, function (bcerr, result) {
    MongoClient.connect(dbUrl, function (err, db) {
        assert.equal(null, err);
        db.collection('users').findOne({ 'login': 'admin' }).then(function (document) {
            if (!document) {
                var admin = new user_1.User('admin', 'admin', 'admin', 'admin', result);
                db.collection('users').insertOne(admin).then(function () {
                    console.log('added admin');
                    db.close();
                });
            }
            else {
                console.log('skipped admin added');
                db.close();
            }
        });
    });
});
//# sourceMappingURL=seed.js.map