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

MongoClient.connect(dbUrl, function(err, db) {
    assert.equal(null, err);
    db.collection('helpers').insertOne(collections);
});

console.log('All seeds applied');