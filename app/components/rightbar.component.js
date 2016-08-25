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
var template_1 = require('../models/template');
var document_1 = require('../models/document');
var helpers_1 = require('../models/helpers');
var app_service_1 = require('../services/app.service');
var RightBarComponent = (function () {
    function RightBarComponent(appService) {
        this.appService = appService;
        this.show = 'default';
        this.elementsTypes = ['header', 'text']; //Add to DB
        this.elementsList = [];
        this.chosenElement = new template_1.Element();
        this.documentTitle = '';
        this.documentCollection = '';
        this.templateElements = [];
        this.templateDefault = false;
        this.onRefresh = new core_1.EventEmitter();
        this.onAddTemplate = new core_1.EventEmitter();
        this.onAddDocument = new core_1.EventEmitter();
        this.onDeleteDocument = new core_1.EventEmitter();
        this.bootstrapElements();
    }
    RightBarComponent.prototype.ngOnInit = function () {
        this.getCollections();
    };
    RightBarComponent.prototype.bootstrapElements = function () {
        for (var _i = 0, _a = this.elementsTypes; _i < _a.length; _i++) {
            var type = _a[_i];
            var element = new template_1.Element(type);
            this.elementsList.push(element);
        }
    };
    RightBarComponent.prototype.ngOnChanges = function (changes) {
        if (this.scenario !== undefined) {
            this.show = 'show';
        }
    };
    RightBarComponent.prototype.showBar = function () {
        if (this.show === 'default' || this.show == 'hide') {
            this.show = 'show';
        }
        else if (this.show === 'show') {
            this.show = 'hide';
        }
    };
    RightBarComponent.prototype.addElement = function (element) {
        var indexes = [];
        for (var _i = 0, _a = this.templateElements; _i < _a.length; _i++) {
            var i = _a[_i];
            indexes.push(i.index);
        }
        element.index = indexes.length > 0 ? Math.max.apply(null, indexes) + 1 : 0;
        var elementToPush = Object.assign({}, element);
        this.templateElements.push(elementToPush);
        this.refreshTemplate();
    };
    RightBarComponent.prototype.removeElement = function (index) {
        for (var _i = 0, _a = this.templateElements; _i < _a.length; _i++) {
            var i = _a[_i];
            if (i.index === index) {
                this.templateElements.splice(this.templateElements.indexOf(i), 1);
                this.refreshTemplate();
                return;
            }
        }
    };
    RightBarComponent.prototype.refreshTemplate = function () {
        this.template = new template_1.Template(this.templateName, this.templateElements, this.templateDefault, this.documentCollection);
        this.onRefresh.emit(this.template);
    };
    RightBarComponent.prototype.choseElement = function (element) {
        this.chosenElement = Object.assign({}, element);
    };
    RightBarComponent.prototype.choseCollection = function (collection) {
        this.documentCollection = collection;
    };
    RightBarComponent.prototype.getCollections = function () {
        var _this = this;
        this.appService.getCollections().subscribe(function (collections) { return _this.documentCollections = collections; }, function (error) { return _this.errMessage = error; });
    };
    RightBarComponent.prototype.saveTemplate = function () {
        var _this = this;
        this.appService.postTemplate(this.template).subscribe(function (response) {
            _this.response = response,
                _this.resetTemplateForm(response),
                _this.showAlerts('success', 'Template saved'),
                _this.emitAddTemplate();
        }, function (error) {
            _this.errorMessage = error,
                _this.showAlerts('danger', 'Something went wrong');
        });
    };
    RightBarComponent.prototype.resetTemplateForm = function (response) {
        if (response === 'success') {
            this.template = new template_1.Template();
        }
    };
    RightBarComponent.prototype.showAlerts = function (type, message) {
        var _this = this;
        this.showAlert = true;
        this.alert = new helpers_1.Alert(type, message);
        setTimeout(function () {
            _this.hideAlert = true;
        }, 6000);
        setTimeout(function () {
            _this.showAlert = false;
            _this.hideAlert = false;
        }, 7500);
    };
    RightBarComponent.prototype.emitAddTemplate = function () {
        this.templateAdded = true;
        this.onAddTemplate.emit(this.templateAdded);
        this.template = new template_1.Template();
        this.onRefresh.emit(this.template);
    };
    RightBarComponent.prototype.addDocument = function (title, template) {
        var _this = this;
        var doc = new document_1.Doc(title, template);
        this.appService.postDocument(doc).subscribe(function (response) {
            _this.response = response,
                _this.showAlerts('success', 'Document saved'),
                _this.emitAddDocument();
        }, function (error) {
            _this.errorMessage = error,
                _this.showAlerts('danger', 'Something went wrong');
        });
    };
    RightBarComponent.prototype.editDocument = function (document) {
        var _this = this;
        this.appService.putDocument(document).subscribe(function (response) {
            _this.response = response,
                _this.showAlerts('success', 'Document saved'),
                _this.emitAddDocument();
        }, function (error) {
            _this.errorMessage = error,
                _this.showAlerts('danger', 'Something went wrong');
        });
    };
    RightBarComponent.prototype.deleteDocument = function (document) {
        var _this = this;
        this.appService.deleteDocument(document).subscribe(function (response) {
            _this.response = response,
                _this.showAlerts('success', 'Document deleted'),
                _this.emitDeleteDocument();
        }, function (error) {
            _this.errorMessage = error,
                _this.showAlerts('danger', 'Something went wrong');
        });
    };
    RightBarComponent.prototype.emitAddDocument = function () {
        this.documentAdded = true;
        this.onAddDocument.emit(this.documentAdded);
    };
    RightBarComponent.prototype.emitDeleteDocument = function () {
        this.documentDeleted = true;
        this.onDeleteDocument.emit(this.documentDeleted);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], RightBarComponent.prototype, "scenario", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', template_1.Template)
    ], RightBarComponent.prototype, "template", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', document_1.Doc)
    ], RightBarComponent.prototype, "document", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], RightBarComponent.prototype, "onRefresh", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], RightBarComponent.prototype, "onAddTemplate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], RightBarComponent.prototype, "onAddDocument", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], RightBarComponent.prototype, "onDeleteDocument", void 0);
    RightBarComponent = __decorate([
        core_1.Component({
            selector: 'right-bar',
            providers: [app_service_1.AppService],
            templateUrl: 'app/templates/rightbar.component.html',
            styleUrls: ['app/styles/rightbar.component.css']
        }), 
        __metadata('design:paramtypes', [app_service_1.AppService])
    ], RightBarComponent);
    return RightBarComponent;
}());
exports.RightBarComponent = RightBarComponent;
//# sourceMappingURL=rightbar.component.js.map