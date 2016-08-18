import { Component } from '@angular/core';
import { LeftBarComponent } from './leftbar.component';
import { RightBarComponent } from './rightbar.component';
import { Template, ElementInterface } from '../models/template';

@Component({
  selector: 'main-app',
  templateUrl: 'app/templates/app.component.html',
  styleUrls: ['app/styles/app.component.css'],
  directives: [LeftBarComponent, RightBarComponent]
})

export class AppComponent { 
  scenario:string;
  template:Template;

  defaultTemplateName:string = 'Default';
  defaultTemplateElements:Array<ElementInterface> = [{
    index: 0,
    title: 'Text',
    type: 'text',
    value: '',
    icon: 'file-text-o'
  }];

  constructor () {
    this.template = new Template(this.defaultTemplateName, this.defaultTemplateElements);
  }

  onSelect(scenario:string):void {
    this.scenario = scenario;
  }

  onRefresh(template:Template):void {
    this.template = template;
  }
}