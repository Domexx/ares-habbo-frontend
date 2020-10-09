/*
 * Ares (https://ares.to)
 *
 * @license https://gitlab.com/arescms/ares-frontend/LICENSE (MIT License)
 *
 */

import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {Comment} from '../../../../article/model/comment';
import {environment} from '../../../../../environments/environment';
import {Pagination} from '../../../../_shared/model/pagination';
import {Subscription} from 'rxjs';
import {ArticleService} from '../../../../article/service/article.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../../../_shared/service/alert.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {TranslateService} from '@ngx-translate/core';
import {VoteService} from '../../../../_shared/service/vote.service';
import {EntityType, VoteType} from '../../../../_shared/model/vote';

@Component({
  selector: 'ares-layout-article-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  comments$: Comment[] = [];
  pagination$: Pagination;
  id$: number;

  commentForm: FormGroup;

  modalRef: BsModalRef;

  @Input('comments')
  set comments(value: Comment[]) {
    this.comments$ = value;
  }

  @Input('pagination')
  set pagination(value: Pagination) {
    this.pagination$ = value;
  }

  @Input('id')
  set id(value: number) {
    this.id$ = value;
  }

  @Output() hasCommented = new EventEmitter<boolean>();

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private modalService: BsModalService,
    private translateService: TranslateService,
    private voteService: VoteService
  ) {
  }

  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required],
    });
  }

  upVote(comment: Comment): void {
    if (this.voteService.exists(comment.id, EntityType.ARTICLE_COMMENT_VOTE_ENTITY, VoteType.LIKE)) {
      const voteSubscription = this.voteService.delete(
        comment.id,
        EntityType.ARTICLE_COMMENT_VOTE_ENTITY,
        VoteType.LIKE
      ).subscribe({
        next: (resp) => {
          if (!resp) {
            return;
          }

          comment.likes--;
        },
        complete: () => voteSubscription.unsubscribe()
      });

      return;
    }

    const subscription = this.voteService.create(
      comment.id,
      EntityType.ARTICLE_COMMENT_VOTE_ENTITY,
      VoteType.LIKE
    ).subscribe({
      next: () => comment.likes++,
      complete: () => subscription.unsubscribe()
    });
  }

  downVote(comment: Comment): void {
    if (this.voteService.exists(comment.id, EntityType.ARTICLE_COMMENT_VOTE_ENTITY, VoteType.DISLIKE)) {
      const voteSubscription: Subscription = this.voteService.delete(
        comment.id,
        EntityType.ARTICLE_COMMENT_VOTE_ENTITY,
        VoteType.DISLIKE
      ).subscribe({
        next: (resp) => {
          if (!resp) {
            return;
          }

          comment.dislikes--;
        },
        complete: () => voteSubscription.unsubscribe()
      });

      return;
    }

    const subscription = this.voteService.create(
      comment.id,
      EntityType.ARTICLE_COMMENT_VOTE_ENTITY,
      VoteType.DISLIKE
    ).subscribe({
      next: () => comment.dislikes++,
      complete: () => subscription.unsubscribe()
    });
  }

  upVoteExists(entity: number): boolean {
    return this.voteService.exists(entity, EntityType.ARTICLE_COMMENT_VOTE_ENTITY, VoteType.LIKE);
  }

  downVoteExists(entity: number): boolean {
    return this.voteService.exists(entity, EntityType.ARTICLE_COMMENT_VOTE_ENTITY, VoteType.DISLIKE);
  }

  onScroll() {
    if (!this.pagination$.nextPage) {
      return;
    }

    const subscription = this.articleService.getComments(this.id$, this.pagination$.nextPage).subscribe({
      next: (e) => {
        e.comments.forEach(value => this.comments$.push(value));
        this.pagination$ = e.pagination;
      },
      complete: () => subscription.unsubscribe()
    });
  }

  onSubmit(): void {
    const comment = this.f.comment;

    if (!comment.value) {
      this.alertService.error(this.translateService.instant('ARTICLES.ARTICLE.COMMENT.EMPTY'));
      return;
    }

    const subscription = this.articleService.createComment(this.id$, comment.value).subscribe({
      next: (value) => {
        this.comments$.splice(0, 0, value);
        this.alertService.success(this.translateService.instant('ARTICLES.ARTICLE.COMMENT.SUCCESS'));
      },
      complete: () => {
        this.hasCommented.emit(true);

        comment.reset();
        this.modalRef.hide();
        subscription.unsubscribe();
      }
    });
  }

  look(look: string): string {
    return `${environment.app.imager}${look}&action=std&gesture=sml&direction=2&head_direction=2&size=l`;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, {class: 'h-100 d-flex flex-column justify-content-center my-0'})
    );
  }

  get f() {
    return this.commentForm.controls;
  }

}
