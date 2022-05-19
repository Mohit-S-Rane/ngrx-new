import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, take } from 'rxjs';
import { UserListRequestAction, UserListSuccessAction } from '../actions/user-action';
import { getUserLoaded, getUserLoading, getUsers, RootReducerState } from '../reducers';
import { ApiService } from './api-service';
import { User } from './../models/user';
import { UserListErrorAction } from './../actions/user-action';
import { getUserError } from './../reducers/index';

@Injectable()
export class YoutubeRepository {
  constructor(private store: Store<RootReducerState>, private apiService: ApiService) {}

  getUserList(force = false): [Observable<boolean>, Observable<User[]>, Observable<boolean>] {
    const loading$ = this.store.select(getUserLoading);
    const loaded$ = this.store.select(getUserLoaded);
    const getUserData$ = this.store.select(getUsers);
    const getUserError$ = this.store.select(getUserError);
    combineLatest([loaded$, loading$]).pipe(take(1)).subscribe((data) => {
      if ((!data[0] && !data[1]) || force) {
        this.store.dispatch(new UserListRequestAction());
        this.apiService.getAllPost().subscribe((res) => {
          this.store.dispatch(new UserListSuccessAction({ data: res }));
        }, error =>{
            this.store.dispatch(new UserListErrorAction());
        });
      }
    });
    return [loading$, getUserData$, getUserError$];
  }
}
