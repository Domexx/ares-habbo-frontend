import { Article, ArticlePagination } from './../model/article';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ArticleService } from '../service/article.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { AlertService } from 'src/app/_shared/service/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { TitleService } from 'src/app/_service/title.service';

@Component({
  selector: 'ares-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('350ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('250ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class ArticlesComponent implements OnInit {
  pagination: ArticlePagination;
  entries: Article[] = [];
  searchEntries: Article[] = [];

  date = environment.app.components.articles.date;

  searchField: FormControl = new FormControl();

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private alertService: AlertService,
    private translateService: TranslateService,
    private titleService: TitleService
  ) {}

  /**
   * Initialize component
   */
  ngOnInit(): void {
    this.pagination = this.route.snapshot.data.articles;
    this.entries = this.pagination.data;

    this.searchField.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((term) => this.onSearch(term));

    this.titleService.setTitle(
      this.translateService.instant('SIDEBAR.COMMUNITY.NEWS')
    );
  }

  /**
   * Search event
   *
   * @param term
   */
  onSearch(term: string): void {
    if (!term) {
      this.searchEntries = [];
      return;
    }

    const subscription = this.articleService.search(term).subscribe({
      next: (resp: ArticlePagination) => {
        if (resp.data.length === 0) {
          this.alertService.error(
            this.translateService.instant('ARTICLES.SEARCH.FAILED', {
              term,
            })
          );
          return;
        }

        this.searchEntries = resp.data;
      },
      complete: () => subscription.unsubscribe(),
    });
  }

  /**
   * Scroll event
   */
  onScroll(): void {
    // Check if the next page is null or if the current page is higher then the last page
    // and cancel all further actions
    if (
      !this.pagination.next_page_url ||
      this.pagination.current_page > this.pagination.last_page
    ) {
      return;
    }

    const subscription = this.articleService
      .list(++this.pagination.current_page, 9)
      .subscribe({
        next: (e) => {
          // Loop through all data and push the data into our array
          e.data.forEach((value) => {
            this.entries.push(value);
          });

          // Set the new pagination data
          this.pagination = e;
        },
        complete: () => subscription.unsubscribe(),
      });
  }

  /**
   * Return the first entry image
   *
   * @return string
   */
  get hero(): string {
    return (this.searchEntries[0]) ? this.searchEntries[0].image : this.entries[0].image;
  }
}
