import { NgModule } from '@angular/core';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './component/layout/dashboard/dashboard.component';
import { HeaderComponent } from './component/layout/header/header.component';
import { YoutubeLayoutComponent } from './component/layout/youtube-layout/youtube-layout.component';
import { MaterialModule } from './material.module';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PostComponent } from './container/post/post.component';
import { UsersComponent } from './container/users/users.component';
import { HttpService } from './services/http.service';
import { ApiService } from './services/api-service';
import { UserListComponent } from './component/list/user-list/user-list.component';
import { UserCardComponent } from './component/card/user-card/user-card.component';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from 'src/app/reducers';
import { YoutubeRepository } from './services/youtube-repository';
import { ErrorComponent } from './component/error/error.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { UpdateUserComponent } from './component/update-user/update-user.component';
import { ReactiveFormsModule } from "@angular/forms";
import { ViewUserComponent } from './container/view-user/view-user.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    YoutubeLayoutComponent,
    PostComponent,
    UsersComponent,
    UserListComponent,
    UserCardComponent,
    ErrorComponent,
    UpdateUserComponent,
    ViewUserComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FlexModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(rootReducer),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [HttpService, ApiService, YoutubeRepository],
  bootstrap: [AppComponent]
})
export class AppModule { }
