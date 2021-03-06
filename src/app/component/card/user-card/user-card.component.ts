import { Component, Input } from '@angular/core';
import { YoutubeRepository } from 'src/app/services/youtube-repository';
import { User } from './../../../models/user';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UpdateUserComponent } from './../../update-user/update-user.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
//   styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  @Input() user!: User;
  constructor(private youtubeRepo: YoutubeRepository, private dialog: MatDialog, private router: Router) {}

  delete() {
    this.youtubeRepo.deleteUser(this.user.id)
  }

  update() {
    this.dialog.open(UpdateUserComponent, {
      width: '256px', data: this.user
    })
  }

  open() {
    this.router.navigate(['user', this.user.id])
  }
}
