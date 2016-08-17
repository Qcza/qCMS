"use strict";
var Template = (function () {
    function Template(name, elements, is_default) {
        if (is_default === void 0) { is_default = false; }
        this.name = name;
        this.elements = elements;
        this.is_default = is_default;
    }
    return Template;
}());
exports.Template = Template;
//# sourceMappingURL=template.js.map