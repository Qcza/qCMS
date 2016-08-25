"use strict";
var mongodb = require('mongodb');
var assert = require('assert');
var MongoClient = mongodb.MongoClient;
var ObjectId = mongodb.ObjectID;
var dbUrl = 'mongodb://localhost:27017/qcms';
var collections = {
    name: 'collections',
    collections: [
        'articles'
    ]
};
MongoClient.connect(dbUrl, function (err, db) {
    assert.equal(null, err);
    db.collection('helpers').insertOne(collections);
});
console.log('All seeds applied');
//# sourceMappingURL=seed.js.map