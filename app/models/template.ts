
export interface ElementInterface {
  index:number;
  title: string;
  type:string;
  value:any;
  icon:string; //font-awesome icon
  setIcon(type:string):string;
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
    else if (type === 'header') {
      return 'header';
    }
    else {
      return  'question';
    }
  }
}

export interface TemplateInterface {
  _id:string;
  name:string;
  collection:string;
  elements:Array<Element>;
  is_default:boolean;
  is_selected:boolean;
}

export class Template implements TemplateInterface {
  _id:string;
  name:string;
  collection:string;
  elements:Array<Element>;
  is_default:boolean;
  is_selected:boolean;

  constructor (name:string = '', elements:Array<Element> = [], is_default:boolean = false, collection:string = 'article') {
    this.name = name;
    this.elements = elements;
    this.collection = collection;
    this.is_default = is_default;
  }
}