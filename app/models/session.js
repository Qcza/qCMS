"use strict";
var Session = (function () {
    function Session(user, sessionId, createdAt) {
        this.user = user;
        if (createdAt) {
            this.createdAt = createdAt;
        }
        else {
            this.createdAt = new Date();
        }
        if (sessionId) {
            this.sessionId = sessionId;
        }
        else {
            this.sessionId = (Math.random() + 1).toString(36).substring(8) + (new Date()).valueOf().toString();
        }
    }
    return Session;
}());
exports.Session = Session;
//# sourceMappingURL=session.js.map