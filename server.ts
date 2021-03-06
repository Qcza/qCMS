import * as express from 'express';
import * as path from 'path';
import * as mongodb from 'mongodb';
import * as assert from 'assert';
import * as bodyParser from 'body-parser';
import * as bcrypt from 'bcrypt';
import * as multer from 'multer';
import * as cors from 'cors';
import * as fs from 'fs';

import * as config from './config';

// MONGO CONFIG
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectID;
const dbUrl = (config.dbUser && config.dbPwd) ? ('mongodb://' + config.dbUser + ':' + config.dbPwd + '@' + config.dbUrl) : ('mongodb://' + config.dbUrl);

// BCRYPT CONFIG
const saltRounds:number = 8;

// MULTER CONFIG
const avtrUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, config.avtrPath)
    },
    filename: (req, file, cb) => {
      let ext = path.extname(file.originalname);
      cb(null, `${Math.random().toString(36).substring(7)}${ext}`);
    }
  })
});
const imgUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, config.imgPath)
    },
    filename: (req, file, cb) => {
      let ext = path.extname(file.originalname);
      cb(null, `${Math.random().toString(36).substring(7)}${ext}`);
    }
  })
});
const attUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, config.filePath)
    },
    filename: (req, file, cb) => {
      let ext = path.extname(file.originalname);
      cb(null, `${Math.random().toString(36).substring(7)}${ext}`);
    }
  })
});

// EXPRESS
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static(__dirname));
app.use('/css', express.static(__dirname + '/app/styles/'))
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css/'));
app.use('/css', express.static(__dirname + '/node_modules/font-awesome/css/'));
app.use('/fonts', express.static(__dirname + '/node_modules/font-awesome/fonts/'));
app.use('/img', express.static(__dirname + '/' + config.avtrPath));
app.use('/img', express.static(__dirname + '/' + config.imgPath));
app.use('/files', express.static(__dirname + '/' + config.filePath));

// app.get('/', function (req: express.Request, res: express.Response) {
//     res.sendFile(path.resolve(__dirname, ' index.html'));
// });

//TEMPLATES
// POST TEMPLATE
function addTemplate (db, req) {
  db.collection('qcms_templates').insertOne(req.body).then(function () {
    db.collection('qcms_helpers').findOne({'name': 'collections'}).then(function(document) {
      let new_collections:Array<string> = document.collections;
      if (new_collections.indexOf(req.body.collection) === -1) { 
        new_collections.push(req.body.collection);
        return new_collections
      } else {
        return []
      }
    }).then(function(collections:Array<string>) {
      if (collections.length > 0) {
        db.collection('qcms_helpers').updateOne({'name': 'collections'}, {$set: {'collections': collections}}).then(function () {
          db.close()
        })
      } else {
        db.close();
      }
    })
  });
}
app.post('/templates', function (req: express.Request, res: express.Response) {
  if (req.get('Auth') !== 'basicqCMSAuth') {
      let response:string = JSON.stringify({'error': 'unauthorized access'});
      res.send(response);
  } else {
    MongoClient.connect(dbUrl, function(err, db) {
      assert.equal(null, err);
      if (req.body.is_default === true) {
        db.collection('qcms_templates').updateMany({}, {$set: {'is_default': false}}).then(function () {
          addTemplate(db, req);
        });
      } else {
        addTemplate(db, req);
      }
      let response:string = JSON.stringify('success');
      res.send(response);
    })
  }
})

// GET TEMPLATES
app.get('/templates', function (req: express.Request, res: express.Response) {
  if (req.get('Auth') !== 'basicqCMSAuth') {
    let response:string = JSON.stringify({'error': 'unauthorized access'});
    res.send(response);
  } else {
    MongoClient.connect(dbUrl, function(err, db) {
      assert.equal(null, err);
      db.collection('qcms_templates').find().sort({'name': 1}).toArray().then(function(documents) {
        let response:string = JSON.stringify(documents)
        res.send(response)
        db.close();
      })
    })
  }
})

