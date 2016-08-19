"use strict";
var request = require('request');
var template_1 = require('../app/models/template');
var port = 3000;
var main_url = "http://localhost:" + port;
describe('Landing page', function () {
    describe('GET /', function () {
        it('return status code 200', function () {
            request.get(main_url, function (error, response, body) {
                expect(response.statusCode).toBe(200);
            });
        });
    });
});
var templates_url = main_url + '/templates';
describe('Templates', function () {
    describe('POST', function () {
        it('insert new template do collection', function () {
            var dummyElement = new template_1.Element();
            var elements = [dummyElement];
            var dummyTemplate = new template_1.Template('dummyTemplate', elements);
            request.post(templates_url, dummyTemplate, function (error, response, body) {
                expect(body.response).toBe('test');
            });
        });
    });
});
//# sourceMappingURL=server.spec.js.map