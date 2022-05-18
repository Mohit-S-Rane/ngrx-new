import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { User } from './../models/user';
import { map, Observable } from 'rxjs';

@Injectable()

export class ApiService {
  constructor(private httpService: HttpService) {}

  getAllPost(): Observable<User[]> {
    return this.httpService.get('/users').pipe(map(data=> data as User[]))
  }


}
