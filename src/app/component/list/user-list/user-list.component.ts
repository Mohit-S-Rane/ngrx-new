import { Component, Input } from '@angular/core';
import { User } from './../../../models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
//   styleUrls: ['./user-card.component.css']
})
export class UserListComponent {
  @Input() users!: User[]
}
