import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, take } from 'rxjs';
import { UserAddAction, UserDeleteAction, UserListRequestAction, UserListSuccessAction, UserUpdateAction } from '../actions/user-action';
import { getPostError, getPostLoaded, getPostLoading, getPosts, getUserById, getUserLoaded, getUserLoading, getUsers, RootReducerState } from '../reducers';
import { ApiService } from './api-service';
import { User } from './../models/user';
import { UserListErrorAction } from './../actions/user-action';
import { getUserError } from './../reducers/index';
import { Post } from '../models/post';
import { Comment } from '../models/post';

import { PostListRequestAction, PostListSuccessAction, PostListErrorAction, CommentAddAction, CommentUpdateAction, CommentDeleteAction } from './../actions/post-action';

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
        this.apiService.getAllUser().subscribe((res) => {
          this.store.dispatch(new UserListSuccessAction({ data: res }));
        }, error =>{
            this.store.dispatch(new UserListErrorAction());
        });
      }
    });
    return [loading$, getUserData$, getUserError$];
  }

  deleteUser(id: number) {
    // First we will call actual delete api
    this.store.dispatch(new UserDeleteAction({id}))
  }

  updateUser(data: User) {
    // First send details to actual API
    this.store.dispatch(new UserUpdateAction({data}))
  }

  addUser(data: User) {
    // First add api to add user and then update init store
    this.store.dispatch(new UserAddAction({data}))
  }

  getUserById(id: number, force = false) {
    // get user form reducer if exist otherwise from api
    const user$ = this.store.select(state => getUserById(state, id));
    user$.pipe(take(1)).subscribe(res =>{
      if(force || !res){
        this.apiService.getUser(id).subscribe(data =>{
          this.store.dispatch(new UserAddAction({data}))
        })
      }
      return res; 
    });
    return user$;
  }

  getAllPost(force = false): [Observable<boolean>, Observable<Post[]>, Observable<boolean>] {
    const post$ = this.store.select(getPosts);
    const loading$ = this.store.select(getPostLoading);
    const loaded$ = this.store.select(getPostLoaded);
    const getError$ = this.store.select(getPostError);
    combineLatest([loaded$, loading$]).pipe(take(1)).subscribe((data) => {
      if ((!data[0] && !data[1]) || force) {
        this.store.dispatch(new PostListRequestAction());
        this.apiService.getAllPost().subscribe((res) => {
          this.store.dispatch(new PostListSuccessAction({ data: res }));
        }, error =>{
            this.store.dispatch(new PostListErrorAction());
        });
      }
    });
    return [loading$, post$, getError$];
  }
  
  addComment(comment: Comment, postId: number) {
    this.store.dispatch(new CommentAddAction({data: comment, postId}));
  }

  updateComment(comment: Comment, postId: number) {
    this.store.dispatch(new CommentUpdateAction({data: comment, postId}));
  }

  deleteComment(commentId: number, postId: number) {
    this.store.dispatch(new CommentDeleteAction({id: commentId, postId}));
  }
}
