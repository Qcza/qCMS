import { Template } from './template'

interface DocInterface {
  _id:string;
  date:Date;
  title:string;
  template:Template;
  is_selected:boolean;
  images:Array<string>;
  attachments:Array<Object>;
}

export class Doc implements DocInterface {
  _id:string;
  date:Date;
  title:string;
  template:Template;
  is_selected:boolean;
  images:Array<string>;
  attachments:Array<Object>;

  constructor (title:string, template:Template, id?:string, images?:Array<string>, attachments?:Array<Object>) {
    if (id) this._id = id;
    this.date = new Date();
    this.title = title;
    this.template = template;
    if (images) this.images = images;
    if (attachments) this.attachments = attachments;
  }
}