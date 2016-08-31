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
var app_service_1 = require('../services/app.service');
var leftbar_component_1 = require('./leftbar.component');
var rightbar_component_1 = require('./rightbar.component');
var template_1 = require('../models/template');
var session_1 = require('../models/session');
var ng2_cookies_1 = require('ng2-cookies/ng2-cookies');
var AppComponent = (function () {
    function AppComponent(appService) {
        this.appService = appService;
        this.remember = false;
        this.loginForm = {
            login: '',
            pw: ''
        };
        this.loginErr = false;
        this.template = new template_1.Template();
        this.sessionId = ng2_cookies_1.Cookie.get('sessionId');
        this.getSession();
    }
    AppComponent.prototype.getSession = function () {
        var _this = this;
        if (!this.sessionId) {
            return;
        }
        this.appService.getSession(this.sessionId).subscribe(function (session) { return _this.session = session; }, function (error) { return _this.errorMessage = error; });
    };
    AppComponent.prototype.signIn = function () {
        var _this = this;
        if (this.loginErr)
            this.loginErr = false;
        this.appService.loginUser(this.loginForm).subscribe(function (user) {
            _this.session = new session_1.Session(user),
                _this.setSession(_this.session);
        }, function (error) {
            _this.errorMessage = error,
                _this.loginErr = true;
        });
    };
    AppComponent.prototype.setSession = function (session) {
        var _this = this;
        this.appService.setSession(session).subscribe(function (sessionId) {
            _this.sessionId = sessionId,
                _this.getSession(),
                _this.remember ? ng2_cookies_1.Cookie.set('sessionId', sessionId, 99) : ng2_cookies_1.Cookie.set('sessionId', sessionId);
        }, function (error) { return _this.errorMessage = error; });
    };
    AppComponent.prototype.onSignOut = function (signOut) {
        if (signOut = true) {
            ng2_cookies_1.Cookie.delete('sessionId');
            location.reload();
        }
    };
    AppComponent.prototype.onSelectScenario = function (scenario) {
        this.scenario = scenario;
    };
    AppComponent.prototype.onSelectTemplate = function (template) {
        this.template = template;
    };
    AppComponent.prototype.onSelectDocument = function (document) {
        this.document = document;
        this.template = document.template;
    };
    AppComponent.prototype.onRefresh = function (template) {
        this.template = template;
    };
    AppComponent.prototype.onAddTemplate = function (templateAdded) {
        var _this = this;
        this.templateAdded = templateAdded;
        setTimeout(function () { return _this.templateAdded = undefined; }, 500);
    };
    AppComponent.prototype.onDeleteTemplate = function (templateDeleted) {
        var _this = this;
        this.templateDeleted = templateDeleted;
        setTimeout(function () { return _this.templateDeleted = undefined; }, 500);
    };
    AppComponent.prototype.onEditTemplate = function (templateEdited) {
        var _this = this;
        this.templateEdited = templateEdited;
        setTimeout(function () { return _this.templateEdited = undefined; }, 500);
    };
    AppComponent.prototype.onAddDocument = function (documentAdded) {
        var _this = this;
        this.documentAdded = documentAdded;
        setTimeout(function () { return _this.documentAdded = undefined; }, 500);
    };
    AppComponent.prototype.onDeleteDocument = function (documentDeleted) {
        var _this = this;
        this.documentDeleted = documentDeleted;
        setTimeout(function () { return _this.documentDeleted = undefined; }, 500);
    };
    AppComponent.prototype.onEditDocument = function (documentEdited) {
        var _this = this;
        this.documentEdited = documentEdited;
        setTimeout(function () { return _this.documentEdited = undefined; }, 500);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'main-app',
            providers: [app_service_1.AppService],
            templateUrl: 'app/templates/app.component.html',
            styleUrls: ['app/styles/app.component.css'],
            directives: [leftbar_component_1.LeftBarComponent, rightbar_component_1.RightBarComponent]
        }), 
        __metadata('design:paramtypes', [app_service_1.AppService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map