import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Template, ElementInterface } from '../models/template';

@Component({
    selector: 'right-bar',
    templateUrl: 'app/templates/rightbar.component.html',
    styleUrls: ['app/styles/rightbar.component.css']
})

export class RightBarComponent implements OnChanges { 

  show:string = 'default';
  @Input() scenario:string;

  ngOnChanges(changes: SimpleChanges) {
    if (this.scenario != null) {
      this.show = 'show';
    }
  }

  showBar():void {
    if (this.show === 'default' || this.show == 'hide') {
      this.show = 'show';
    } else if (this.show === 'show') {
      this.show = 'hide';
    }
  }

  elementsList:Array<ElementInterface> = [
    {index: 0, title: '', type: 'header', value: null},
    {index: 1, title: '', type: 'text', value: null},
    {index: 2, title: '', type: 'picture', value: null},
  ]

  templateName:string;
  templateElements:Array<ElementInterface> = [];

  addElement(element:ElementInterface):void {
    let indexes:Array<number> = [];
    for (let i of this.templateElements) {
      indexes.push(i.index);
    }
    element.index = indexes.length > 0 ? Math.max.apply(null, indexes) +1 : 0;
    let elementToPush:ElementInterface = Object.assign({}, element);
    this.templateElements.push(elementToPush);
  }

  removeElement(index:number):void {
    for (let i of this.templateElements) {
      if (i.index === index) {
        this.templateElements.splice(this.templateElements.indexOf(i), 1);
        return
      }
    }
  }

  chosenElement:ElementInterface = {
    title: '',
    index: 0,
    type: 'text',
    value: null
  }
  choseElement(element:ElementInterface):void {
    this.chosenElement = element;
  }

  saveTemplate() {
    let template = new Template(this.templateName, this.templateElements)
    console.log(template)
  }

 }