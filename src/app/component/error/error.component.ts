import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  //   styleUrls: ['./error.component.css']
})
export class ErrorComponent {
    @Output() reload = new EventEmitter();
    @Input() errorTitle: any;
}
