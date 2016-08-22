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
var template_1 = require('../models/template');
var document_1 = require('../models/document');
var LeftBarComponent = (function () {
    function LeftBarComponent(appService) {
        this.appService = appService;
        this.brand = '@qCMS';
        this.extend = null;
        this.scenario = null;
        this.active = null;
        this.onSelectScenario = new core_1.EventEmitter();
        this.onSelectTemplate = new core_1.EventEmitter();
        this.onSelectDocument = new core_1.EventEmitter();
    }
    LeftBarComponent.prototype.ngOnInit = function () {
        this.getDocuments();
        this.getTemplates();
    };
    LeftBarComponent.prototype.ngOnChanges = function (changes) {
        if (this.templateAdded === true) {
            this.getTemplates();
        }
        if (this.documentAdded === true) {
            this.getDocuments();
        }
    };
    LeftBarComponent.prototype.selectRightBarScenario = function (scenario) {
        this.onSelectScenario.emit(scenario);
    };
    LeftBarComponent.prototype.setScenario = function (scenario) {
        this.scenario = scenario;
        this.active = scenario;
    };
    LeftBarComponent.prototype.extendBar = function (scenario) {
        if (this.extend === 'show' && this.scenario === scenario) {
            this.extend = 'hide';
            this.active = null;
        }
        else {
            this.extend = 'show';
            this.setScenario(scenario);
        }
    };
    LeftBarComponent.prototype.getTemplates = function () {
        var _this = this;
        this.appService.getTemplates().subscribe(function (templates) { return _this.templates = templates; }, function (error) { return _this.errMessage = error; });
    };
    LeftBarComponent.prototype.selectTemplate = function (template) {
        template.is_selected = true;
        for (var _i = 0, _a = this.templates; _i < _a.length; _i++) {
            var temp = _a[_i];
            if (temp._id !== template._id && temp.is_selected === true) {
                temp.is_selected = false;
            }
        }
        var selectedTemplate = new template_1.Template(template.name, template.elements, template.is_default);
        this.onSelectTemplate.emit(selectedTemplate);
    };
    LeftBarComponent.prototype.newTemplate = function () {
        var newTemplate = new template_1.Template();
        this.onSelectTemplate.emit(newTemplate);
    };
    LeftBarComponent.prototype.getDocuments = function () {
        var _this = this;
        this.appService.getDocuments().subscribe(function (documents) { return _this.documents = documents; }, function (error) { return _this.errMessage = error; });
    };
    LeftBarComponent.prototype.selectDocument = function (document) {
        document.is_selected = true;
        for (var _i = 0, _a = this.documents; _i < _a.length; _i++) {
            var doc = _a[_i];
            if (doc._id !== document._id && doc.is_selected === true) {
                doc.is_selected = false;
            }
        }
        var selectedDocument = new document_1.Doc(document.title, document.template, document._id);
        this.onSelectDocument.emit(selectedDocument);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], LeftBarComponent.prototype, "templateAdded", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], LeftBarComponent.prototype, "documentAdded", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], LeftBarComponent.prototype, "onSelectScenario", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], LeftBarComponent.prototype, "onSelectTemplate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], LeftBarComponent.prototype, "onSelectDocument", void 0);
    LeftBarComponent = __decorate([
        core_1.Component({
            selector: 'left-bar',
            providers: [app_service_1.AppService],
            templateUrl: 'app/templates/leftbar.component.html',
            styleUrls: ['app/styles/leftbar.component.css']
        }), 
        __metadata('design:paramtypes', [app_service_1.AppService])
    ], LeftBarComponent);
    return LeftBarComponent;
}());
exports.LeftBarComponent = LeftBarComponent;
//# sourceMappingURL=leftbar.component.js.map