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
var user_1 = require('../models/user');
var helpers_1 = require('../models/helpers');
var app_service_1 = require('../services/app.service');
var RightBarComponent = (function () {
    function RightBarComponent(appService) {
        this.appService = appService;
        this.show = 'default';
        this.elementsList = [];
        this.chosenElement = new template_1.Element();
        // DOCUMENTS
        this.documentTitle = '';
        this.documentCollection = '';
        this.templateElements = [];
        this.templateDefault = false;
        this.templatesToEdit = [];
        this.userLogin = '';
        this.userFname = '';
        this.userLname = '';
        this.userRole = '';
        this.userPw = '';
        this.userPwCon = '';
        this.onRefresh = new core_1.EventEmitter();
        this.onAddTemplate = new core_1.EventEmitter();
        this.onDeleteTemplate = new core_1.EventEmitter();
        this.onEditTemplate = new core_1.EventEmitter();
        this.onAddDocument = new core_1.EventEmitter();
        this.onDeleteDocument = new core_1.EventEmitter();
        this.onEditDocument = new core_1.EventEmitter();
    }
    RightBarComponent.prototype.ngOnInit = function () {
        this.getCollections();
        this.getElements();
        this.getRoles();
    };
    RightBarComponent.prototype.ngOnChanges = function (changes) {
        if (this.scenario !== undefined) {
            this.show = 'show';
        }
        if (this.scenario === 'editTemplate') {
            this.getTemplatesToEdit();
        }
        if (this.scenario === 'users') {
            this.getUsers();
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
    RightBarComponent.prototype.editCollection = function (collection) {
        this.template.collection = collection;
    };
    RightBarComponent.prototype.getCollections = function () {
        var _this = this;
        this.appService.getCollections().subscribe(function (collections) { return _this.documentCollections = collections; }, function (error) { return _this.errorMessage = error; });
    };
    RightBarComponent.prototype.bootstrapElements = function (elementsTypes) {
        for (var _i = 0, elementsTypes_1 = elementsTypes; _i < elementsTypes_1.length; _i++) {
            var type = elementsTypes_1[_i];
            this.elementsList.push(new template_1.Element(type));
        }
    };
    RightBarComponent.prototype.getElements = function () {
        var _this = this;
        this.appService.getElements().subscribe(function (elements) {
            _this.elementsTypes = elements,
                _this.bootstrapElements(elements);
        }, function (error) { return _this.errorMessage = error; });
    };
    RightBarComponent.prototype.getRoles = function () {
        var _this = this;
        this.appService.getRoles().subscribe(function (roles) { return _this.userRoles = roles; }, function (error) { return _this.errorMessage = error; });
    };
    RightBarComponent.prototype.saveTemplate = function () {
        var _this = this;
        this.appService.postTemplate(this.template).subscribe(function (response) {
            _this.response = response,
                _this.emitAddTemplate(),
                _this.resetTemplateForm(),
                _this.showAlerts('success', 'Template saved');
        }, function (error) {
            _this.errorMessage = error,
                _this.showAlerts('danger', 'Something went wrong');
        });
    };
    RightBarComponent.prototype.resetTemplateForm = function () {
        this.documentCollection = '';
        this.templateName = undefined;
        this.templateElements = [];
        this.templateDefault = false;
        this.template = new template_1.Template();
        this.chosenElement = new template_1.Element();
    };
    RightBarComponent.prototype.resetDocumentForm = function () {
        this.documentTitle = '';
    };
    RightBarComponent.prototype.showAlerts = function (type, message) {
        var _this = this;
        this.showAlert = true;
        this.alert = new helpers_1.Alert(type, message);
        setTimeout(function () {
            _this.hideAlert = true;
        }, 2000);
        setTimeout(function () {
            _this.showAlert = false;
            _this.hideAlert = false;
        }, 3000);
    };
    RightBarComponent.prototype.emitAddTemplate = function () {
        this.templateAdded = true;
        this.onAddTemplate.emit(this.templateAdded);
        this.template = new template_1.Template();
        this.onRefresh.emit(this.template);
    };
    RightBarComponent.prototype.emitDeleteTemplate = function () {
        this.templateDeleted = true;
        this.onDeleteTemplate.emit(this.templateDeleted);
        this.scenario = 'editTemplate';
        this.resetTemplateForm();
        this.onRefresh.emit(this.template);
    };
    RightBarComponent.prototype.emitEditTemplate = function () {
        this.templateEdited = true;
        this.onEditTemplate.emit(this.templateEdited);
        this.onRefresh.emit(this.template);
    };
    RightBarComponent.prototype.addDocument = function (title, template) {
        var _this = this;
        var doc = new document_1.Doc(title, template);
        this.appService.postDocument(doc).subscribe(function (response) {
            _this.response = response,
                _this.emitAddDocument(),
                _this.resetDocumentForm(),
                _this.showAlerts('success', 'Document saved');
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
                _this.emitEditDocument();
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
    RightBarComponent.prototype.emitEditDocument = function () {
        this.documentEdited = true;
        this.onEditDocument.emit(this.documentEdited);
    };
    RightBarComponent.prototype.getTemplatesToEdit = function () {
        var _this = this;
        this.appService.getTemplates().subscribe(function (templates) { return _this.templatesToEdit = templates; }, function (error) { return _this.errorMessage = error; });
    };
    RightBarComponent.prototype.refreshEditedTemplate = function (template) {
        this.template = new template_1.Template(template.name, template.elements, template.is_default, template.collection, template._id);
        this.onRefresh.emit(this.template);
    };
    RightBarComponent.prototype.goDeepEditTemplate = function (template) {
        this.scenario = 'editTemplateDeep';
        this.refreshEditedTemplate(template);
    };
    RightBarComponent.prototype.addEditElement = function (element) {
        var indexes = [];
        for (var _i = 0, _a = this.template.elements; _i < _a.length; _i++) {
            var i = _a[_i];
            indexes.push(i.index);
        }
        element.index = indexes.length > 0 ? Math.max.apply(null, indexes) + 1 : 0;
        var elementToPush = Object.assign({}, element);
        this.template.elements.push(elementToPush);
        this.refreshEditedTemplate(this.template);
    };
    RightBarComponent.prototype.removeEditElement = function (index) {
        for (var _i = 0, _a = this.template.elements; _i < _a.length; _i++) {
            var i = _a[_i];
            if (i.index === index) {
                this.template.elements.splice(this.template.elements.indexOf(i), 1);
                this.refreshEditedTemplate(this.template);
                return;
            }
        }
    };
    RightBarComponent.prototype.prevEditView = function () {
        this.resetTemplateForm();
        this.onRefresh.emit(this.template);
        this.scenario = 'editTemplate';
    };
    RightBarComponent.prototype.prevUsersView = function () {
        this.resetAddUserForm();
        this.scenario = 'users';
    };
    RightBarComponent.prototype.editTemplate = function () {
        var _this = this;
        this.appService.putTemplate(this.template).subscribe(function (response) {
            _this.response = response,
                _this.showAlerts('success', 'Template saved');
            _this.emitEditTemplate();
        }, function (error) {
            _this.errorMessage = error,
                _this.showAlerts('danger', 'Something went wrong');
        });
    };
    RightBarComponent.prototype.deleteTemplate = function (template) {
        var _this = this;
        this.appService.deleteTemplate(template).subscribe(function (response) {
            _this.response = response,
                _this.showAlerts('success', 'Template deleted'),
                _this.emitDeleteTemplate();
        }, function (error) {
            _this.errorMessage = error,
                _this.showAlerts('danger', 'Something went wrong');
        });
    };
    RightBarComponent.prototype.goDeepAddUser = function () {
        this.scenario = 'addUserDeep';
    };
    RightBarComponent.prototype.goDeepEditUser = function (user) {
        this.scenario = 'editUserDeep';
        this.user = new user_1.User(user.login, user.fname, user.lname, user.role, undefined, user._id);
    };
    RightBarComponent.prototype.choseRole = function (role) {
        this.userRole = role;
    };
    RightBarComponent.prototype.choseRoleEdit = function (role) {
        this.user.role = role;
    };
    RightBarComponent.prototype.resetAddUserForm = function () {
        this.userLogin = '';
        this.userFname = '';
        this.userLname = '';
        this.userRole = '';
        this.userPw = '';
        this.userPwCon = '';
    };
    RightBarComponent.prototype.addUser = function () {
        var _this = this;
        var user = new user_1.User(this.userLogin, this.userFname, this.userLname, this.userRole, this.userPw);
        this.appService.postUsers(user).subscribe(function (response) {
            _this.response = response,
                _this.getUsers(),
                _this.prevUsersView(),
                _this.showAlerts('success', 'User added');
        }, function (error) {
            _this.errorMessage = error,
                _this.showAlerts('danger', 'Something went wrong');
        });
    };
    RightBarComponent.prototype.getUsers = function () {
        var _this = this;
        this.appService.getUsers().subscribe(function (users) { return _this.users = users; }, function (error) { return _this.errorMessage = error; });
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
    ], RightBarComponent.prototype, "onDeleteTemplate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], RightBarComponent.prototype, "onEditTemplate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], RightBarComponent.prototype, "onAddDocument", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], RightBarComponent.prototype, "onDeleteDocument", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], RightBarComponent.prototype, "onEditDocument", void 0);
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