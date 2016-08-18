export interface ElementInterface {
  index:number;
  title: string;
  type:string;
  value:any;
}

export interface TemplateInterface {
  name:string;
  elements:Array<ElementInterface>;
  is_default:boolean;
}

export class Template implements TemplateInterface {
  name:string;
  elements:Array<ElementInterface>;
  is_default:boolean;

  constructor (name:string, elements:Array<ElementInterface>, is_default:boolean = false) {
    this.name = name;
    this.elements = elements;
    this.is_default = is_default;
  }
}