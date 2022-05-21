import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap, takeWhile } from 'rxjs';
import { YoutubeRepository } from './../../services/youtube-repository';
import { User } from './../../models/user';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
//   styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnDestroy {
  isAlive = true;
  user: User;

  constructor(private route: ActivatedRoute, private youtubeRepo: YoutubeRepository) {
    // this.route.params.subscribe(data => {
    //   this.youtubeRepo.getUserById(data.id).subscribe(user => {
    //     console.log(user);
    //   });
    // });
    this.fetchData();
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  fetchData() {
    const user$ = this.route.params.pipe(map(data => data['id']),
      takeWhile(() => this.isAlive),
      switchMap((id) => {
        return this.youtubeRepo.getUserById(id);
      }), filter(res => !!res));
    user$.subscribe(data => {
      this.user = data;
      console.log(data);
      
    });
  }

}
