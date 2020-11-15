import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ArticlePagination, Article } from 'src/app/articles/model/article';
import { ArticleService } from 'src/app/articles/service/article.service';
import { TitleService } from 'src/app/_service/title.service';
import { AlertService } from 'src/app/_shared/service/alert.service';
import { environment } from 'src/environments/environment';

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

  modalRef: BsModalRef;
  toDelete: Article = null;

  /**
   * Articles constructor
   *
   * @param route
   * @param articleService
   * @param alertService
   * @param translateService
   * @param titleService
   * @param modalService
   */
  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private alertService: AlertService,
    private translateService: TranslateService,
    private titleService: TitleService,
    private modalService: BsModalService
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
      this.translateService.instant('SIDEBAR.HOBBA.NEWS')
    );
  }

  /**
   * Delete article
   *
   * @param article
   */
  delete(article: Article): void {
    if (!this.toDelete) {
      this.alertService.error('Du musst ein Artikel auswählen!');
      return;
    }

    const subscription: Subscription = this.articleService
      .delete(article.id)
      .subscribe({
        next: () => {
          this.entries = this.entries.filter(
            (value) => value.id !== article.id
          );
          this.searchEntries = this.searchEntries.filter(
            (value) => value.id !== article.id
          );

          this.reset();

          this.alertService.success(
            this.translateService.instant('HOBBA.ARTICLES.DELETE', {
              id: article.id,
              title: article.title,
            })
          );
        },
        complete: () => subscription.unsubscribe(),
      });
  }

  /**
   * Search Event
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
   * Scroll Event
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
   * Open delete confirmation modal
   *
   * @param template
   * @param article
   */
  openModal(
    template: TemplateRef<any>,
    article: Article
  ): void {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'h-100 d-flex flex-column justify-content-center my-0' })
    );
    this.toDelete = article;
  }

  /**
   * Reset article property
   */
  reset(): void {
    if (this.modalRef) {
      this.modalRef.hide();
    }

    this.toDelete = null;
  }
}
