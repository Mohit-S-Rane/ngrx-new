import { Component, OnInit } from '@angular/core';
import { User } from './../../models/user';
import { YoutubeRepository } from './../../services/youtube-repository';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  //   styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error = false;
  constructor(private youtubeRepository: YoutubeRepository) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    const observer$ = this.youtubeRepository.getUserList();
    const loading$ = observer$[0];
    const userData$ = observer$[1];
    const error$ = observer$[2];
    userData$.subscribe((data) => {
      this.users = data;
    });
    loading$.subscribe((data) => {
      this.loading = data;
    });
    error$.subscribe((data) => {
      this.error = data;
    });
  }

  tryAgain() {
    this.youtubeRepository.getUserList(true);
  }
}