// GET TEMPLATE
app.get('/templates/:id', function (req: express.Request, res: express.Response) {
  if (req.get('Auth') !== 'basicqCMSAuth') {
    let response:string = JSON.stringify({'error': 'unauthorized access'});
    res.send(response);
  } else {
    MongoClient.connect(dbUrl, function(err, db) {
      assert.equal(null, err);
      let id:string = req.params.id;
      db.collection('qcms_templates').findOne({'_id': new ObjectId(id)}).then(function(document) {
        let response:string = JSON.stringify(document)
        res.send(response)
        db.close();
      })
    })
  }
})

// DELETE TEMPLATE
app.delete('/templates/:id', function (req: express.Request, res: express.Response) {
  if (req.get('Auth') !== 'basicqCMSAuth') {
    let response:string = JSON.stringify({'error': 'unauthorized access'});
    res.send(response)
  } else {
    let id:string = req.params.id;
    MongoClient.connect(dbUrl, function(err, db) {
      assert.equal(null, err);
      db.collection('qcms_templates').deleteOne({'_id': new ObjectId(id)}).then( function () {
        let response:string = JSON.stringify('success');
        res.send(response);
        db.close();
      })
    })
  }
})

// EDIT TEMPLATE
function updateTemplate (db, req) {
  let id:string = req.params.id;
  db.collection('qcms_templates').updateOne({'_id': new ObjectId(id)}, {
      'name': req.body.name,
      'collection': req.body.collection,
      'is_default': req.body.is_default,
      'elements': req.body.elements
    }).then(function () {
      db.close()
    })
}
app.put('/templates/:id', function (req: express.Request, res: express.Response) {
  if (req.get('Auth') !== 'basicqCMSAuth') {
    let response:string = JSON.stringify({'error': 'unauthorized access'});
    res.send(response);
  } else {
    MongoClient.connect(dbUrl, function (err, db) {
      assert.equal(null, err);
      if (req.body.is_default === true) {
          db.collection('qcms_templates').updateMany({}, {$set: {'is_default': false}}).then(function () {
            updateTemplate(db, req);
          });
        } else {
          updateTemplate(db, req);
        }
        let response:string = JSON.stringify('success');
        res.send(response);
    })
  }
})

//DOCUMENTS
// POST DOCUMENT
app.post('/documents', function (req: express.Request, res: express.Response) {
  if (req.get('Auth') !== 'basicqCMSAuth') {
    let response:string = JSON.stringify({'error': 'unauthorized access'});
    res.send(response);
  } else {
    MongoClient.connect(dbUrl, function(err, db) {
      assert.equal(null, err);
      db.collection('qcms_documents').insertOne(req.body).then(function () {
        let response:string = JSON.stringify('success');
        res.send(response);
        db.close();
      });
    })
  }
})

// GET DOCUMENTS
app.get('/documents', function (req: express.Request, res: express.Response) {
  if (req.get('Auth') !== 'basicqCMSAuth') {
    let response:string = JSON.stringify({'error': 'unauthorized access'});
    res.send(response);
  } else {
    MongoClient.connect(dbUrl, function(err, db) {
      assert.equal(null, err);
      db.collection('qcms_documents').find().sort({'date': -1}).toArray().then(function (documents) {
        let response:string = JSON.stringify(documents)
        res.send(response)
        db.close();
      })
    })
  }
})

// EDIT DOCUMENT
app.put('/documents/:id', function(req: express.Request, res: express.Response) {
  if (req.get('Auth') !== 'basicqCMSAuth') {
    let response:string = JSON.stringify({'error': 'unauthorized access'});
    res.send(response);
  } else {
    let id:string = req.params.id;
    MongoClient.connect(dbUrl, function(err, db) {
      assert.equal(null, err);
      db.collection('qcms_documents').updateOne({'_id': new ObjectId(id)}, {$set: {
        'title': req.body.title,
        'template': req.body.template,
        'images': req.body.images,
        'attachments': req.body.attachments
      }}).then(function () {
        let response:string = JSON.stringify('success');
        res.send(response);
        db.close();
      })
    })
  }
})

