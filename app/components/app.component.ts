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
  templateDeleted:boolean;
  templateEdited:boolean;
  documentAdded:boolean;
  documentDeleted:boolean;
  documentEdited:boolean;
  document:Doc;

  constructor () {
    this.template = new Template();
  }

  onSelectScenario(scenario:string):void {
    this.scenario = scenario;
  }

  onSelectTemplate(template:Template):void {
    this.template =  template
  }

  onResetTemplate(resetTemplate:boolean):void {
    if (resetTemplate === true) {
      
    }
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

  onDeleteTemplate(templateDeleted:boolean):void {
    this.templateDeleted = templateDeleted;
    setTimeout(
      () => this.templateDeleted = undefined, 500
    )
  }

  onEditTemplate(templateEdited:boolean):void {
    this.templateEdited = templateEdited;
    setTimeout(
      () => this.templateEdited = undefined, 500
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

  onEditDocument(documentEdited:boolean):void {
    this.documentEdited = documentEdited;
    setTimeout(
      () => this.documentEdited = undefined, 500
    )
  }
}