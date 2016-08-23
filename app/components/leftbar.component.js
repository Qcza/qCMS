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
var _this = this;
var core_1 = require('@angular/core');
var app_service_1 = require('../services/app.service');
var template_1 = require('../models/template');
var document_1 = require('../models/document');
var LeftBarComponent = (function () {
    function LeftBarComponent() {
        this.brand = '@qCMS';
        this.extend = null;
        this.scenario = null;
        this.active = null;
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], LeftBarComponent.prototype, "templateAdded", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], LeftBarComponent.prototype, "documentAdded", void 0);
    LeftBarComponent = __decorate([
        core_1.Component({
            selector: 'left-bar',
            providers: [app_service_1.AppService],
            templateUrl: 'app/templates/leftbar.component.html',
            styleUrls: ['app/styles/leftbar.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], LeftBarComponent);
    return LeftBarComponent;
}());
exports.LeftBarComponent = LeftBarComponent;
constructor(private, appService, app_service_1.AppService);
{ }
ngOnInit();
{
    this.getDocuments();
    this.getTemplates();
}
ngOnChanges(changes, SimpleChanges);
{
    if (this.templateAdded === true) {
        this.getTemplates();
    }
    if (this.documentAdded === true) {
        this.getDocuments();
    }
}
onSelectScenario = new core_1.EventEmitter();
selectRightBarScenario(scenario, string);
void {
    this: .onSelectScenario.emit(scenario)
};
setScenario(scenario, string);
void {
    this: .scenario = scenario,
    this: .active = scenario,
    this: .openSelected(scenario)
};
extendBar(scenario, string);
void {
    if: function () { }, this: .extend === 'show' && this.scenario === scenario };
{
    this.extend = 'hide';
    this.active = null;
}
{
    this.extend = 'show';
    this.setScenario(scenario);
}
getTemplates();
void {
    this: .appService.getTemplates().subscribe(function (templates) { return _this.templates = templates; }, function (error) { return _this.errMessage = error; })
};
onSelectTemplate = new core_1.EventEmitter();
selectTemplate(template, template_1.Template);
void {
    template: .is_selected = true,
    for: function (let, of) {
        if (let === void 0) { let = temp; }
        if (of === void 0) { of = this.templates; }
        if (temp._id !== template._id && temp.is_selected === true) {
            temp.is_selected = false;
        }
    },
    let: selectedTemplate = new template_1.Template(template.name, template.elements, template.is_default),
    this: .onSelectTemplate.emit(selectedTemplate)
};
newTemplate();
void {
    let: newTemplate = new template_1.Template(),
    this: .onSelectTemplate.emit(newTemplate)
};
getDocuments();
void {
    this: .appService.getDocuments().subscribe(function (documents) { return _this.documents = documents; }, function (error) { return _this.errMessage = error; })
};
onSelectDocument = new core_1.EventEmitter();
selectDocument(document, document_1.Doc);
{
    document.is_selected = true;
    for (var _i = 0, _a = this.documents; _i < _a.length; _i++) {
        var doc = _a[_i];
        if (doc._id !== document._id && doc.is_selected === true) {
            doc.is_selected = false;
        }
    }
    var selectedDocument = new document_1.Doc(document.title, document.template, document._id);
    this.onSelectDocument.emit(selectedDocument);
}
openSelected(scenario, string);
void {
    if: function (scenario) {
        if (scenario === void 0) { scenario =  === 'all'; }
        for (var _i = 0, _a = this.documents; _i < _a.length; _i++) {
            var document_2 = _a[_i];
            if (document_2.is_selected === true) {
                var selectedDocument = new document_1.Doc(document_2.title, document_2.template, document_2._id);
                this.onSelectDocument.emit(selectedDocument);
                this.selectRightBarScenario('editDocument');
                break;
            }
        }
    }, else: , if: function (scenario) {
        if (scenario === void 0) { scenario =  === 'new'; }
        for (var _i = 0, _a = this.templates; _i < _a.length; _i++) {
            var template = _a[_i];
            if (template.is_selected === true) {
                var selectedTemplate = new template_1.Template(template.name, template.elements, template.is_default);
                this.onSelectTemplate.emit(selectedTemplate);
                this.selectRightBarScenario('useTemplate');
                break;
            }
        }
    }
};
//# sourceMappingURL=leftbar.component.js.map