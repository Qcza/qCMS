import { Component } from '@angular/core';
import { LeftBarComponent } from './leftbar.component';
import { RightBarComponent } from './rightbar.component';
import { Template, Element } from '../models/template';
import { Doc } from '../models/document';

@Component({
  selector: 'main-app',
  templateUrl: 'app/templates/app.component.html',
  styleUrls: ['app/styles/app.component.css'],
  directives: [LeftBarComponent, RightBarComponent]
})

export class AppComponent { 
  scenario:string;
  template:Template;
  templateAdded:boolean;
  documentAdded:boolean;
  documentDeleted:boolean;
  document:Doc;

  //ToDo DefaultTemplate
  // defaultTemplateName:string = 'Default';
  // defaultElement:Element = new Element();
  // defaultTemplateElements:Array<Element> = [ this.defaultElement ];

  constructor () {
    this.template = new Template();
  }

  onSelectScenario(scenario:string):void {
    this.scenario = scenario;
  }

  onSelectTemplate(template:Template):void {
    this.template = template;
  }

  onSelectDocument(document:Doc):void {
    this.document = document;
    this.template = document.template;
  }

  onRefresh(template:Template):void {
    this.template = template;
  }

  onAddTemplate(templateAdded:boolean):void {
    this.templateAdded = templateAdded;
    setTimeout(
      () => this.templateAdded = undefined, 500
    )
  }

  onAddDocument(documentAdded:boolean):void {
    this.documentAdded = documentAdded;
    setTimeout(
      () => this.documentAdded = undefined, 500
    )
  }

  onDeleteDocument(documentDeleted:boolean):void {
    this.documentDeleted = documentDeleted;
    setTimeout(
      () => this.documentDeleted = undefined, 500
    )
  }
}