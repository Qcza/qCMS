import { Component, Output, Input, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { AppService } from '../services/app.service';
import { Template } from '../models/template';
import { Doc } from '../models/document';
import { SettingMenuInterface } from '../models/helpers';

@Component({
  selector: 'left-bar',
  providers: [AppService],
  templateUrl: 'app/templates/leftbar.component.html',
  styleUrls: ['app/styles/leftbar.component.css']
})

export class LeftBarComponent implements OnInit, OnChanges { 
  brand:string = '@qCMS';
  extend:string = null;
  scenario:string = null;
  active:string = null;
  templates:Array<Template>;
  documents:Array<Doc>;
  errMessage:any;
  @Input() templateAdded:boolean;
  @Input() documentAdded:boolean;

  settingMenu:ArraySettingMenuInterface
  }


  constructor (private appService:AppService) {}

  ngOnInit() {
    this.getDocuments();
    this.getTemplates();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.templateAdded === true) {
      this.getTemplates();
    }
    if (this.documentAdded === true) {
      this.getDocuments();
    }
  }

  @Output() onSelectScenario = new EventEmitter<string>();
  selectRightBarScenario(scenario:string):void {
    this.onSelectScenario.emit(scenario);
  }

  setScenario(scenario:string):void {
    this.scenario = scenario;
    this.active = scenario;
    this.openSelected(scenario);
  }

  extendBar(scenario:string):void {
    if (this.extend === 'show' && this.scenario === scenario) {
      this.extend = 'hide';
      this.active = null;
    } else {
      this.extend = 'show';
      this.setScenario(scenario);
    }
  }

  getTemplates():void {
    this.appService.getTemplates().subscribe(
      templates => this.templates = templates,
      error => this.errMessage = error
    );
  }

  @Output() onSelectTemplate = new EventEmitter<Template>();
  selectTemplate(template:Template):void {
    template.is_selected = true;
    for (let temp of this.templates) {
      if (temp._id !== template._id && temp.is_selected === true) {
        temp.is_selected = false;
      }
    }
    let selectedTemplate = new Template(template.name, template.elements, template.is_default);
    this.onSelectTemplate.emit(selectedTemplate);
  }

  newTemplate():void {
    let newTemplate = new Template();
    this.onSelectTemplate.emit(newTemplate);
  }

  getDocuments():void {
    this.appService.getDocuments().subscribe(
      documents => this.documents = documents,
      error => this.errMessage = error
    );
  }

  @Output() onSelectDocument = new EventEmitter<Doc>();
  selectDocument(document:Doc) {
    document.is_selected = true;
    for (let doc of this.documents) {
      if (doc._id !== document._id && doc.is_selected === true) {
        doc.is_selected = false;
      }
    }
    let selectedDocument = new Doc(document.title, document.template, document._id);
    this.onSelectDocument.emit(selectedDocument);
  }

   openSelected(scenario:string):void {
    if (scenario === 'all') {
      for (let document of this.documents) {
        if (document.is_selected === true) {
          let selectedDocument = new Doc(document.title, document.template, document._id);
          this.onSelectDocument.emit(selectedDocument);
          this.selectRightBarScenario('editDocument');
          break;
        }   
      }
    } else if (scenario === 'new') {
      for (let template of this.templates) {
        if (template.is_selected === true) {
          let selectedTemplate = new Template(template.name, template.elements, template.is_default);
          this.onSelectTemplate.emit(selectedTemplate);
          this.selectRightBarScenario('useTemplate');
          break
        }
      }
    }
  }
}