import { NgModule } from "@angular/core";
import { CommonModule, registerLocaleData } from "@angular/common";
import ruLocale from "@angular/common/locales/ru";
import { RouterModule } from "@angular/router";
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "./shared/services/auth.service";
import { SharedModule } from "../shared/shared.module";
import { ApiService } from "../shared/api.service";
import { AuthGuard } from "./shared/services/auth.guard";
import { SearchPipe } from "../shared/pipes/search.pipe";
import { AlertComponent } from './shared/components/alert/alert.component';
import { AlertService } from "./shared/services/alert.service";
import { TopicDashboardPageComponent } from './topic-dashboard-page/topic-dashboard-page.component';
import { SearchtopicPipe } from "../shared/pipes/searchtopic.pipe";
import { EditTopicPageComponent } from './edit-topic-page/edit-topic-page.component';
import { CreateTopicPageComponent } from './create-topic-page/create-topic-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { UserLayoutComponent } from './shared/components/user-layout/user-layout.component';
import { AuthGuardUser } from "./shared/services/auth.guard-user";
import { GenreDashboardPageComponent } from './genre-dashboard-page/genre-dashboard-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { AuthGuardModer } from "./shared/services/auth.guard-moder";
import { ReportedcommentsPageComponent } from './reportedcomments-page/reportedcomments-page.component';
import { UserDashbPageComponent } from './user-dashb-page/user-dashb-page.component';
import { FavoritePageComponent } from './favorite-page/favorite-page.component';
import {DiscComponent} from "../shared/components/disc/disc.component";
import { RecomendationPageComponent } from './recomendation-page/recomendation-page.component';

registerLocaleData(ruLocale, 'ru')

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
          {path: 'login', component: LoginPageComponent},
          {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
          {path: 'create', component: CreatePageComponent},
          {path: 'disc/:id/edit', component: EditPageComponent, canActivate: [AuthGuard]},
          {path: 'topic-dashboard', component: TopicDashboardPageComponent, canActivate: [AuthGuard]},
          {path: 'topic/:id/edit', component: EditTopicPageComponent, canActivate: [AuthGuard]},
          {path: 'create-topic', component: CreateTopicPageComponent, canActivate: [AuthGuard]},
          {path: 'genre-dashboard', component: GenreDashboardPageComponent, canActivate: [AuthGuard]},
          {path: 'signup', component: SignupPageComponent},
          {path: 'profile', component: ProfilePageComponent},
          {path: 'rcomments', component: ReportedcommentsPageComponent, canActivate: [AuthGuard]},
          {path: 'user', component: UserLayoutComponent, children: [
              {path: 'dashboard', component: UserDashbPageComponent, canActivate: [AuthGuardUser || AuthGuardModer]},
              {path: 'favorite', component: FavoritePageComponent, canActivate: [AuthGuardUser || AuthGuardModer]},
              {path: 'create', component: CreatePageComponent, canActivate: [AuthGuardUser || AuthGuardModer]},
              {path: 'disc/:id/edit', component: EditPageComponent, canActivate: [AuthGuardUser || AuthGuardModer]},
              {path: 'recomendation', component: RecomendationPageComponent, canActivate: [AuthGuardUser || AuthGuardModer]},
              {path: 'moderdashb', component: DashboardPageComponent, canActivate: [AuthGuardModer]},
              {path: 'rcomments', component: ReportedcommentsPageComponent, canActivate: [AuthGuardModer]}
            ]}
        ]
      }
    ]),
  ],
    exports: [
        AlertComponent,
        DiscComponent
    ],
  providers: [AuthService, ApiService, AuthGuard, AuthGuardUser, AuthGuardModer, AlertService],
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    DashboardPageComponent,
    CreatePageComponent,
    EditPageComponent,
    SearchPipe,
    AlertComponent,
    TopicDashboardPageComponent,
    SearchtopicPipe,
    EditTopicPageComponent,
    CreateTopicPageComponent,
    SignupPageComponent,
    UserLayoutComponent,
    GenreDashboardPageComponent,
    ProfilePageComponent,
    ReportedcommentsPageComponent,
    UserDashbPageComponent,
    FavoritePageComponent,
    DiscComponent,
    RecomendationPageComponent
  ]
})
export class AdminModule {

}
