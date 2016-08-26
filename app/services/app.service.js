"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var AppService = (function () {
    function AppService(http) {
        this.http = http;
        //Templates services
        this.templatesUrl = 'http://localhost:3000/templates';
        //Documents services
        this.documentsUrl = 'http://localhost:3000/documents';
        //Helpers services
        this.collectionsUrl = 'http://localhost:3000/helpers/collections';
        this.elementsUrl = 'http://localhost:3000/helpers/elements';
    }
    AppService.prototype.getTemplates = function () {
        return this.http.get(this.templatesUrl).map(this.extractData).catch(this.handleError);
    };
    AppService.prototype.postTemplate = function (template) {
        var body = JSON.stringify(template);
        var headers = new http_1.Headers({ 'Content-type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.templatesUrl, body, options).map(this.extractData).catch(this.handleError);
    };
    AppService.prototype.putTemplate = function (template) {
        var body = JSON.stringify(template);
        var headers = new http_1.Headers({ 'Content-type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.put(this.templatesUrl, body, options).map(this.extractData).catch(this.handleError);
    };
    AppService.prototype.postDocument = function (document) {
        var body = JSON.stringify(document);
        var headers = new http_1.Headers({ 'Content-type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.documentsUrl, body, options).map(this.extractData).catch(this.handleError);
    };
    AppService.prototype.getDocuments = function () {
        return this.http.get(this.documentsUrl).map(this.extractData).catch(this.handleError);
    };
    AppService.prototype.putDocument = function (document) {
        var body = JSON.stringify(document);
        var headers = new http_1.Headers({ 'Content-type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.put(this.documentsUrl, body, options).map(this.extractData).catch(this.handleError);
    };
    AppService.prototype.deleteDocument = function (document) {
        return this.http.delete(this.documentsUrl + '/' + document._id).map(this.extractData).catch(this.handleError);
    };
    AppService.prototype.getCollections = function () {
        return this.http.get(this.collectionsUrl).map(this.extractData).catch(this.handleError);
    };
    AppService.prototype.getElements = function () {
        return this.http.get(this.elementsUrl).map(this.extractData).catch(this.handleError);
    };
    //Helpers
    AppService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    AppService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message : error.status ? error.status + " - " + error.message : 'Server error';
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    AppService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AppService);
    return AppService;
}());
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map