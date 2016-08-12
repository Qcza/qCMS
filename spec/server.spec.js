"use strict";
var request = require('request');
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
//# sourceMappingURL=server.spec.js.map