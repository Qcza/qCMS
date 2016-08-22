import { Template } from './template'

interface DocInterface {
  _id:string;
  date:Date;
  title:string;
  template:Template;
  is_selected:boolean;
}

export class Doc implements DocInterface {
  _id:string;
  date:Date;
  title:string;
  template:Template;
  is_selected:boolean;

  constructor (title:string, template:Template, id:string = null) {
    if (id) this._id = id;
    this.date = new Date();
    this.title = title;
    this.template = template;
  }
}