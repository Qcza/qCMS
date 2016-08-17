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
var RightBarComponent = (function () {
    function RightBarComponent() {
        this.show = 'default';
        this.elementsList = [
            { index: 0, type: 'text', value: null },
            { index: 1, type: 'picture', value: null }
        ];
        this.templateElements = [
            { index: 0, type: 'text', value: null }
        ];
        this.chosenElement = {
            index: 0,
            type: 'text',
            value: null
        };
    }
    RightBarComponent.prototype.ngOnChanges = function (changes) {
        if (this.scenario != null) {
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
        this.templateElements.push(element);
    };
    RightBarComponent.prototype.removeElement = function (index) {
        for (var _i = 0, _a = this.templateElements; _i < _a.length; _i++) {
            var i = _a[_i];
            if (i.index === index) {
                this.templateElements.splice(this.templateElements.indexOf(i), 1);
                return;
            }
        }
    };
    RightBarComponent.prototype.choseElement = function (element) {
        this.chosenElement = element;
    };
    RightBarComponent.prototype.saveTemplate = function () {
        var template = new template_1.Template(this.templateName, this.templateElements);
        console.log(template);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], RightBarComponent.prototype, "scenario", void 0);
    RightBarComponent = __decorate([
        core_1.Component({
            selector: 'right-bar',
            templateUrl: 'app/templates/rightbar.component.html',
            styleUrls: ['app/styles/rightbar.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], RightBarComponent);
    return RightBarComponent;
}());
exports.RightBarComponent = RightBarComponent;
//# sourceMappingURL=rightbar.component.js.map