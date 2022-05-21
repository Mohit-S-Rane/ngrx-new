import { Component, Input } from '@angular/core';
import { YoutubeRepository } from 'src/app/services/youtube-repository';
import { User } from './../../../models/user';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UpdateUserComponent } from './../../update-user/update-user.component';
import { Router } from '@angular/router';
import { Post } from './../../../models/post';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
//   styleUrls: ['./post-card.component.css']
})
export class PostCardComponent {
  @Input() post: Post;
  constructor(private youtubeRepo: YoutubeRepository, private dialog: MatDialog, private router: Router) {}

  delete() {
    this.youtubeRepo.deleteUser(this.post.id)
  }

  update() {
    this.dialog.open(UpdateUserComponent, {
      width: '256px', data: this.post
    })
  }

  open() {
    this.router.navigate(['user', this.post.id])
  }
}
