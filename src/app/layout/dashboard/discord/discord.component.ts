import {Component, Input, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'ares-layout-dashboard-discord',
  templateUrl: './discord.component.html',
  styleUrls: ['./discord.component.scss']
})
export class DiscordComponent implements OnInit {
  invite$: string;
  hotelName = environment.app.hotelName;

  @Input('invite')
  set invite(value: string) {
    this.invite$ = value;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
