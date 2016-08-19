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
var LeftBarComponent = (function () {
    function LeftBarComponent(appService) {
        this.appService = appService;
        this.brand = '@qCMS';
        this.extend = null;
        this.scenario = null;
        this.active = null;
        this.onSelect = new core_1.EventEmitter();
    }
    LeftBarComponent.prototype.ngOnInit = function () {
        this.getTemplates();
    };
    LeftBarComponent.prototype.ngOnChanges = function (changes) {
        if (this.templateAdded === true) {
            this.getTemplates();
        }
    };
    LeftBarComponent.prototype.selectSettingScenario = function (scenario) {
        this.onSelect.emit(scenario);
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
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], LeftBarComponent.prototype, "templateAdded", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], LeftBarComponent.prototype, "onSelect", void 0);
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