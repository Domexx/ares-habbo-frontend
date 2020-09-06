import {Component, Input, OnInit} from '@angular/core';
import {Guild} from '../../../models/guild/guild';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'ares-layout-dashboard-guild',
  templateUrl: './guild.component.html',
  styleUrls: ['./guild.component.scss']
})
export class GuildComponent implements OnInit {
  guild$: { guild: Guild, member_count: number };

  @Input('guild')
  set guild(value: { guild: Guild, member_count: number }) {
    this.guild$ = value;
  }

  constructor() { }

  ngOnInit(): void {

  }

  badge(key: string) {
    return `${environment.app.badgeParts}${key}.png`;
  }

}
