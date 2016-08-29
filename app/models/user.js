"use strict";
var User = (function () {
    function User(fname, lname, role, pw, id) {
        if (role === void 0) { role = 'user'; }
        if (id)
            this._id = id;
        this.fname = fname;
        this.lname = lname;
        this.role = role;
        if (pw)
            this.pw = pw;
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map