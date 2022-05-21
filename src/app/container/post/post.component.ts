import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/user';
import { YoutubeRepository } from './../../services/youtube-repository';
import { Post } from './../../models/post';
import { MatDialog } from '@angular/material/dialog';
import { takeWhile } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
//   styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy{
  postList: Post[] = [];
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
    const observer$ = this.youtubeRepository.getAllPost();
    const loading$ = observer$[0];
    const postData$ = observer$[1];
    const error$ = observer$[2];
    postData$.pipe(takeWhile(()=> this.isAlive)).subscribe((data) => {
      this.postList = data;
    });
    loading$.pipe(takeWhile(()=> this.isAlive)).subscribe((data) => {
      this.loading = data;
    });
    error$.pipe(takeWhile(()=> this.isAlive)).subscribe((data) => {
      this.error = data;
    });
  }
}
