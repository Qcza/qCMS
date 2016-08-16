"use strict";
var Element = (function () {
    function Element(name, type) {
        this.name = name;
        this.type = type;
    }
    return Element;
}());
exports.Element = Element;
var Template = (function () {
    function Template(name, elements) {
        this.name = name;
        this.elements = elements;
    }
    return Template;
}());
exports.Template = Template;
//# sourceMappingURL=models.js.map