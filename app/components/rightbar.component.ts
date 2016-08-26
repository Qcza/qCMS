import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter, OnInit } from '@angular/core';
import { Template, Element } from '../models/template';
import { Doc } from '../models/document';
import { Alert } from '../models/helpers';
import { AppService } from '../services/app.service';

@Component({
    selector: 'right-bar',
    providers: [AppService],
    templateUrl: 'app/templates/rightbar.component.html',
    styleUrls: ['app/styles/rightbar.component.css']
})

export class RightBarComponent implements OnChanges, OnInit {

  show:string = 'default';
  @Input() scenario:string;
  @Input() template:Template;
  @Input() document:Doc;
  errorMessage:any;
  response:any;
  showAlert:boolean;
  hideAlert:boolean;
  alert:Alert;
  elementsTypes:Array<string>;
  elementsList:Array<Element> = [];
  chosenElement:Element = new Element();
  templateAdded:boolean;
  templateDeleted:boolean;
  templateEdited:boolean;
  documentTitle:string = '';
  documentAdded:boolean;
  documentDeleted:boolean;
  documentEdited:boolean;
  documentCollections:Array<string>;
  documentCollection:string = '';
  templateName:string;
  templateElements:Array<Element> = [];
  templateDefault:boolean = false;
  errMessage:any;
  templatesToEdit:Array<Template> = [];

  constructor (private appService: AppService) { } 

   ngOnInit() {
     this.getCollections();
     this.getElements();
   }

  ngOnChanges(changes: SimpleChanges) {
    if (this.scenario !== undefined) {
      this.show = 'show';
    }
    if (this.scenario === 'editTemplate') {
      this.getTemplatesToEdit();
    }
  }

  showBar():void {
    if (this.show === 'default' || this.show == 'hide') {
      this.show = 'show';
    } else if (this.show === 'show') {
      this.show = 'hide';
    }
  }

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

  @Output() onRefresh = new EventEmitter<Template>();
  refreshTemplate() {
    this.template = new Template(this.templateName, this.templateElements, this.templateDefault, this.documentCollection);
    this.onRefresh.emit(this.template);
  }

  choseElement(element:Element):void {
    this.chosenElement = Object.assign({}, element);
  }

  choseCollection(collection:string):void {
    this.documentCollection = collection;
  }

  editCollection(collection:string):void {
    this.template.collection = collection;
  }


  getCollections():void {
    this.appService.getCollections().subscribe(
      collections => this.documentCollections = collections,
      error => this.errMessage = error
    );
  }

  bootstrapElements (elementsTypes:Array<string>):void {
    for (let type of elementsTypes) {
      this.elementsList.push(new Element(type))
    }
  }

  getElements():void {
    this.appService.getElements().subscribe(
      elements => {
        this.elementsTypes = elements,
        this.bootstrapElements(elements)
    },
      error => this.errMessage = error
    );
  }

  saveTemplate():void {
    this.appService.postTemplate(this.template).subscribe(
      response => {
        this.response = response,
        this.emitAddTemplate(),
        this.resetTemplateForm(),
        this.showAlerts('success', 'Template saved')
      },
      error => {
        this.errorMessage = <any>error,
        this.showAlerts('danger', 'Something went wrong')
      }
    );
  }

  resetTemplateForm():void {
    this.documentCollection = '';
    this.templateName = undefined;
    this.templateElements = [];
    this.templateDefault = false;
    this.template = new Template();
    this.chosenElement = new Element();
  }

  resetDocumentForm():void {
     this.documentTitle = '';
  }

  showAlerts(type:string, message:string):void {
    this.showAlert = true;
    this.alert = new Alert(type, message);
    setTimeout(() => {
      this.hideAlert = true;
    }, 2000);
    setTimeout(() => {
      this.showAlert = false;
      this.hideAlert = false;
    }, 3000);
  }

  @Output() onAddTemplate = new EventEmitter<boolean>();
  emitAddTemplate() {
    this.templateAdded = true;
    this.onAddTemplate.emit(this.templateAdded);
    this.template = new Template();
    this.onRefresh.emit(this.template);
  }

