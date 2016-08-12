import { Component } from '@angular/core';
import { LeftBarComponent } from './leftbar.component';

@Component({
  selector: 'main-app',
  templateUrl: 'app/components/mainapp.component.html',
  styleUrls: ['app/styles/mainapp.component.css'],
  directives: [LeftBarComponent]
})

export class MainAppComponent {  }