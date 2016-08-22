"use strict";
var Doc = (function () {
    function Doc(title, template, id) {
        if (id === void 0) { id = null; }
        if (id)
            this._id = id;
        this.date = new Date();
        this.title = title;
        this.template = template;
    }
    return Doc;
}());
exports.Doc = Doc;
//# sourceMappingURL=document.js.map