/*
 * Ares (https://ares.to)
 *
 * @license https://gitlab.com/arescms/ares-frontend/LICENSE (MIT License)
 *
 */

import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {Guestbook, GuestbookEntity} from '../../../../../_shared/model/guestbook';
import {GuestbookService} from '../../../../../_shared/service/guestbook.service';
import {environment} from '../../../../../../environments/environment';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {Pagination} from '../../../../../_shared/model/pagination';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AlertService} from '../../../../../_shared/service/alert.service';
import {TranslateService} from '@ngx-translate/core';
import {VoteService} from '../../../../../_shared/service/vote.service';
import {Comment} from '../../../../../article/model/comment';
import {EntityType, VoteType} from '../../../../../_shared/model/vote';

@Component({
  selector: 'ares-layout-community-guild-guestbook',
  templateUrl: './guestbook.component.html',
  styleUrls: ['./guestbook.component.scss']
})
export class GuestbookComponent implements OnInit {
  entries$: Guestbook[];
  pagination$: Pagination;

  modalRef: BsModalRef;

  guestbookForm: FormGroup;

  guestbookSubscription: Subscription;
  entrySubscription: Subscription;
  voteSubscription: Subscription;

  @Input('pagination')
  set pagination(value: Pagination) {
    this.pagination$ = value;
  }

  @Input('entries')
  set entries(value: Guestbook[]) {
    this.entries$ = value;
  }

  @Input('id') id: number;

  constructor(
    private guestbookService: GuestbookService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private translateService: TranslateService,
    private voteService: VoteService
  ) { }

  ngOnInit(): void {
    this.guestbookForm = this.formBuilder.group({
      entry: ['', Validators.required],
    });
  }

  onScroll(): void {
    if (!this.pagination$.nextPage) {
      return;
    }

    this.guestbookSubscription = this.guestbookService.getGuildEntries(this.id, this.pagination$.nextPage).subscribe({
      next: (e) => {
        e.entries.forEach(value => this.entries$.push(value));
        this.pagination$ = e.pagination;
      },
      complete: () => this.guestbookSubscription.unsubscribe()
    });
  }

  look(look: string): string {
    if (look === null) {
      return 'assets/images/habbo.gif';
    }

    return `${environment.app.imager}${look}&action=std&gesture=sml&direction=2&head_direction=2&size=l`;
  }

  upVote(entry: Guestbook): void {
    if (this.voteService.exists(entry.id, EntityType.GUESTBOOK_VOTE_ENTITY, VoteType.LIKE)) {
      this.voteSubscription = this.voteService.delete(
        entry.id,
        EntityType.GUESTBOOK_VOTE_ENTITY,
        VoteType.LIKE
      ).subscribe({
        next: (resp) => {
          if (!resp) {
            return;
          }

          entry.likes--;
        },
        complete: () => this.voteSubscription.unsubscribe()
      });

      return;
    }

    this.voteSubscription = this.voteService.create(
      entry.id,
      EntityType.GUESTBOOK_VOTE_ENTITY,
      VoteType.LIKE
    ).subscribe({
      next: () => entry.likes++,
      complete: () => this.voteSubscription.unsubscribe()
    });
  }

  downVote(entry: Guestbook): void {
    if (this.voteService.exists(entry.id, EntityType.GUESTBOOK_VOTE_ENTITY, VoteType.DISLIKE)) {
      this.voteSubscription = this.voteService.delete(
        entry.id,
        EntityType.GUESTBOOK_VOTE_ENTITY,
        VoteType.DISLIKE
      ).subscribe({
        next: (resp) => {
          if (!resp) {
            return;
          }

          entry.dislikes--;
        },
        complete: () => this.voteSubscription.unsubscribe()
      });

      return;
    }

    this.voteSubscription = this.voteService.create(
      entry.id,
      EntityType.GUESTBOOK_VOTE_ENTITY,
      VoteType.DISLIKE
    ).subscribe({
      next: () => entry.dislikes++,
      complete: () => this.voteSubscription.unsubscribe()
    });
  }

  upVoteExists(entity: number): boolean {
    return this.voteService.exists(entity, EntityType.GUESTBOOK_VOTE_ENTITY, VoteType.LIKE);
  }

  downVoteExists(entity: number): boolean {
    return this.voteService.exists(entity, EntityType.GUESTBOOK_VOTE_ENTITY, VoteType.DISLIKE);
  }

  onSubmit(): void {
    const entry = this.f.entry;

    if (!entry.value) {
      this.alertService.error(this.translateService.instant('COMMUNITY.GUILD.GUESTBOOK.MODAL.FORM.EMPTY'));
      return;
    }

    this.entrySubscription = this.guestbookService.create(this.id, entry.value, GuestbookEntity.GUILD).subscribe({
      next: (value) => {
        this.entries$.splice(0, 0, value);
        this.alertService.success(this.translateService.instant('COMMUNITY.GUILD.GUESTBOOK.MODAL.FORM.SUCCESS'));
      },
      complete: () => {
        entry.reset();
        this.modalRef.hide();
        this.entrySubscription.unsubscribe();
      }
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, {class: 'h-100 d-flex flex-column justify-content-center my-0'})
    );
  }

  get f() {
    return this.guestbookForm.controls;
  }

}
