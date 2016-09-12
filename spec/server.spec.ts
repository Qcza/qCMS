import * as request from 'request';
import * as assert from 'assert';
import * as mongodb from 'mongodb';
import * as config from '../config';

import { Template, Element } from '../app/models/template'

const port = config.port;
const main_url = `http://localhost:${port}`;

// MONGO CONFIG
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectID;
const dbUrl = (config.dbUser && config.dbPwd) ? ('mongodb://' + config.dbUser + ':' + config.dbPwd + '@' + config.dbUrl) : ('mongodb://' + config.dbUrl);

// LANDING PAGE
describe("Landing page", function() {

  it("should return status code 200", function(done) {
    request(main_url, function (err, res, body) {
      expect(res.statusCode).toBe(200);
      done();
    });
  });

});

// TEMPLATES
describe("Templates", function () {

  afterEach(function () {
    MongoClient.connect(dbUrl, function (err, db) {
      assert.equal(null, err);
      db.collection('qcms_templates').deleteOne({'name': 'qcmsUnitTest'});
    })
  })

  it("should add new template to db", function (done) {
    let template = new Template('qcmsUnitTest');
    let options = {
      method: 'POST',
      url: main_url+'/templates',
      headers: {
        'Auth': 'basicqCMSAuth'
      },
      form: template
    }
    request(options, function (err, res, body) {
      expect(body).toBe(JSON.stringify('success'));
      done();
    })
  })

})