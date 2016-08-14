import { Component } from '@angular/core';
import { LeftBarComponent } from './leftbar.component';
import { RightBarComponent } from './rightbar.component';

@Component({
  selector: 'main-app',
  templateUrl: 'app/templates/mainapp.component.html',
  styleUrls: ['app/styles/mainapp.component.css'],
  directives: [LeftBarComponent, RightBarComponent]
})

export class MainAppComponent {  }