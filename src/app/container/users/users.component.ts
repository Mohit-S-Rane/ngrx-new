import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs';
import { User } from './../../models/user';
import { YoutubeRepository } from './../../services/youtube-repository';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserComponent } from './../../component/update-user/update-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  //   styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy{
  users: User[] = [];
  loading = false;
  error = false;
  isAlive = true;
  constructor(private youtubeRepository: YoutubeRepository, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchData();
  }

  ngOnDestroy(): void {
    this.isAlive = false
  }

  fetchData() {
    const observer$ = this.youtubeRepository.getUserList();
    const loading$ = observer$[0];
    const userData$ = observer$[1];
    const error$ = observer$[2];
    userData$.pipe(takeWhile(()=> this.isAlive)).subscribe((data) => {
      this.users = data;
    });
    loading$.pipe(takeWhile(()=> this.isAlive)).subscribe((data) => {
      this.loading = data;
    });
    error$.pipe(takeWhile(()=> this.isAlive)).subscribe((data) => {
      this.error = data;
    });
  }

  tryAgain() {
    this.youtubeRepository.getUserList(true);
  }

  addUser(){
    this.dialog.open(UpdateUserComponent,{
      width: '256px'
    })
  }
}
