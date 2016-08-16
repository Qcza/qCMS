import { Component } from '@angular/core';

interface adminElement {
  name: string;
  icon: string;
}

@Component({
  selector: 'left-bar',
  templateUrl: 'app/templates/leftbar.component.html',
  styleUrls: ['app/styles/leftbar.component.css']
})

export class LeftBarComponent { 
  brand:string = '@qCMS';
  extend:string = null;
  scenario:string = null;
  active:string = null;

  adminElements: Array<adminElement> = [
    {name: 'New template', icon: 'log-in'},
    {name: 'Edit template', icon: 'edit'},
    {name: 'New user', icon: 'user'},
    {name: 'Preferences', icon: 'cutlery'},
    {name: 'Account', icon: 'briefcase'}
]
  newDocumentElements:Array<string> = [
    'New document'
  ];

  inboxElements:Array<any> = [];

  setScenario(scenario:string):void {
    this.scenario = scenario;
    this.active = scenario;
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
}