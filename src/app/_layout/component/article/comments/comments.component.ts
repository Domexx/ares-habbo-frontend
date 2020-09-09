import {AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
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
export class CommentsComponent implements OnInit, AfterViewChecked {
  comments$: Comment[] = [];
  pagination$: Pagination;
  id$: number;

  commentSubscription: Subscription;
  writeSubscription: Subscription;
  voteSubscription: Subscription;

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
    private cdRef: ChangeDetectorRef,
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

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  upVote(comment: Comment): void {
    if (this.voteService.exists(comment.id, EntityType.ARTICLE_COMMENT_VOTE_ENTITY, VoteType.LIKE)) {
      this.voteSubscription = this.voteService.delete(
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
        complete: () => this.voteSubscription.unsubscribe()
      });

      return;
    }

    this.voteSubscription = this.voteService.create(
      comment.id,
      EntityType.ARTICLE_COMMENT_VOTE_ENTITY,
      VoteType.LIKE
    ).subscribe({
      next: () => comment.likes++,
      complete: () => this.voteSubscription.unsubscribe()
    });
  }

  downVote(comment: Comment): void {
    if (this.voteService.exists(comment.id, EntityType.ARTICLE_COMMENT_VOTE_ENTITY, VoteType.DISLIKE)) {
      this.voteSubscription = this.voteService.delete(
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
        complete: () => this.voteSubscription.unsubscribe()
      });

      return;
    }

    this.voteSubscription = this.voteService.create(
      comment.id,
      EntityType.ARTICLE_COMMENT_VOTE_ENTITY,
      VoteType.DISLIKE
    ).subscribe({
      next: () => comment.dislikes++,
      complete: () => this.voteSubscription.unsubscribe()
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

    this.commentSubscription = this.articleService.getComments(this.id$, this.pagination$.nextPage).subscribe({
      next: (e) => {
        e.comments.forEach(value => this.comments$.push(value));
        this.pagination$ = e.pagination;
      },
      complete: () => this.commentSubscription.unsubscribe()
    });
  }

  onSubmit(): void {
    const comment = this.f.comment;

    if (!comment.value) {
      this.alertService.error(this.translateService.instant('ARTICLES.ARTICLE.COMMENT.EMPTY'));
      return;
    }

    this.writeSubscription = this.articleService.createComment(this.id$, comment.value).subscribe({
      next: (value) => {
        this.comments$.splice(0, 0, value);
        this.alertService.success(this.translateService.instant('ARTICLES.ARTICLE.COMMENT.SUCCESS'));
      },
      complete: () => {
        this.hasCommented.emit(true);

        comment.reset();
        this.modalRef.hide();
        this.writeSubscription.unsubscribe();
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
