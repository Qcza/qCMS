import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter, OnInit } from '@angular/core';
import { Template, Element } from '../models/template';
import { Doc } from '../models/document';
import { User, UserInterface } from '../models/user';
import { Alert } from '../models/helpers';
import { AppService } from '../services/app.service';

import { publicImgsPath, publicFilesPath } from '../main';


@Component({
    selector: 'right-bar',
    providers: [AppService],
    templateUrl: 'app/templates/rightbar.component.html',
    styleUrls: ['app/styles/rightbar.component.css']
})

export class RightBarComponent implements OnChanges, OnInit {

  imgPath = publicImgsPath;
  filesPath = publicFilesPath; 

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

  // DOCUMENTS
  documentTitle:string = '';
  documentAdded:boolean;
  documentDeleted:boolean;
  documentEdited:boolean;
  documentCollections:Array<string>;
  documentCollection:string = '';

  // TEMPLATES
  templateName:string;
  templateElements:Array<Element> = [];
  templateDefault:boolean = false;
  templatesToEdit:Array<Template> = [];
  templateAdded:boolean;
  templateDeleted:boolean;
  templateEdited:boolean;

  // USERS
  user:User;
  users:Array<User>;
  userRoles:Array<string>;
  userLogin:string = '';
  userFname:string = '';
  userLname:string = '';
  userRole:string = '';
  userPw:string = '';
  userPwCon:string = '';
  userImage:File;

  constructor (private appService: AppService) { } 

   ngOnInit() {
     this.getCollections();
     this.getElements();
     this.getRoles();
   }

  ngOnChanges(changes: SimpleChanges) {
    if (this.scenario !== undefined) {
      this.show = 'show';
    }
    if (this.scenario === 'editTemplate') {
      this.getTemplatesToEdit();
    }
    if (this.scenario === 'users') {
      this.getUsers();
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
      error => this.errorMessage = error
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
      error => this.errorMessage = error
    );
  }

  getRoles():void {
    this.appService.getRoles().subscribe(
      roles => this.userRoles = roles,
      error => this.errorMessage = error
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
      error => this.errorMessage = error
    );
  }

  refreshEditedTemplate(template:Template) {
    this.template = new Template(template.name, template.elements, template.is_default, template.collection, template._id);
    this.onRefresh.emit(this.template);
  }

  goDeepEditTemplate(template:Template):void {
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

  prevUsersView():void {
    this.resetAddUserForm();
    this.scenario = 'users'
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

  goDeepAddUser():void {
    this.scenario = 'addUserDeep';
  }

  goDeepEditUser(user:UserInterface):void {
    this.scenario = 'editUserDeep';
    this.user = new User(user.login, user.fname, user.lname, user.role, undefined, user._id);
  }

  choseRole(role:string) {
    this.userRole = role;
  }

  choseRoleEdit(role:string) {
    this.user.role = role;
  }

  resetAddUserForm():void {
    this.userLogin = '';
    this.userFname = '';
    this.userLname = '';
    this.userRole = '';
    this.userPw = '';
    this.userPwCon = '';
  }

  addUser() {
    let user = new User(this.userLogin, this.userFname, this.userLname, this.userRole, this.userPw)
    this.appService.postUsers(user).subscribe(
      response => {
        this.response = response,
        this.getUsers(),
        this.prevUsersView(),
        this.showAlerts('success', 'User added')
      },
      error => {
        this.errorMessage = <any>error,
        this.showAlerts('danger', 'Something went wrong')
      }
    )
  }

  getUsers() {
    this.appService.getUsers().subscribe(
      users => this.users = users,
      error => this.errorMessage = <any>error
    )
  }

  deleteUser(user:User) {
    this.appService.deleteUser(user).subscribe(
      response => {
        this.response = response,
        this.getUsers(),
        this.prevUsersView(),
        this.showAlerts('success', 'User deleted')
      },
      error => {
        this.errorMessage = <any>error,
        this.showAlerts('danger', 'Something went wrong')
      }
    )
  }

  editUser(user:User) {
    if (this.userPw !== '') {
      this.user.pw = this.userPw;
    }
    this.appService.putUser(user).subscribe(
      response => {
        this.response = response,
        this.getUsers(),
        this.prevUsersView(),
        this.showAlerts('success', 'User edited')
      },
      error => {
        this.errorMessage = <any>error,
        this.showAlerts('danger', 'Something went wrong')
      }
    )
  }

  getFile(event) {
    this.userImage = event.srcElement.files[0]
  }
}