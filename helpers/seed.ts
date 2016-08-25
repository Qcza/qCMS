import * as mongodb from 'mongodb';
import * as assert from 'assert';

const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectID;
const dbUrl = 'mongodb://localhost:27017/qcms' 

//SEEDS
interface Collections {
  name:string;
  collections:Array<string>
}

const collections:Collections = {
  name: 'collections',
  collections: [
    'articles'
  ]
}

interface ElementsTypes {
  name:string;
  types:Array<string>;
}

const elements:ElementsTypes = {
  name: 'elements',
  types: [
    'header',
    'text'
  ]
}

// SEED COLLECTIONS
MongoClient.connect(dbUrl, function(err, db) {
    assert.equal(null, err);
    db.collection('helpers').findOne({'name': 'collections'}).then(function(document) {
      if (!document) {
        db.collection('helpers').insertOne(collections).then(function() {
          console.log('added collections');
          db.close();
        });
      } else {
        console.log('skipped collections');
        db.close()
      }
    })
});

// SEED ELEMENTS
MongoClient.connect(dbUrl, function(err, db) {
    assert.equal(null, err);
    db.collection('helpers').findOne({'name': 'elements'}).then(function(document) {
      if (!document) {
        db.collection('helpers').insertOne(elements).then(function() {
          console.log('added elements');
          db.close();
        });
      } else {
        console.log('skipped elements');
        db.close()
      }
    })
});