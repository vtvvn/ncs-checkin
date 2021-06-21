import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './components/news/news.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewsRoutingModule } from './news-routing.module';
import { UpdateNewsComponent } from './components/update-news/update-news.component';


@NgModule({
  declarations: [
    NewsComponent,
    NewsListComponent,
    UpdateNewsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularEditorModule,
    NewsRoutingModule
  ],
  exports: [NewsListComponent]
})
export class NewsModule { }
