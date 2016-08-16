import { Component, Output, EventEmitter } from '@angular/core';
import { CollapseDirective } from 'ng2-bootstrap/ng2-bootstrap'

@Component({
  selector: 'left-bar',
  directives: [CollapseDirective],
  templateUrl: 'app/templates/leftbar.component.html',
  styleUrls: ['app/styles/leftbar.component.css']
})

export class LeftBarComponent { 
  brand:string = '@qCMS';
  extend:string = null;
  scenario:string = null;
  active:string = null;

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
}