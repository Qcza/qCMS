import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Template, ElementInterface } from '../models/template';
import { Alert } from '../models/helpers';
import { AppService } from '../services/app.service';

@Component({
    selector: 'right-bar',
    providers: [AppService],
    templateUrl: 'app/templates/rightbar.component.html',
    styleUrls: ['app/styles/rightbar.component.css']
})

export class RightBarComponent implements OnChanges {

  constructor (private appService: AppService) {  } 

  show:string = 'default';
  @Input() scenario:string;
  errorMessage:any;
  response:any;
  showAlert:boolean;
  hideAlert:boolean;
  alert:Alert;

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
    {index: 0, title: '', type: 'header', value: '', icon: 'header'},
    {index: 1, title: '', type: 'text', value: '', icon: 'file-text-o'},
    {index: 2, title: '', type: 'picture', value: '', icon: 'picture-o'},
  ]

  template:Template;
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

  chosenElement:ElementInterface = {
    title: '',
    index: 0,
    type: 'header',
    value: '',
    icon: 'header'
  }
  choseElement(element:ElementInterface):void {
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