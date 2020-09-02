import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Comment} from '../../../../models/article/comment';
import {environment} from '../../../../../environments/environment';
import {Pagination} from '../../../../models/pagination';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Subscription} from 'rxjs';
import {ArticleService} from '../../../../services/article.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'ares-layout-community-article-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  animations: [
    trigger('fade', [
      state('0', style({opacity: 1, display: 'block'})),
      state('1', style({opacity: 0, display: 'none'})),

      transition('1 => 0', animate('450ms')),
      transition('0 => 1', animate('450ms'))
    ])
  ]
})
export class CommentsComponent implements OnInit, OnDestroy {
  comments$: Comment[] = [];
  pagination$: Pagination;

  state = true;

  commentSubscription: Subscription;

  @Input('comments')
  set comments(value: Comment[]) {
    this.comments$ = value;
  }

  @Input('pagination')
  set pagination(value: Pagination) {
    this.pagination$ = value;
  }

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  onScroll() {
    if (!this.pagination$.nextPage) {
      return;
    }

    this.state = false;

    this.commentSubscription = this.articleService.getComments(this.route.snapshot.params.id, this.pagination$.nextPage).subscribe({
      next: (e) => {
        e.comments.forEach(value => this.comments$.push(value));
        this.pagination$ = e.pagination;
      },
      complete: () => this.state = true
    });
  }

  look(look: string): string {
    return `${environment.app.imager}${look}&action=std&gesture=sml&direction=2&head_direction=2&size=l`;
  }

  ngOnDestroy() {
    if (this.commentSubscription && this.commentSubscription.unsubscribe) {
      this.commentSubscription.unsubscribe();
    }
  }

}
