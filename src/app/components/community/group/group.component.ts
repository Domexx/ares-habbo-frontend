import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {Guild} from "../../../models/guild/guild";
import {GroupService} from "../../../services/group.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'ares-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit, OnDestroy {
  id: number;

  groupSubscription: Subscription;
  group: Guild;

  badgeParts = environment.app.badgeParts;

  constructor(
    private activatedRoute: ActivatedRoute,
    private groupService: GroupService
  ) {
    this.id = activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.groupSubscription = this.groupService.group(this.id).subscribe({
      next: (group) => this.group = group,
      // redirect to 404
      error: () => console.log('not found')
    });
  }

  ngOnDestroy() {
    if (this.groupSubscription && !this.groupSubscription.unsubscribe) {
      this.groupSubscription.unsubscribe();
    }
  }

}
