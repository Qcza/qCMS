export interface TemplateElementInterface {
  name: string;
  type: string;
}

export interface TemplateInterface {
  name: string;
  elements: Array<TemplateElementInterface>;
}

export class Element implements TemplateElementInterface {
  id:number;
  name: string;
  type: string;

  constructor (name:string, type:string) {
    this.name = name;
    this.type = type;
  }
}

export class Template implements TemplateInterface {
  name:string;
  elements: Array<TemplateElementInterface>;

  constructor (name:string, elements:Array<TemplateElementInterface>) {
    this.name = name;
    this.elements = elements;
  }
}