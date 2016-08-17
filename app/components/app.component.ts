import { Component } from '@angular/core';
import { LeftBarComponent } from './leftbar.component';
import { RightBarComponent } from './rightbar.component';

@Component({
  selector: 'main-app',
  templateUrl: 'app/templates/app.component.html',
  styleUrls: ['app/styles/app.component.css'],
  directives: [LeftBarComponent, RightBarComponent]
})

export class AppComponent { 
  scenario:string

  onSelect(scenario:string) {
    this.scenario = scenario;
  }
 }