  @Output() onDeleteTemplate = new EventEmitter<boolean>();
  emitDeleteTemplate() {
    this.templateDeleted = true;
    this.onDeleteTemplate.emit(this.templateDeleted);
    this.scenario = 'editTemplate';
    this.resetTemplateForm();
    this.onRefresh.emit(this.template);
  }

  @Output() onEditTemplate = new EventEmitter<boolean>();
  emitEditTemplate() {
    this.templateEdited = true;
    this.onEditTemplate.emit(this.templateEdited);
    this.onRefresh.emit(this.template);
  }

  addDocument(title:string, template:Template):void {
    let doc = new Doc(title, template);
    this.appService.postDocument(doc).subscribe(
      response => {
        this.response = response,
        this.emitAddDocument(),
        this.resetDocumentForm(),
        this.showAlerts('success', 'Document saved')
      },
      error => {
        this.errorMessage = <any>error,
        this.showAlerts('danger', 'Something went wrong')
      }
    );
  }

  editDocument(document:Doc):void {
    this.appService.putDocument(document).subscribe(
      response => {
        this.response = response,
        this.showAlerts('success', 'Document saved'),
        this.emitEditDocument()
      },
      error => {
        this.errorMessage = <any>error,
        this.showAlerts('danger', 'Something went wrong')
      }
    );
  }

  deleteDocument(document:Doc):void {
    this.appService.deleteDocument(document).subscribe(
      response => {
        this.response = response,
        this.showAlerts('success', 'Document deleted'),
        this.emitDeleteDocument()
      },
      error => {
        this.errorMessage = <any>error,
        this.showAlerts('danger', 'Something went wrong')
      }
    );
  }

  @Output() onAddDocument = new EventEmitter<boolean>();
  emitAddDocument() {
    this.documentAdded = true;
    this.onAddDocument.emit(this.documentAdded);
  }
  @Output() onDeleteDocument = new EventEmitter<boolean>();
  emitDeleteDocument() {
    this.documentDeleted = true;
    this.onDeleteDocument.emit(this.documentDeleted);
  }
  @Output() onEditDocument = new EventEmitter<boolean>();
  emitEditDocument() {
    this.documentEdited = true;
    this.onEditDocument.emit(this.documentEdited);
  }

  getTemplatesToEdit():void {
    this.appService.getTemplates().subscribe(
      templates => this.templatesToEdit = templates,
      error => this.errMessage = error
    );
  }

  refreshEditedTemplate(template:Template) {
    this.template = new Template(template.name, template.elements, template.is_default, template.collection, template._id);
    this.onRefresh.emit(this.template);
  }

  goDeep(template:Template):void {
    this.scenario = 'editTemplateDeep';
    this.refreshEditedTemplate(template);
  }

  addEditElement(element:Element):void {
    let indexes:Array<number> = [];
    for (let i of this.template.elements) {
      indexes.push(i.index);
    }
    element.index = indexes.length > 0 ? Math.max.apply(null, indexes) +1 : 0;
    let elementToPush:Element = Object.assign({}, element);
    this.template.elements.push(elementToPush);

    this.refreshEditedTemplate(this.template);
  }

  removeEditElement(index:number):void {
    for (let i of this.template.elements) {
      if (i.index === index) {
        this.template.elements.splice(this.template.elements.indexOf(i), 1);
        this.refreshEditedTemplate(this.template);
        return
      }
    }
  }

  prevEditView():void {
    this.resetTemplateForm();
    this.onRefresh.emit(this.template);
    this.scenario = 'editTemplate';
  }

  editTemplate():void {
    this.appService.putTemplate(this.template).subscribe(
      response => {
        this.response = response,
        this.showAlerts('success', 'Template saved')
        this.emitEditTemplate();
      },
      error => {
        this.errorMessage = <any>error,
        this.showAlerts('danger', 'Something went wrong')
      }
    );
  }

  deleteTemplate(template:Template):void {
    this.appService.deleteTemplate(template).subscribe(
      response => {
        this.response = response,
        this.showAlerts('success', 'Template deleted'),
        this.emitDeleteTemplate()
      },
      error => {
        this.errorMessage = <any>error,
        this.showAlerts('danger', 'Something went wrong')
      }
    );
  }
}