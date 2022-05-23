import { Component, Input } from '@angular/core';
import { YoutubeRepository } from 'src/app/services/youtube-repository';
import { User } from './../../../models/user';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UpdateUserComponent } from './../../update-user/update-user.component';
import { Router } from '@angular/router';
import { Post } from './../../../models/post';
import { Comment } from './../../../models/post';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  //   styleUrls: ['./post-card.component.css']
})
export class PostCardComponent {
  @Input() post: Post;
  commentDescription = '';
  constructor(
    private youtubeRepo: YoutubeRepository,
    private dialog: MatDialog,
    private router: Router
  ) {}

  deleteComment(id) {
    this.youtubeRepo.deleteComment(id, this.post.id);
  }

  update() {
    this.dialog.open(UpdateUserComponent, {
      width: '256px',
      data: this.post,
    });
  }

  open() {
    this.router.navigate(['user', this.post.id]);
  }

  addComment() {
    const comment: Comment = {
      id: 124,
      description: this.commentDescription,
    };
    this.youtubeRepo.addComment(comment, this.post.id);
  }
}
