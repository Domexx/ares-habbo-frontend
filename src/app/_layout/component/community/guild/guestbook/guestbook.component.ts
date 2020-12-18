/*
 * Ares (https://ares.to)
 *
 * @license https://gitlab.com/arescms/ares-frontend/LICENSE (MIT License)
 *
 */

import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import {
  Guestbook,
  GuestbookEntity,
} from '../../../../../_shared/model/guestbook';
import { GuestbookService } from '../../../../../_shared/service/guestbook.service';
import { environment } from '../../../../../../environments/environment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../../../_shared/service/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { VoteService } from '../../../../../_shared/service/vote.service';
import { EntityType, VoteType } from '../../../../../_shared/model/vote';
import { GuestbookPagination } from '../../../../../_shared/model/guestbook';

@Component({
  selector: 'ares-layout-community-guild-guestbook',
  templateUrl: './guestbook.component.html',
  styleUrls: ['./guestbook.component.scss'],
})
export class GuestbookComponent implements OnInit {
  entries$: Guestbook[];
  pagination$: GuestbookPagination;

  modalRef: BsModalRef;

  guestbookForm: FormGroup;

  @Input('pagination')
  set pagination(value: GuestbookPagination) {
    this.pagination$ = value;
  }

  @Input('entries')
  set entries(value: Guestbook[]) {
    this.entries$ = value;
  }

  @Input('guildId') guildId: number;

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
    if (
      !this.pagination$.next_page_url ||
      this.pagination$.current_page > this.pagination$.last_page
    ) {
      return;
    }

    const subscription = this.guestbookService
      .getGuildEntries(this.guildId, ++this.pagination$.current_page)
      .subscribe({
        next: (e) => {
          e.data.forEach((value) => this.entries$.push(value));
          this.pagination$ = e;
        },
        complete: () => subscription.unsubscribe(),
      });
  }

  look(look: string): string {
    if (look === null) {
      return 'assets/images/habbo.gif';
    }

    return `${environment.app.imager}${look}&action=std&gesture=sml&direction=2&head_direction=2&size=l`;
  }

  upVote(entry: Guestbook): void {
    if (
      this.voteService.exists(
        entry.id,
        EntityType.GUESTBOOK_VOTE_ENTITY,
        VoteType.LIKE
      )
    ) {
      const subscription = this.voteService
        .delete(entry.id, EntityType.GUESTBOOK_VOTE_ENTITY, VoteType.LIKE)
        .subscribe({
          next: (resp) => {
            if (!resp) {
              return;
            }

            entry.likes--;
          },
          complete: () => subscription.unsubscribe(),
        });

      return;
    }

    const subscription = this.voteService
      .create(entry.id, EntityType.GUESTBOOK_VOTE_ENTITY, VoteType.LIKE)
      .subscribe({
        next: () => entry.likes++,
        complete: () => subscription.unsubscribe(),
      });
  }

  downVote(entry: Guestbook): void {
    if (
      this.voteService.exists(
        entry.id,
        EntityType.GUESTBOOK_VOTE_ENTITY,
        VoteType.DISLIKE
      )
    ) {
      const subscription = this.voteService
        .delete(entry.id, EntityType.GUESTBOOK_VOTE_ENTITY, VoteType.DISLIKE)
        .subscribe({
          next: (resp) => {
            if (!resp) {
              return;
            }

            entry.dislikes--;
          },
          complete: () => subscription.unsubscribe(),
        });

      return;
    }

    const subscription = this.voteService
      .create(entry.id, EntityType.GUESTBOOK_VOTE_ENTITY, VoteType.DISLIKE)
      .subscribe({
        next: () => entry.dislikes++,
        complete: () => subscription.unsubscribe(),
      });
  }

  upVoteExists(entity: number): boolean {
    return this.voteService.exists(
      entity,
      EntityType.GUESTBOOK_VOTE_ENTITY,
      VoteType.LIKE
    );
  }

  downVoteExists(entity: number): boolean {
    return this.voteService.exists(
      entity,
      EntityType.GUESTBOOK_VOTE_ENTITY,
      VoteType.DISLIKE
    );
  }

  onSubmit(): void {
    const entry = this.f.entry;

    if (!entry.value) {
      this.alertService.error(
        this.translateService.instant(
          'COMMUNITY.GUILD.GUESTBOOK.MODAL.FORM.EMPTY'
        )
      );
      return;
    }

    const subscription = this.guestbookService
      .create(this.guildId, entry.value, GuestbookEntity.GUILD)
      .subscribe({
        next: (value) => {
          this.entries$.splice(0, 0, value);
          this.alertService.success(
            this.translateService.instant(
              'COMMUNITY.GUILD.GUESTBOOK.MODAL.FORM.SUCCESS'
            )
          );
        },
        complete: () => {
          entry.reset();
          this.modalRef.hide();
          subscription.unsubscribe();
        },
      });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign(
        {},
        { class: 'h-100 d-flex flex-column justify-content-center my-0' }
      )
    );
  }

  get f() {
    return this.guestbookForm.controls;
  }
}