// DELETE DOCUMENT
app.delete('/documents/:id', function (req: express.Request, res: express.Response) {
  if (req.get('Auth') !== 'basicqCMSAuth') {
    let response:string = JSON.stringify({'error': 'unauthorized access'});
    res.send(response);
  } else {
    let id:mongodb.ObjectID = new ObjectId(req.params.id);
    MongoClient.connect(dbUrl, function(err, db) {
      assert.equal(null, err);
      db.collection('qcms_documents').findOne({'_id': id}).then(function(document) {
        if (document) {
          for (let img of document.images) {
            let path = config.imgPath + img;
            fs.unlink(path);
          }
          for (let att of document.attachments) {
            let path = config.filePath + att.filename;
            fs.unlink(path);
          }
        }
      }).then(function () {
        db.collection('qcms_documents').deleteOne({'_id': id}).then(function () {
          let response:string = JSON.stringify('success');
          res.send(response);
          db.close();
        })
      })
    })
  }
})

// USERS
// POST USERS
app.post('/users', function (req: express.Request, res: express.Response) {
  if (req.get('Auth') !== 'basicqCMSAuth') {
    let response:string = JSON.stringify({'error': 'unauthorized access'});
    res.send(response);
  } else {
    bcrypt.hash(req.body.pw, saltRounds, function (bcerr, hash) {
      assert.equal(null, bcerr)
      req.body.pw = hash;
      MongoClient.connect(dbUrl, function(err, db) {
        assert.equal(null, err);
        db.collection('qcms_users').insertOne(req.body).then(function () {
          let response:string = JSON.stringify('success');
          res.send(response);
          db.close();
        })
      })
    })
  }
})

// GET USERS
app.get('/users', function (req: express.Request, res: express.Response) {
  if (req.get('Auth') !== 'basicqCMSAuth') {
    let response:string = JSON.stringify({'error': 'unauthorized access'});
    res.send(response);
  } else {
    MongoClient.connect(dbUrl, function(err, db) {
      assert.equal(null, err);
      db.collection('qcms_users').find().sort({'login': 1}).toArray().then(function (documents) {
        let response:string = JSON.stringify(documents);
        res.send(response);
        db.close();
      })
    })
  }
})

// EDIT USER
app.put('/users/:id', function (req: express.Request, res: express.Response) {
  if (req.get('Auth') !== 'basicqCMSAuth') {
    let response:string = JSON.stringify({'error': 'unauthorized access'});
    res.send(response);
  } else {
    let id:mongodb.ObjectID = new ObjectId(req.params.id);
    MongoClient.connect(dbUrl, function(bcerr, db) {
      assert.equal(null, bcerr);
      db.collection('qcms_users').updateOne({'_id': id}, {$set: {
        'login': req.body.login,
        'fname': req.body.fname,
        'lname': req.body.lname,
        'image': req.body.image,
        'role': req.body.role
      }}).then(function () {
        if (req.body.pw && req.body.pw !== '') {
          bcrypt.hash(req.body.pw, saltRounds, function (err, hash) {
            assert.equal(null, err);
            db.collection('qcms_users').updateOne({'_id': id}, {$set: {
              'pw': hash
            }}).then(function () {
              let response:string = JSON.stringify('success');
              res.send(response);
              db.close();
            })
          })
        } else {
          let response:string = JSON.stringify('success');
          res.send(response);
          db.close();
        }
      })
    })
  }
})

