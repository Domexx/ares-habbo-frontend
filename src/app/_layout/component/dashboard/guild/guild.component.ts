import {Component, Input, OnInit} from '@angular/core';
import {Guild} from '../../../../community/model/guild/guild';
import {environment} from '../../../../../environments/environment';

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

  error(e: any): void {
    e.target.src = '/assets/images/icons/ares64x64.png';
  }

  badge(key: string) {
    return `${environment.app.badgeParts}${key}.png`;
  }

}
