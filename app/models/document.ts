import { Template } from './template'

interface DocInterface {
  name:string;
  template:Template;
}

export class Doc implements DocInterface {
  name:string;
  template:Template;

  constructor (name:string, template:Template) {
    this.name = name;
    this.template = template;
  }
}