// DELETE USER
app.delete('/users/:id', function (req: express.Request, res: express.Response) {
  if (req.get('Auth') !== 'basicqCMSAuth') {
    let response:string = JSON.stringify({'error': 'unauthorized access'});
    res.send(response);
  } else {
  let id:mongodb.ObjectID = new ObjectId(req.params.id);
    MongoClient.connect(dbUrl, function(err, db) {
      assert.equal(null, err);
      db.collection('qcms_users').findOne({'_id': id}).then(function (document) {
        if (document) {
          let path = config.avtrPath + document.image;
          fs.unlink(path);
        }
      }).then(function () {
        db.collection('qcms_users').deleteOne({'_id': id}).then(function () {
          let response:string = JSON.stringify('success');
          res.send(response);
          db.close();
        })
      })
    })
  }
})

// SIGN IN
app.post('/users/signin', function (req: express.Request, res: express.Response) {
  if (req.get('Auth') !== 'basicqCMSAuth') {
    let response:string = JSON.stringify({'error': 'unauthorized access'});
    res.send(response);
  } else {
    MongoClient.connect(dbUrl, function (err, db) {
      assert.equal(null, err);
      db.collection('qcms_users').findOne({'login': req.body.login}).then(function (document) {
        if (document) {
          bcrypt.compare(req.body.pw, document.pw, function (bcerr, result) {
            assert.equal(null, bcerr);
            if (result === true) {
              let response:string = JSON.stringify(document);
              res.send(response);
              db.close();
            } else {
              db.close();
              res.sendStatus(404);
            }
          })
        } else {
          db.close();
          res.sendStatus(404);
        }
      })
    })
  }
})

// SESSIONS
// SET SESSION
app.post('/sessions', function (req: express.Request, res: express.Response) {
  if (req.get('Auth') !== 'basicqCMSAuth') {
    let response:string = JSON.stringify({'error': 'unauthorized access'});
    res.send(response);
  } else {
    MongoClient.connect(dbUrl, function (err, db) {
      assert.equal(null, err);
      req.body.createdAt = new Date(req.body.createdAt);
      db.collection('qcms_sessions').insertOne(req.body).then(function () {
        let response:string = JSON.stringify({'sessionId': req.body.sessionId});
        res.send(response);
        db.close();
      })
    })
  }
})

// GET SESSION
app.get('/sessions/:id', function (req: express.Request, res: express.Response) {
  if (req.get('Auth') !== 'basicqCMSAuth') {
    let response:string = JSON.stringify({'error': 'unauthorized access'});
    res.send(response);
  } else {
    let id:string = req.params.id;
    MongoClient.connect(dbUrl, function (err, db) {
      assert.equal(null, err);
      db.collection('qcms_sessions').findOne({'sessionId': id}).then(function (document) {
        if (document) {
          let response:string = JSON.stringify(document);
          res.send(response);
          db.close();
        } else {
          res.sendStatus(404);
          db.close();
        }
      })
    })
  }
})

// PUT SESSION
app.put('/sessions/:id', function (req: express.Request, res: express.Response) {
  if (req.get('Auth') !== 'basicqCMSAuth') {
    let response:string = JSON.stringify({'error': 'unauthorized access'});
    res.send(response);
  } else {
    let id:string = req.params.id;
    MongoClient.connect(dbUrl, function (err, db) {
      assert.equal(null, err);
      db.collection('qcms_sessions').updateOne({'sessionId': id}, {$set: {
        'user': req.body.user
      }}).then(function () {
        let response:string = JSON.stringify('success');
        res.send(response);
        db.close();
      })
    })
  }
})

// DELETE SESSION
app.delete('/sessions/:id', function (req: express.Request, res: express.Response) {
  if (req.get('Auth') !== 'basicqCMSAuth') {
    let response:string = JSON.stringify({'error': 'unauthorized access'});
    res.send(response);
  } else {
    let id:string = req.params.id;
    MongoClient.connect(dbUrl, function(err, db) {
      assert.equal(null, err);
      db.collection('qcms_sessions').deleteOne({'sessionId': id}).then(function () {
        let response:string = JSON.stringify('success');
        res.send(response);
        db.close();
      })
    })
  }
})

