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
var leftbar_component_1 = require('./leftbar.component');
var rightbar_component_1 = require('./rightbar.component');
var template_1 = require('../models/template');
var AppComponent = (function () {
    function AppComponent() {
        this.defaultTemplateName = 'Default';
        this.defaultTemplateElements = [{
                index: 0,
                title: 'Text',
                type: 'text',
                value: '',
                icon: 'file-text-o'
            }];
        this.template = new template_1.Template(this.defaultTemplateName, this.defaultTemplateElements);
    }
    AppComponent.prototype.onSelect = function (scenario) {
        this.scenario = scenario;
    };
    AppComponent.prototype.onRefresh = function (template) {
        this.template = template;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'main-app',
            templateUrl: 'app/templates/app.component.html',
            styleUrls: ['app/styles/app.component.css'],
            directives: [leftbar_component_1.LeftBarComponent, rightbar_component_1.RightBarComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map