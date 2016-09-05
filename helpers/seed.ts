import { User } from '../app/models/user'

import * as mongodb from 'mongodb';
import * as assert from 'assert';
import * as bcrypt from 'bcrypt';

import * as config from '../config';

const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectID;
const dbUrl = (config.dbUser && config.dbPwd) ? ('mongodb://' + config.dbUser + ':' + config.dbPwd + '@' + config.dbUrl) : ('mongodb://' + config.dbUrl);

const cookieExp:number = 3600 * 24 * 99;

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

interface Roles {
  name:string;
  roles:Array<string>;
}

const roles:Roles = {
  name: 'roles',
  roles: [
    'user',
    'admin'
  ]
}

// SEED COLLECTIONS
MongoClient.connect(dbUrl, function(err, db) {
    assert.equal(null, err);
    db.collection('qcms_helpers').findOne({'name': 'collections'}).then(function(document) {
      if (!document) {
        db.collection('qcms_helpers').insertOne(collections).then(function() {
          console.log('added collections');
          db.close();
        });
      } else {
        db.collection('qcms_helpers').updateOne({'name': 'collections'}, {$set: {'collections': collections.collections}}).then(function () {
          console.log('updated collections');
          db.close();
        })
      }
    })
});

// SEED ELEMENTS
MongoClient.connect(dbUrl, function(err, db) {
    assert.equal(null, err);
    db.collection('qcms_helpers').findOne({'name': 'elements'}).then(function(document) {
      if (!document) {
        db.collection('qcms_helpers').insertOne(elements).then(function() {
          console.log('added elements');
          db.close();
        });
      } else {
        db.collection('qcms_helpers').updateOne({'name': 'elements'}, {$set: {'types': elements.types}}).then(function () {
          console.log('updated elements types');
          db.close();
        })
      }
    })
});

// SEED ROLES
MongoClient.connect(dbUrl, function(err, db) {
    assert.equal(null, err);
    db.collection('qcms_helpers').findOne({'name': 'roles'}).then(function(document) {
      if (!document) {
        db.collection('qcms_helpers').insertOne(roles).then(function() {
          console.log('added roles');
          db.close();
        });
      } else {
        db.collection('qcms_helpers').updateOne({'name': 'roles'}, {$set: {'roles': roles.roles}}).then(function () {
          console.log('updated roles');
          db.close();
        })
      }
    })
});

// SEED USER
bcrypt.hash('ch@ngeIt', 8, function (bcerr, result) {
  MongoClient.connect(dbUrl, function(err, db) {
    assert.equal(null, err);
    db.collection('qcms_users').findOne({'login': 'admin'}).then(function(document) {
      if (!document) {
        let admin = new User('admin', 'admin', 'admin', 'admin', result);
        db.collection('qcms_users').insertOne(admin).then(function() {
          db.close();
          console.log('added admin');
        });
      } else {
        console.log('skipped admin added');
        db.close();
      }
    })
  });
})

// CREATE SESSION COLLECTION
MongoClient.connect(dbUrl, function(err, db) {
    assert.equal(null, err);
    db.listCollections({'name': 'qcms_sessions'}).toArray().then(function (documents) {
      if (documents.length === 0) {
        db.createCollection('qcms_sessions').then(function () {
          db.collection('qcms_sessions').createIndex({ 'createdAt': 1 }, { expireAfterSeconds: cookieExp }).then(function () {
            db.close();
            console.log('Created sessions collection');
          })
        })
      } else {
        db.close();
        console.log('Skipped creating sessions collection');
      }
    })
})

