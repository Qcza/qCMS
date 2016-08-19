import { Component } from '@angular/core';
import { LeftBarComponent } from './leftbar.component';
import { RightBarComponent } from './rightbar.component';
import { Template, Element } from '../models/template';

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
  defaultElement:Element = new Element();
  defaultTemplateElements:Array<Element> = [ this.defaultElement ];

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