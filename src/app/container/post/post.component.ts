import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { YoutubeRepository } from './../../services/youtube-repository';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
//   styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{
  users: User[] = [];
  constructor(private youtubeRepo: YoutubeRepository) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    const observer$ = this.youtubeRepo.getUserList();
    const userData$ = observer$[1];
    userData$.subscribe((data) => {
      this.users = data;
    });
  }
}
