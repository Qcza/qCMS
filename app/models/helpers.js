"use strict";
var Alert = (function () {
    function Alert(type, message, dismissible) {
        if (type === void 0) { type = 'warning'; }
        if (dismissible === void 0) { dismissible = false; }
        this.type = type;
        this.message = message;
        this.dismissible = dismissible;
    }
    return Alert;
}());
exports.Alert = Alert;
//# sourceMappingURL=helpers.js.map