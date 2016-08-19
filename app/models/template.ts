export interface ElementInterface {
  index:number;
  title: string;
  type:string;
  value:any;
  icon:string; //font-awesome icon
}

export class Element implements ElementInterface {
  index:number;
  title:string;
  type:string;
  value:any;
  icon:string;

  constructor (type:string = 'text', index:number = 0, title:string = '', value:any = '', icon:string = 'file-text-o') {
    this.index = index;
    this.title = title;
    this.type = type;
    this.value = value;
    this.icon = this.setIcon(type);
  }

  setIcon (type:string):string {
    if (type === 'text') {
      return 'file-text-o';
    }
    if (type === 'picture') {
      return 'picture-o';
    }
    if (type === 'header') {
      return 'header';
    }
  }
}

export interface TemplateInterface {
  name:string;
  elements:Array<Element>;
  is_default:boolean;
}

export class Template implements TemplateInterface {
  name:string;
  elements:Array<Element>;
  is_default:boolean;

  constructor (name:string, elements:Array<Element>, is_default:boolean = false) {
    this.name = name;
    this.elements = elements;
    this.is_default = is_default;
  }
}