import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api-service';
import { User } from './../../models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
//   styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  users: User[] = [];
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.apiService.getAllPost().subscribe(data=>{
      this.users = data; 
    })
  }
}
