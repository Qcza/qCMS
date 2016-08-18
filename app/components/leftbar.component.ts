import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { Template, ElementInterface } from '../models/template';


@Component({
  selector: 'left-bar',
  providers: [AppService],
  templateUrl: 'app/templates/leftbar.component.html',
  styleUrls: ['app/styles/leftbar.component.css']
})

export class LeftBarComponent implements OnInit { 
  brand:string = '@qCMS';
  extend:string = null;
  scenario:string = null;
  active:string = null;
  templates:Array<Template>;
  errMessage:any;

  constructor (private appService:AppService) {}

  ngOnInit() {
    this.getTemplates();
  }

  @Output() onSelect = new EventEmitter<string>();
  selectSettingScenario(scenario:string):void {
    this.onSelect.emit(scenario);
  }

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

  getTemplates():void {
    this.appService.getTemplates().subscribe(
      templates => this.templates = templates,
      error => this.errMessage = error
    );
  }
  
}