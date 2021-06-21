import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from '../../models';
import { NewsService } from '../../services';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
})
export class NewsListComponent implements OnInit {
  newss$: Observable<News[]>;
  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.newss$ = this.newsService.getNews();
  }
}
