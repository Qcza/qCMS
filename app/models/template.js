"use strict";
var Element = (function () {
    function Element(type, index, title, value, icon) {
        if (type === void 0) { type = 'text'; }
        if (index === void 0) { index = 0; }
        if (title === void 0) { title = ''; }
        if (value === void 0) { value = ''; }
        if (icon === void 0) { icon = 'file-text-o'; }
        this.index = index;
        this.title = title;
        this.type = type;
        this.value = value;
        this.icon = this.setIcon(type);
    }
    Element.prototype.setIcon = function (type) {
        if (type === 'text') {
            return 'file-text-o';
        }
        else if (type === 'header') {
            return 'header';
        }
        else {
            return 'question';
        }
    };
    return Element;
}());
exports.Element = Element;
var Template = (function () {
    function Template(name, elements, is_default, collection, id) {
        if (name === void 0) { name = ''; }
        if (elements === void 0) { elements = []; }
        if (is_default === void 0) { is_default = false; }
        if (collection === void 0) { collection = 'article'; }
        this.name = name;
        this.elements = elements;
        this.collection = collection;
        this.is_default = is_default;
        if (id)
            this._id = id;
    }
    return Template;
}());
exports.Template = Template;
//# sourceMappingURL=template.js.map