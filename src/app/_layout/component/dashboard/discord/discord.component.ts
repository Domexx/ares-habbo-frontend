import {Component} from '@angular/core';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'ares-layout-dashboard-discord',
  templateUrl: './discord.component.html',
  styleUrls: ['./discord.component.scss']
})
export class DiscordComponent {
  hotelName = environment.app.hotelName;
}
