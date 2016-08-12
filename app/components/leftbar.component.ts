import { Component } from '@angular/core';

@Component({
  selector: 'left-bar',
  templateUrl: 'app/components/leftbar.component.html',
  styleUrls: ['app/styles/leftbar.component.css']
})

export class LeftBarComponent { 
  brand:string = '@qCMS';
  extend:string = null;
  scenario:string = null;

  setScenario(scenario:string):void {
    this.scenario = scenario;
  }

  extendBar(scenario:string):void {
    if (this.extend === 'show' && this.scenario === scenario) {
      this.extend = 'hide';
      this.setScenario(null);
    } else {
      this.extend = 'show';
      this.setScenario(scenario);
    }
  }
}