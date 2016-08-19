import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Template, Element } from '../models/template';
import { Alert } from '../models/helpers';
import { AppService } from '../services/app.service';

@Component({
    selector: 'right-bar',
    providers: [AppService],
    templateUrl: 'app/templates/rightbar.component.html',
    styleUrls: ['app/styles/rightbar.component.css']
})

export class RightBarComponent implements OnChanges {

  show:string = 'default';
  @Input() scenario:string;
  errorMessage:any;
  response:any;
  showAlert:boolean;
  hideAlert:boolean;
  alert:Alert;
  elementsTypes:Array<string> = ['header', 'text', 'picture'];
  elementsList:Array<Element> = [];

  constructor (private appService: AppService) { 
      this.bootstrapElements()
   } 

  bootstrapElements():void {
    for (let type of this.elementsTypes) {
      console.log(type)
      let element = new Element(type);
      console.log(element)
      this.elementsList.push(element);
    }
  }

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

  template:Template;
  templateName:string;
  templateElements:Array<Element> = [];

  addElement(element:Element):void {
    let indexes:Array<number> = [];
    for (let i of this.templateElements) {
      indexes.push(i.index);
    }
    element.index = indexes.length > 0 ? Math.max.apply(null, indexes) +1 : 0;
    let elementToPush:Element = Object.assign({}, element);
    this.templateElements.push(elementToPush);

    this.refreshTemplate();
  }

  removeElement(index:number):void {
    for (let i of this.templateElements) {
      if (i.index === index) {
        this.templateElements.splice(this.templateElements.indexOf(i), 1);
        this.refreshTemplate();
        return
      }
    }
  }

  @Output() onRefresh = new EventEmitter<Template>()
  refreshTemplate() {
    this.template = new Template(this.templateName, this.templateElements);
    this.onRefresh.emit(this.template);
  }

  chosenElement:Element = new Element();
  choseElement(element:Element):void {
    this.chosenElement = element;
  }

  saveTemplate():void {
    this.appService.pushTemplate(this.template).subscribe(
      response => {
        this.response = response,
        this.resetNewTemplateForm(response)
        this.showAlerts('success', 'Template saved')
      },
      error => {
        this.errorMessage = <any>error,
        this.showAlerts('danger', 'Something went wrong')
      }
    );
  }

  resetNewTemplateForm(response:string):void {
    if (this.response === 'success') {
      this.templateName = '';
      this.templateElements = [];
      this.chosenElement.title = '';
    }
  }

  showAlerts(type:string, message:string):void {
    this.showAlert = true;
    this.alert = new Alert(type, message)
    setTimeout(() => {
      this.hideAlert = true;
    }, 6000);
    setTimeout(() => {
      this.showAlert = false;
    }, 12000);
  }
}