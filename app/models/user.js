"use strict";
var User = (function () {
    function User(login, fname, lname, role, pw, id) {
        if (role === void 0) { role = 'user'; }
        this.login = login;
        this.fname = fname;
        this.lname = lname;
        this.role = role;
        if (id)
            this._id = id;
        if (pw)
            this.pw = pw;
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map