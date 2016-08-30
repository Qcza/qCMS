export interface UserInterface {
  _id:string;
  login:string;
  fname:string;
  lname:string;
  imgurl:string;
  role:string;
  pw:string;
}

export class User implements UserInterface {
  _id:string;
  login:string;
  fname:string;
  lname:string;
  imgurl:string;
  role:string;
  pw:string;

  constructor (login, fname, lname, role = 'user', pw?, id?) {
    this.login = login;
    this.fname = fname;
    this.lname = lname;
    this.role = role;
    if (id) this._id = id;
    if (pw) this.pw = pw;
  }
}