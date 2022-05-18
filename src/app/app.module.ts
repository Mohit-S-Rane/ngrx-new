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


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    YoutubeLayoutComponent,
    PostComponent,
    UsersComponent,
    UserListComponent,
    UserCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FlexModule,
    HttpClientModule
  ],
  providers: [HttpService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
