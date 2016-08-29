export interface UserInterface {
  _id:string;
  fname:string;
  lname:string;
  imgurl:string;
  role:string;
  pw:string;
}

export class User implements UserInterface {
  _id:string;
  fname:string;
  lname:string;
  imgurl:string; // ToDo
  role:string;
  pw:string;

  constructor (fname, lname, role = 'user', pw?, id?) {
    if (id) this._id = id;
    this.fname = fname;
    this.lname = lname;
    this.role = role;
    if (pw) this.pw = pw;
  }
}