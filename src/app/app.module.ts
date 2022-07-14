import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, registerLocaleData } from "@angular/common";
import ruLocale from "@angular/common/locales/ru";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DiscPageComponent } from './disc-page/disc-page.component';

import { SharedModule } from "./shared/shared.module";
import { ApiService } from "./shared/api.service";
import { AlertService } from "./admin/shared/services/alert.service";
import { SearchdserverPipe } from "./shared/pipes/searchdserver.pipe";
import { SearchdtopicPipe } from "./shared/pipes/searchdtopic.pipe";
import { FooterComponent } from './footer/footer.component';
import { CreateCommentComponent } from "./shared/components/create-comment/create-comment.component";
import { CommentComponent } from "./shared/components/comment/comment.component";
import { AdminModule } from "./admin/admin.module";
import { SearchgenrePipe } from "./shared/pipes/searchgenre.pipe";
import { InfoPageComponent } from './info-page/info-page.component';

registerLocaleData(ruLocale, 'ru')

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    DiscPageComponent,
    SearchdserverPipe,
    SearchdtopicPipe,
    SearchgenrePipe,
    FooterComponent,
    CreateCommentComponent,
    CommentComponent,
    InfoPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CommonModule,
    AdminModule
  ],
  providers: [ApiService, AlertService],
    exports: [
        FooterComponent
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
