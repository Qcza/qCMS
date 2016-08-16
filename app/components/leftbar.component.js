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
var LeftBarComponent = (function () {
    function LeftBarComponent() {
        this.brand = '@qCMS';
        this.extend = null;
        this.scenario = null;
        this.active = null;
        this.adminElements = [
            { name: 'New template', icon: 'log-in' },
            { name: 'Edit template', icon: 'edit' },
            { name: 'New user', icon: 'user' },
            { name: 'Preferences', icon: 'cutlery' },
            { name: 'Account', icon: 'briefcase' }
        ];
        this.newDocumentElements = [
            'New document'
        ];
        this.inboxElements = [];
    }
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
    LeftBarComponent = __decorate([
        core_1.Component({
            selector: 'left-bar',
            templateUrl: 'app/templates/leftbar.component.html',
            styleUrls: ['app/styles/leftbar.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], LeftBarComponent);
    return LeftBarComponent;
}());
exports.LeftBarComponent = LeftBarComponent;
//# sourceMappingURL=leftbar.component.js.map