// FILES
// POST AVATAR
app.post('/avatars', avtrUpload.any(), function (req, res) {
  if (req.get('Auth') === 'basicqCMSAuth') {
    res.json(req.files[0])
  } else {
    let response:string = JSON.stringify({'error': 'unauthorized access'});
    res.send(response);
  }
})

// DELETE AVATAR
app.delete('/avatars/:name', function (req, res) {
  if (req.get('Auth') === 'basicqCMSAuth') {
    let name = req.params.name;
    let path = config.avtrPath + name;
    fs.unlink(path, function (rs) {
      let response:string = JSON.stringify(rs);
      res.send(response);
    })
  } else {
    let response:string = JSON.stringify({'error': 'unauthorized access'});
    res.send(response);
  }
})

// POST IMAGE
app.post('/images', imgUpload.any(), function (req, res) {
  if (req.get('Auth') === 'basicqCMSAuth') {
    res.json(req.files[0])
  } else {
    let response:string = JSON.stringify({'error': 'unauthorized access'});
    res.send(response);
  }
})

// DELETE IMAGE
app.delete('/images/:name', function (req, res) {
  if (req.get('Auth') === 'basicqCMSAuth') {
    let name = req.params.name;
    let path = config.imgPath + name;
    fs.unlink(path, function (rs) {
      let response:string = JSON.stringify(rs);
      res.send(response);
    })
  } else {
    let response:string = JSON.stringify({'error': 'unauthorized access'});
    res.send(response);
  }
})

// POST ATTACHMENT
app.post('/attachments', attUpload.any(), function (req, res) {
  if (req.get('Auth') === 'basicqCMSAuth') {
    res.json(req.files[0])
  } else {
    let response:string = JSON.stringify({'error': 'unauthorized access'});
    res.send(response);
  }
})

// DELETE ATTACHMENT
app.delete('/attachments/:name', function (req, res) {
  if (req.get('Auth') === 'basicqCMSAuth') {
    let name = req.params.name;
    let path = config.filePath + name;
    fs.unlink(path, function (rs) {
      let response:string = JSON.stringify(rs);
      res.send(response);
    })
  } else {
    let response:string = JSON.stringify({'error': 'unauthorized access'});
    res.send(response);
  }
})

//HELPERS
// GET COLLECTIONS
app.get('/helpers/collections', function (req: express.Request, res: express.Response) {
  if (req.get('Auth') !== 'basicqCMSAuth') {
    let response:string = JSON.stringify({'error': 'unauthorized access'});
    res.send(response);
  } else {
    MongoClient.connect(dbUrl, function(err, db) {
      assert.equal(null, err);
      db.collection('qcms_helpers').findOne({'name': 'collections'}).then(function (document) {
        let response:string = JSON.stringify(document.collections)
        res.send(response);
        db.close();
      })
    })
  }
})

// GET ELEMENTS
app.get('/helpers/elements', function (req: express.Request, res: express.Response) {
  if (req.get('Auth') !== 'basicqCMSAuth') {
    let response:string = JSON.stringify({'error': 'unauthorized access'});
    res.send(response);
  } else {
    MongoClient.connect(dbUrl, function(err, db) {
      assert.equal(null, err);
      db.collection('qcms_helpers').findOne({'name': 'elements'}).then(function (document) {
        let response:string = JSON.stringify(document.types)
        res.send(response);
        db.close();
      })
    })
  }
})

// GET ROLES
app.get('/helpers/roles', function (req: express.Request, res: express.Response) {
  if (req.get('Auth') !== 'basicqCMSAuth') {
    let response:string = JSON.stringify({'error': 'unauthorized access'});
    res.send(response);
  } else {
    MongoClient.connect(dbUrl, function(err, db) {
      assert.equal(null, err);
      db.collection('qcms_helpers').findOne({'name': 'roles'}).then(function (document) {
        let response:string = JSON.stringify(document.roles);
        res.send(response);
        db.close();
      })
    })
  }
})

app.listen(config.port);