import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewsComponent } from './components/news/news.component';
import { UpdateNewsComponent } from './components/update-news/update-news.component';
const routes: Routes = [
  {
    path: 'list-news',
    component: NewsListComponent,
  },
  {
    path: 'view-news',
    component: NewsComponent,
  },
  {
    path: 'update-news',
    component: UpdateNewsComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsRoutingModule {}
