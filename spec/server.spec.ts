import * as request from 'request';

import { Template, Element } from '../app/models/template';

const port = 3000;
const main_url = `http://localhost:${port}`;

describe('Landing page', function() {
    describe('GET /', function () {
        it('return status code 200', function () {
            request.get(main_url, function (error, response, body) {
            expect(response.statusCode).toBe(200);
            })
        })
    })
})

const templates_url = main_url + '/templates';

describe('Templates', function() {
  describe('POST', function () {
    it('insert new template do collection', function () {
      let dummyElement:Element = new Element();
      let elements:Array<Element> = [ dummyElement ];
      let dummyTemplate:Template = new Template('dummyTemplate', elements)
      request.post(templates_url, dummyTemplate, function (error, response, body) {
        expect(body.response).toBe('test');
      })
    })
  })
})