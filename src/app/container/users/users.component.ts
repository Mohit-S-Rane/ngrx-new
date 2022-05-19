import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api-service';
import { User } from './../../models/user';
import { Store } from '@ngrx/store';
import { getUsers, RootReducerState, getUserLoading, getUserLoaded } from '../../reducers/index';
import { UserListRequestAction, UserListSuccessAction } from '../../actions/user-action';
import { combineLatest } from 'rxjs';
import { YoutubeRepository } from './../../services/youtube-repository';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  //   styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  constructor(private youtubeRepository: YoutubeRepository) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    const userData$ = this.youtubeRepository.getUserList()[1];
    userData$.subscribe(data=>{
      this.users = data;
    })
  }
}
