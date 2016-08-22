import * as express from 'express';
import * as path from 'path';
import * as mongodb from 'mongodb';
import * as assert from 'assert';
import * as bodyParser from 'body-parser';

const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectID;
const dbUrl = 'mongodb://localhost:27017/qcms' 

const app = express();

app.use(bodyParser.json())

app.use('/', express.static(__dirname));
app.use('/css', express.static(__dirname + '/app/styles/'))
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css/'));
app.use('/css', express.static(__dirname + '/static/font-awesome/css/'));
app.use('/fonts', express.static(__dirname + '/static/font-awesome/fonts/'));

// app.get('/', function (req: express.Request, res: express.Response) {
//     res.sendFile(path.resolve(__dirname, 'index.html'));
// });

//TEMPLATES
app.post('/templates', function (req: express.Request, res: express.Response) {
  MongoClient.connect(dbUrl, function(err, db) {
    assert.equal(null, err);
    db.collection('templates').insertOne(req.body);
    db.close();
    let response:string = JSON.stringify('success');
    res.send(response);
  })
})

app.get('/templates', function (req: express.Request, res: express.Response) {
  MongoClient.connect(dbUrl, function(err, db) {
    assert.equal(null, err);
    let cursor:any = db.collection('templates').find().toArray(function (err, documents) {
      assert.equal(null, err)
      let response:string = JSON.stringify(documents)
      res.send(response)
    });
    db.close();
  })
})

app.delete('/templates/:id', function (req: express.Request, res: express.Response) {
  let id:string = req.params.id;
  MongoClient.connect(dbUrl, function(err, db) {
    assert.equal(null, err);
    db.collection('templates').deleteOne({'id': id});
    db.close();
    let response:string = JSON.stringify('success');
    res.send(response);
  })
})

app.put('/templates/:id', function(req: express.Request, res: express.Response) {
  let id:string = req.params.id;
  MongoClient.connect(dbUrl, function(err, db) {
    assert.equal(null, err);
    db.collection('templates').update({'id': id}, req.body);
    db.close();
    let response:string = JSON.stringify('success');
    res.send(response);
  })
})

//DOCUMENTS
app.post('/documents', function (req: express.Request, res: express.Response) {
  MongoClient.connect(dbUrl, function(err, db) {
    assert.equal(null, err);
    db.collection('documents').insertOne(req.body);
    db.close();
    let response:string = JSON.stringify('success');
    res.send(response);
  })
})

app.get('/documents', function (req: express.Request, res: express.Response) {
  MongoClient.connect(dbUrl, function(err, db) {
    assert.equal(null, err);
    let cursor:any = db.collection('documents').find().toArray(function (err, documents) {
      assert.equal(null, err)
      let response:string = JSON.stringify(documents)
      res.send(response)
    });
    db.close();
  })
})

app.put('/documents', function(req: express.Request, res: express.Response) {
  MongoClient.connect(dbUrl, function(err, db) {
    assert.equal(null, err);
    db.collection('documents').updateOne({'_id': new ObjectId(req.body._id)}, {$set: {
      'title': req.body.title,
      'template': req.body.template
    }});
    db.close();
    let response:string = JSON.stringify('success');
    res.send(response);
  })
})

app.listen(3000);

//helpers
// function getAllDocuments (db, collection:string, callback) {
//   let cursor:Promise<any> = db.collection(collection).find().toArray(callback);
// }