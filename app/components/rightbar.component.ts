import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'right-bar',
    templateUrl: 'app/templates/rightbar.component.html',
    styleUrls: ['app/styles/rightbar.component.css']
})

export class RightBarComponent implements OnChanges { 
  show:string = 'default';
  @Input() scenario:string;
  
  templateElements:Array<any>;

  ngOnChanges(changes: SimpleChanges) {
    if (this.scenario != null) {
      this.show = 'show';
    }
  }

  showBar():void {
    if (this.show === 'default' || this.show == 'hide') {
      this.show = 'show';
    } else if (this.show === 'show') {
      this.show = 'hide';
    }
  }

 }