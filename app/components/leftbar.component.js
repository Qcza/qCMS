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
        this.settingMenu = [
            { title: 'New template', icon: 'fa-file-o', is_selected: false, scenario: 'newTemplate' },
            { title: 'Edit template', icon: 'fa-edit', is_selected: false, scenario: 'editTemplate' },
            { title: 'Add user', icon: 'fa-user-plus', is_selected: false, scenario: 'addUser' },
            { title: 'Preferences', icon: 'fa-cutlery', is_selected: false, scenario: 'preferences' },
            { title: 'Account', icon: 'fa-briefcase', is_selected: false, scenario: 'account' }
        ];
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
        if (scenario === 'newTemplate') {
            this.newTemplate();
        }
        this.onSelectScenario.emit(scenario);
    };
    LeftBarComponent.prototype.setScenario = function (scenario) {
        this.scenario = scenario;
        this.active = scenario;
        this.openSelected(scenario);
    };
    LeftBarComponent.prototype.selectSettingElement = function (element) {
        if (element.is_selected === false) {
            for (var _i = 0, _a = this.settingMenu; _i < _a.length; _i++) {
                var e = _a[_i];
                if (e.is_selected === true) {
                    e.is_selected = false;
                }
            }
            element.is_selected = true;
        }
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
    LeftBarComponent.prototype.openSelected = function (scenario) {
        if (scenario === 'all') {
            for (var _i = 0, _a = this.documents; _i < _a.length; _i++) {
                var document_2 = _a[_i];
                if (document_2.is_selected === true) {
                    var selectedDocument = new document_1.Doc(document_2.title, document_2.template, document_2._id);
                    this.onSelectDocument.emit(selectedDocument);
                    this.selectRightBarScenario('editDocument');
                    break;
                }
            }
        }
        else if (scenario === 'new') {
            for (var _b = 0, _c = this.templates; _b < _c.length; _b++) {
                var template = _c[_b];
                if (template.is_selected === true) {
                    var selectedTemplate = new template_1.Template(template.name, template.elements, template.is_default);
                    this.onSelectTemplate.emit(selectedTemplate);
                    this.selectRightBarScenario('useTemplate');
                    break;
                }
            }
        }
        else if (scenario === 'admin') {
            for (var _d = 0, _e = this.settingMenu; _d < _e.length; _d++) {
                var element = _e[_d];
                if (element.is_selected === true) {
                    this.selectRightBarScenario(element.scenario);
                    break;
                }
            }
        }
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