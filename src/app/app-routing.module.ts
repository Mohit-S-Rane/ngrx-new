import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/layout/dashboard/dashboard.component';
import { UsersComponent } from './container/users/users.component';
import { PostComponent } from './container/post/post.component';
import { ViewUserComponent } from './container/view-user/view-user.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: UsersComponent },
      { path: 'user/:id', component: ViewUserComponent },
      { path: 'post', component: PostComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
